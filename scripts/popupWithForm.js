import Popup from "./popup.js";

export default class PopupWithForm extends Popup {
  constructor(popupSelector, handleData) {
    super(popupSelector);
    this.handleData = handleData;
    this.form = this.popup.querySelector('form');
    if (!this.form) {
      throw new Error(`No se encontró un formulario dentro de ${popupSelector}`);
    }
    this.inputList = this.form.querySelectorAll('.popup__input');
  }
  _getInputValues() {
    const values = {};
    this.inputList.forEach((input) => {
      values[input.id] = input.value;
    });
    return values;
  }

  //Modifica el metodo close
  //reiniciar el formulario
  setEventListeners() {
    super.setEventListeners();
    this.form.addEventListener("submit", (evt) => {
      evt.preventDefault();
      this.handleData(this._getInputValues());
    });
  }
  close() {
    super.close();
    this.form.reset();
  }
}