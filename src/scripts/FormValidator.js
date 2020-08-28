export default class FormValidator {
    constructor(form, currentErrorMessage) {
        this.form = form;
        this.currentErrorMessage = currentErrorMessage;
    }

    errorMessage(input, form) {
        const currentID = input.id;
        const currentSpan = form.querySelector(`#${currentID}-error`);
        currentSpan.textContent = input.validationMessage;
    }

    checkInputValidity(event) {
        const currentInput = event.target;
        const currentForm = event.currentTarget;
        const inputFieldCheck = currentInput.validity;

        if (inputFieldCheck.tooShort) {
            currentInput.setCustomValidity(this.currentErrorMessage.tooShort)
            this.errorMessage(currentInput, currentForm);
            return false
        }

        if (inputFieldCheck.valueMissing) {
            currentInput.setCustomValidity(this.currentErrorMessage.valueMissing);
            this.errorMessage(currentInput, currentForm);
            return false
        }

        if (inputFieldCheck.typeMismatch) {
            currentInput.setCustomValidity(this.currentErrorMessage.typeMismatch);
            this.errorMessage(currentInput, currentForm);

            return false
        }

        currentInput.setCustomValidity('');
        this.errorMessage(currentInput, currentForm);
        return true
    }

    setSubmitButtonState() {
        const firstInputState = this.form.querySelectorAll('input')[0].validity.valid;
        const secondInputState = this.form.querySelectorAll('input')[1].validity.valid;
        const button = this.form.querySelector('button');
        if (firstInputState && secondInputState) {
            button.removeAttribute('disabled');
            button.classList.add('button_is-verified');
        } else {
            button.setAttribute('disabled', 'disabled');
            button.classList.remove('button_is-verified');
        }
    }

    setEventListeners() {
        this.form.addEventListener('input', (event) => {
            this.checkInputValidity(event);
            this.setSubmitButtonState();
        });
    }
}