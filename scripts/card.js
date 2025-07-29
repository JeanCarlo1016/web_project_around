export class Card {
  constructor({ name, link, isLiked, cardId }, templateSelector, handleCardClick, handleCardLike, handleCardDelete) {
    this._name = name;
    this._link = link;
    this._isLiked = isLiked;
    this._cardId = cardId;
    this._templateSelector = templateSelector;
    this._handleCardClick = handleCardClick;
    this._handleLikeClick = handleCardLike;
    this._handleDeleteClick = handleCardDelete;
  }

  _getTemplate() {
    const templateElement = document.querySelector(this._templateSelector);

    if (!templateElement) {
      throw new Error(`No se encontró el template con selector: ${this._templateSelector}`);
    }

    const templateContent = templateElement.content;
    const cardElement = templateContent.firstElementChild.cloneNode(true);

    return cardElement;
  }


  _setEventListeners() {
    this._likeBtn.addEventListener("click", () => this._toggleLike());
    this._deleteBtn.addEventListener("click", () =>
      this._handleDeleteClick(this));

    this._imageEl.addEventListener("click", () =>
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
    this._likeBtn.classList.toggle("places__button_like-active", this._isLiked);
  }

  removeCard() {
    this._element.remove();
    this._element = null;
  }

  renderCard() {
    this._element = this._getTemplate();
    this._imageEl = this._element.querySelector(".places__image");
    this._textEl = this._element.querySelector(".places__text");
    this._likeBtn = this._element.querySelector(".places__button_like");
    this._deleteBtn = this._element.querySelector(".places__button_trash");

    this._imageEl.src = this._link;
    this._imageEl.alt = this._name;
    this._textEl.textContent = this._name;

    this._updateLikeButton();
    this._setEventListeners();

    return this._element;
  }
}
