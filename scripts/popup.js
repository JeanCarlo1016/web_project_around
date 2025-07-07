export default class Popup {
  constructor(popupSelector) {
    this.popup = document.querySelector(popupSelector);
  }

  open() {
    this.popup.classList.add('active');
  }
  close() {
    this.popup.classList.remove('active');
  }

  _handleEscClose(event) {
    if (event.key === 'Escape' || event.key === 'Esc') {
      this.close();
    }
  }
  setEventListeners() {
    document.addEventListener("keydown", (evt) => {
      this._handleEscClose(evt);
    });

    document.addEventListener("click", (evt) => {
      if (evt.target !== this.popupSelector) {
        this._handleEscClose(evt);
      }
    })
  }
}