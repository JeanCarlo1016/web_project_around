import Popup from "./popup.js";

export default class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
    this.imageElement = this.popup.querySelector('.popup__image_link');
    this.captionElement = this.popup.querySelector('.popup__image_text');
  }
  open(src, caption) {
    this.imageElement.src = src;
    this.imageElement.alt = caption;
    this.captionElement.textContent = caption;
    super.open(src, caption);
  }
}