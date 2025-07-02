export class Popup {
  constructor(popupSelector) {
    this._popupSelector = popupSelector;
  }

  _open() {
    this._popupSelector.classList.add('active');
    console.log('si lo intenta abrir');
  }
  _close() {
    this._popupSelector.classList.remove('active');
  }

  _handleEscClose() {

  }
  setEventListeners() {

  }
}