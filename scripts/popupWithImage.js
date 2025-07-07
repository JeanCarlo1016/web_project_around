import Popup from "./popup.js";

export default class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
    this.imageElement = this.popup.querySelector('.popup__preview-image');
    this.captionElement = this.popup.querySelector('.popup__preview-caption');
  }
  open(src, caption) {
    this.imageElement.src = src;
    this.imageElement.alt = caption;
    this.captionElement.textContent = caption;
    super.open(src, caption);
  }
}