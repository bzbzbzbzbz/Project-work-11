export default class Card {
    static _template = document.querySelector('#template').content;

    constructor(cardElements, openImageCallback) {
        this.name = cardElements.name;
        this.link = cardElements.link;
        this.remove = this.remove.bind(this)
        this.like = this.like.bind(this)
        this.openImage = this.openImage.bind(this)
        this.openImageCallback = openImageCallback.bind(this);
    }

    create() {
        const view = Card._template.cloneNode(true).children[0];
        view.querySelector('.place-card__image').setAttribute('style', `background-image: url(${this.link})`);
        view.querySelector('.place-card__name').textContent = this.name
        view.querySelector('.place-card__like-icon').addEventListener('click', this.like);
        view.querySelector('.place-card__delete-icon').addEventListener('click', this.remove);
        view.querySelector('.place-card__image').addEventListener('click', this.openImage);
        this.view = view;
        return view
    }

    openImage() {
        this.openImageCallback(this.link);
    }

    like(event) {
        event.target.classList.toggle('place-card__like-icon_liked');
    }

    remove(event) {
        const card = event.target.parentElement.parentElement;
        card.parentElement.removeChild(card);
        event.stopPropagation();

        event.target.removeEventListener('click', this.remove);
        this.view.querySelector('.place-card__like-icon').removeEventListener('click', this.like);
        this.view.querySelector('.place-card__image').removeEventListener('click', this.openImage);
    }

}