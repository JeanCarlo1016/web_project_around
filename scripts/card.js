import { likeCard, deleteCard, openPopupImages } from "./utils.js";

// 1. Crear las clases

export class Card {
  constructor(cardData, templateSelector, openImage) {
    this._name = cardData.name;
    this._link = cardData.link;
    this._templateSelector = templateSelector;
    this._openImage = openImage;
  }

  _getTemplate() {
    const template = document.querySelector(this._templateSelector);
    return template.content.querySelector(".places__card").cloneNode(true);
  }

  _setCardData() {
    this._imageEl.src = this._link;
    this._imageEl.alt = this._name;
    this._textEl.textContent = this._name;
  }

  _setEventListeners() {
    this._likeBtn.addEventListener("click", () => likeCard(this._likeBtn));
    this._deleteBtn.addEventListener("click", () => deleteCard(this._element));
    this._imageEl.addEventListener("click", () => openPopupImages(this._name, this._link));
  }

  renderCard() {
    this._element = this._getTemplate();
    this._imageEl = this._element.querySelector(".places__image");
    this._textEl = this._element.querySelector(".places__text");
    this._likeBtn = this._element.querySelector(".places__button_like");
    this._deleteBtn = this._element.querySelector(".places__button_trash");

    this._setCardData();
    this._setEventListeners();

    return this._element;
  }


}
