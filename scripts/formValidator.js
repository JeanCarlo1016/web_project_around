export class FormValidator {
  constructor(settings, elementToValidate) {
    this._settings = settings;
    this._elementToValidate = elementToValidate;

    this._inputList = Array.from(this._elementToValidate.querySelectorAll(this._settings.inputSelector));

    this._buttonElement = this._elementToValidate.querySelector(this._settings.submitButtonSelector);
  }


  _showError(inputElement) {
    const errorElement = this._elementToValidate.querySelector(`#${inputElement.id}-error`);

    errorElement.textContent = inputElement.validationMessage;
    errorElement.classList.add(this._settings.errorClass);
  }

  _hideError(inputElement) {
    const errorElement = this._elementToValidate.querySelector(`#${inputElement.id}-error`);

    errorElement.classList.remove(this._settings.errorClass);
    errorElement.textContent = '';
  }


  _checkInputValidity = (inputElement) => {
    if (!inputElement.validity.valid) {
      this._showError(inputElement);
    } else {
      this._hideError(inputElement);
    }
  }

  _toogleButtonState() {
    const isFormValid = this._inputList.every((input) => input.validity.valid);
    this._buttonElement.disabled = !isFormValid;
  }

  _setEventListeners() {
    this._inputList.forEach((inputElement) => {
      inputElement.addEventListener('input', () => {
        this._checkInputValidity(inputElement);
        this._toogleButtonState();
      });
    });

    this._toogleButtonState();
  }

  enableValidation() {
    this._setEventListeners();
  }

}