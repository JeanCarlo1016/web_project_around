//Variables del popupImage
const popupImage = document.querySelector('#popup__image_preview');
const cardTitle = popupImage.querySelector('.popup__image_text');
const cardImage = popupImage.querySelector('.popup__image_link');
const closeBtn = popupImage.querySelector('.popup__image-button-close');

function likeCard(heart) {
  if (heart.classList.contains('places__button_like-active')) {
    heart.classList.remove('places__button_like-active');
  } else {
    heart.classList.add('places__button_like-active');
  }
}

function deleteCard(cardToDelete) {
  cardToDelete.remove();
}

function openPopupImages(name, link) {

  popupImage.classList.add('popup_opened_preview');

  if (cardTitle && cardImage) {
    cardTitle.textContent = name;
    cardImage.src = link;
    cardImage.alt = name;
  } else {
    console.warn("No se encontraron los elementos para mostrar la imagen.");
  }
}
closeBtn.addEventListener('click', function () {
  popupImage.classList.remove('popup_opened_preview');
});

export {
  likeCard,
  deleteCard,
  openPopupImages
}