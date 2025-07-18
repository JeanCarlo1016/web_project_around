import { likeCard, deleteCard, openPopupImages } from "./utils.js";

// 1. Crear las clases

export class Card {
  constructor(name, link, isLiked, cardId, templateSelector, handleCardClick, handleCardLike, handleCardDelete) {
    this._name = name;
    this._link = link;
    this._isLiked = isLiked;
    this._cardId = cardId;
    this._templateSelector = templateSelector;
    this._handleCardClick = handleCardClick;
  }

  _getTemplate() {
    const template = document.querySelector(this._templateSelector).content.querySelector(".places__card").cloneNode(true);
    return template;
  }

  setCardData() {
    this._imageEl.src = this._link;
    this._imageEl.alt = this._name;
    this._textEl.textContent = this._name;
  }

  _setEventListeners() {
    this._btnLike.addEventListener("click", () => this._toggleLike());
    this._btnDelete.addEventListener("click", () =>
      this._handleDeleteClick(this._element)
    );
    this._cardImage.addEventListener("click", () =>
      this._handleCardClick(this._link, this._name)
    );
  }

  _toggleLike() {
    this._handleLikeClick(this._cardId, this._isLiked)
      .then((newState) => {
        this._isLiked = newState;
        this._updateLikeButton();
      })
      .catch((err) => console.error("Error al alternar 'me gusta':", err));
  }
  _updateLikeButton() {
    if (this._isLiked) {
      this._btnLike.classList.add("places__button_like-active");
    } else {
      this._btnLike.classList.remove("places__button_like-active");
    }
  }

  // _setEventListeners() {
  //   this._likeBtn.addEventListener("click", () => likeCard(this._likeBtn));
  //   this._deleteBtn.addEventListener("click", () => deleteCard(this._element));
  //   this._imageEl.addEventListener("click", () => this._handleCardClick());
  // }

  // _handleCardLike() {

  // }
  // _handleCardClick() {
  //   this._element
  //     .querySelector(".places__image")
  //     .addEventListener("click", () => {
  //       this._handleCardClick.open(this._link, this._name);
  //     });
  // }

  renderCard() {
    this._element = this._getTemplate();
    this._imageEl = this._element.querySelector(".places__image");
    this._textEl = this._element.querySelector(".places__text");
    this._likeBtn = this._element.querySelector(".places__button_like");
    this._deleteBtn = this._element.querySelector(".places__button_trash");

    this.setCardData();
    this._setEventListeners();

    return this._element;
  }


}
