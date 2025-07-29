export default class Popup {
  constructor(popupSelector) {
    this.popup = document.querySelector(popupSelector);
    this._handleEscClose = this._handleEscClose.bind(this);
    this._handleOverlayClick = this._handleOverlayClick.bind(this);
  }

  open() {
    this.popup.classList.add('popup_opened');
    document.addEventListener('keydown', this._handleEscClose);
    this.popup.addEventListener('mousedown', this._handleOverlayClick);
  }

  close() {
    this.popup.classList.remove('popup_opened');
    document.removeEventListener('keydown', this._handleEscClose);
    this.popup.removeEventListener('mousedown', this._handleOverlayClick);
  }

  _handleEscClose(event) {
    if (event.key === 'Escape') {
      this.close();
    }
  }

  _handleOverlayClick(event) {
    // Cierra si el click fue fuera del contenido (en el overlay)
    if (event.target === this.popup || event.target.classList.contains('popup__close')) {
      this.close();
    }
  }

  setEventListeners() {
    // Ya lo hacemos en open() y close(), así que no necesitas agregar eventos globales aquí
  }
}
