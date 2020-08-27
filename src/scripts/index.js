import Api from "./API.js"
import Card from "./Card.js"
import CardList from "./CardList.js"
import FormValidator from "./FormValidator.js"
import Popup from "./Popup.js"
import UserInfo from "./UserInfo.js"
import "../pages/index.css"

(function() {

    const API_URL = process.env.NODE_ENV === "production" ? "https://nomoreparties.co" : "http://nomoreparties.co";
    const accessToServer = {
        token: 'fb0ad808-7cc9-442a-a27e-b803119b4f77',
        groupID: 'cohort12',
        serverAddress: API_URL
    }

    const serverData = new Api(accessToServer);

    const addCardPopup = document.querySelector('.popup_add-card');
    const editInfoPopup = document.querySelector('.popup_edit-info');
    const cardImagePopup = document.querySelector('.popup_card-image');
    const popupImage = document.querySelector('.popup__image');

    const cardPopup = new Popup(addCardPopup);
    const editPopup = new Popup(editInfoPopup);
    const imagePopup = new Popup(cardImagePopup);

    const domElement = document.querySelector('.places-list');
    const cardProto = new CardList(domElement);

    function openImagePopup(link) {
        popupImage.src = link;
        imagePopup.open();
    }

    const errorMessages = {
        valueMissing: 'Это обязательное поле',
        tooShort: 'Должно быть от 2 до 30 символов',
        typeMismatch: 'Здесь должна быть ссылка',
    }

    const openAddCardPopupButton = document.querySelector('.user-info__button');
    const addCardForm = document.forms.new;
    const verifyAddCardForm = new FormValidator(addCardForm, errorMessages);
    verifyAddCardForm.setEventListeners();
    openAddCardPopupButton.addEventListener('click', function () {
        cardPopup.open();
    })
    addCardForm.addEventListener('submit', function (event) {
        event.preventDefault();
        const newData = {
            name: addCardForm.name.value,
            link: addCardForm.link.value,
        }
        const newCardBlank = new Card(newData, openImagePopup).create();
        cardProto.addCard(newCardBlank);
        addCardForm.reset();
        addCardPopup.classList.remove('popup_is-opened');
    })

    const openEditInfoPopupButton = document.querySelector('.user-info__edit');
    const editInfoForm = document.forms.info;
    const verifyEditInfoForm = new FormValidator(editInfoForm, errorMessages);
    verifyEditInfoForm.setEventListeners();
    openEditInfoPopupButton.addEventListener('click', function (event) {
        editInfoForm.initials.value = nameInfo.textContent;
        editInfoForm.about.value = jobInfo.textContent;
        editPopup.open();
    })
    const nameInfo = document.querySelector('.user-info__name');
    const jobInfo = document.querySelector('.user-info__job');
    const userAvatar = document.querySelector('.user-info__photo');
    editInfoForm.addEventListener('submit', function (event) {
        const newNameInfo = editInfoForm.initials.value;
        const newJobInfo = editInfoForm.about.value;
        event.preventDefault();

        const newInfo = new UserInfo(nameInfo, jobInfo);

        newInfo.setUserInfo(newNameInfo, newJobInfo)

        serverData.newInfoAboutMe(newNameInfo, newJobInfo)
            .then(() => {
                newInfo.updateUserInfo();
                editInfoPopup.classList.remove('popup_is-opened');
            })
            .catch((err)=>{
                console.log(err);
            })
    })

    const arrayOfCards = [];

    Promise.all([
        serverData.userCards(),
        serverData.infoAboutMe()
    ])
        .then((values) => {
            const usersCards = values[0];
            usersCards.forEach((item) => {
                const newObject = {};
                newObject.name = item.name;
                newObject.link = item.link;
                arrayOfCards.push(newObject);
            })
            const stockCards = arrayOfCards.map(cardData => {
                const newCard = new Card(cardData, openImagePopup);
                return newCard.create();
            })
            cardProto.render(stockCards);

            nameInfo.textContent = values[1].name;
            jobInfo.textContent = values[1].about;
            userAvatar.setAttribute('style', `background-image: url(${values[1].avatar})`)
        })
        .catch((err)=>{
            console.log(err);
        })

}())