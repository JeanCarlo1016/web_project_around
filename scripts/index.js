// Elementos del popup cards
const cardsZone = document.querySelector('#cards__zone');
const buttonAddCard = document.querySelector('.profile__content-button-add');
const buttonCloseCard = document.querySelector(".popup__card_cancel");
const popup = document.querySelector("#popupImage");
const popimg = popup.querySelector(".popup__image_link");
const poptxt = popimg.querySelector(".popup__image_text");
// Elementos del popup perfil
const buttonEdit = document.querySelector(".content__info_edit_button");
const editProfile = document.querySelector(".popup__profile");
const buttonCloseProfile = document.querySelector(".popup__button-cancel");
let profileName = document.querySelector(".profile__name");
let profileAbout = document.querySelector(".profile__about");

const template = "#places__template";
import { Card } from "./card.js";
import { FormValidator } from "./formValidator.js";
import { Section } from "./section.js";
import PopupWithForm from "./popupWithForm.js";
import PopupWithImage from "./popupWithImage.js";

const validationSettings = {
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button-save',
  errorClass: 'error-visible'
};

const forms = document.querySelectorAll('form');

forms.forEach((form) => {
  const validator = new FormValidator(validationSettings, form);
  validator.enableValidation();
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


// // Cerrar popup perfil al hacer clic fuera del contenido
editProfile.addEventListener('click', (e) => {
  if (e.target === editProfile) {
    popupProfile.close();
  }
});



const popupImage = new PopupWithImage('.popup__image');
popupImage.setEventListeners();

const handleRenderer = (item) => {
  const newCard = new Card(item, template, popupImage);
  const cardElement = newCard.renderCard();
  cardsZone.prepend(cardElement);
  section.additem(cardElement);
}

const section = new Section(initialCards, (item) => handleRenderer(item), cardsZone);

section.createLayout();





function handleSubmitCardForm(values) {
  const name = values.card;
  const link = values.link;
  const cardData = { name, link };
  handleRenderer(cardData);
  popupCard.close();
}

function saveChangeProfile(values) {
  profileName.textContent = values.name;
  profileAbout.textContent = values.about;
  popupProfile.close();
}
//Popup perfil
const popupProfile = new PopupWithForm(".popup__profile", saveChangeProfile);
popupProfile.setEventListeners();

buttonEdit.addEventListener("click", () => popupProfile.open());
buttonCloseProfile.addEventListener("click", () => popupProfile.close());

//Popup crear card
const popupCard = new PopupWithForm('.popup__card', handleSubmitCardForm);
popupCard.setEventListeners();

// Event listeners para botones y formularios
buttonAddCard.addEventListener("click", () => popupCard.open());
buttonCloseCard.addEventListener('click', () => popupCard.close());
//formCard.addEventListener('submit', handleSubmitCardForm);


