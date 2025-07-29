import Popup from "./popup.js";

export default class PopupWithForm extends Popup {
  constructor(popupSelector, handleData, loadingText = 'Guardando...') {
    super(popupSelector);
    this.handleData = handleData;
    this.form = this.popup.querySelector('form');
    if (!this.form) {
      throw new Error(`No se encontró un formulario dentro de ${popupSelector}`);
    }
    this.inputList = this.form.querySelectorAll('.popup__input');
    this._submitButton = this.form.querySelector('button[type="submit"]');
    this._defaultButtonText = this._submitButton ? this._submitButton.textContent : '';
  }
  _getInputValues() {
    const values = {};
    this.inputList.forEach((input) => {
      values[input.id] = input.value;
    });
    return values;
  }
  open() {
    console.log("PopupWithForm.open() en", this.popup);
    super.open();
  }

  _renderLoading(isLoading) {
    if (!this._submitButton) return;
    if (isLoading) {
      this._submitButton.textContent = this.loadingText;
      this._submitButton.disabled = true;
    } else {
      this._submitButton.textContent = this._defaultButtonText;
      this._submitButton.disabled = false;
    }
  }

  setEventListeners() {
    super.setEventListeners();
    this.form.addEventListener("submit", (evt) => {
      evt.preventDefault();
      this._renderLoading(true);
      Promise.resolve(this.handleData(this._getInputValues()))
        .then(() => {
          // opcional: cerrar popup en handleData o aquí
        })
        .catch((err) => {
          console.error(err);
          // opcional: mostrar mensaje error
        })
        .finally(() => {
          this._renderLoading(false);
        });
    });
  }
  close() {
    super.close();
    this.form.reset();
  }
}