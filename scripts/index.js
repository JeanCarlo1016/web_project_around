
//Elementos del popup cards
const placesZone = document.querySelector('#cards__zone');
const placesContainer = document.querySelector('.places__card');
const popupCard = document.querySelector('.popup__opened_card');
const buttonAddCard = document.querySelector('.profile__content-button-add');
const buttonCloseCard = document.querySelector(".popup__button_cancel_card");
const titleCard = document.querySelector('.popup__name_card');
const linkCard = document.querySelector('.popup__link_card');
const formElementCard = document.querySelector('.popup__container_card');

//Elementos del popup Imagen
const popupImage = document.querySelector('.popup__image');
const popupImgTag = popupImage.querySelector('.popup__image_link');
const popupText = popupImage.querySelector('.popup__image_text');

//Elementos del popup perfil
const buttonEdit = document.querySelector(".content__info_edit_button");
const popupProfile = document.querySelector(".popup");
const buttonClose = document.querySelector(".popup__button-cancel");
const formElementProfile = document.querySelector(".popup__container");
let profileName = document.querySelector(".profile__name");
let profileAbout = document.querySelector(".profile__about");
let nameInput = document.querySelector(".popup__name");
let aboutInput = document.querySelector(".popup__about");
const template = "#places__template";
import { enableValidation } from "./formValidator.js";
import { likeCard, deleteCard, openPopupImages } from "./utils.js";
import { Card } from "./card.js";

enableValidation({
  formSelector: "#form",
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__button-save",
  inactiveButtonClass: "popup__button_disabled",
  inputErrorClass: "input-error",
  errorClass: "error-visible"
});

const initialCards = [
  {
    name: "Valle de Yosemite",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/new-markets/WEB_sprint_5/ES/yosemite.jpg"
  },
  {
    name: "Lago Louise",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/new-markets/WEB_sprint_5/ES/lake-louise.jpg"
  },
  {
    name: "Montañas Calvas",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/new-markets/WEB_sprint_5/ES/bald-mountains.jpg"
  },
  {
    name: "Latemar",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/new-markets/WEB_sprint_5/ES/latemar.jpg"
  },
  {
    name: "Parque Nacional de la Vanoise",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/new-markets/WEB_sprint_5/ES/vanoise.jpg"
  },
  {
    name: "Lago di Braies",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/new-markets/WEB_sprint_5/ES/lago.jpg"
  }
];






//Funciones de las cards
function openPopupCard() {
  popupCard.style = "display:block";
}
function closePopupCard() {
  popupCard.style = "display:none";
}

function createCard(cardData) {
  const newCard = new Card(cardData, template);
  const cardElement = newCard.renderCard();
  placesZone.prepend(cardElement);
}
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") {
    //tooglePopupImages(cardData.name, cardData.link);
    closePopupCard();
    closePopupProfile();
  }
});


document.addEventListener('click', (e) => {
  const closeClass = e.target.classList;
  if (closeClass.contains('popup_opened_preview') || closeClass.display === 'flex') {
    closePopupImage();
    closePopupCard();
    closePopupProfile();
  }
});

function handlePopupCardClose() {
  closePopupCard();
}

function addCards() {
  initialCards.forEach((cardData) => {
    const newCard = new Card(cardData, template);
    const card = newCard.renderCard();
    placesZone.appendChild(card);
    closePopupCard();
  });
}

function handleSubmitCardForm(e) {
  e.preventDefault();
  const name = titleCard.value;
  const link = linkCard.value;
  const cardData = { name, link };
  createCard(cardData); // Ya se inserta adentro
  closePopupCard();
}

addCards();

buttonAddCard.addEventListener("click", openPopupCard);
buttonCloseCard.addEventListener('click', closePopupCard);
formElementCard.addEventListener('submit', handleSubmitCardForm);

//Funciones especiales al dar ESCAPE o CLICK en otro lado de los forms o cards

//Funciones del Profile
function openPopupProfile() {
  nameInput.value = profileName.textContent;
  aboutInput.value = profileAbout.textContent;
  popupProfile.style = "display:block";
}

function closePopupProfile() {
  popupProfile.style = "display:none";
}

buttonEdit.addEventListener("click", openPopupProfile);
buttonClose.addEventListener("click", closePopupProfile);

function saveChangeProfile(e) {
  e.preventDefault();
  profileName.textContent = nameInput.value;
  profileAbout.textContent = aboutInput.value;
  openPopupProfile();
  closePopupProfile();
}
formElementProfile.addEventListener("submit", saveChangeProfile);
