// Elementos del popup cards
const cardsZone = document.querySelector('#cards__zone');
const buttonAddCard = document.querySelector('.profile__content-button-add');
const buttonCloseCard = document.querySelector(".popup__button_cancel_card");
const titleCard = document.querySelector('.popup__name_card');
const linkCard = document.querySelector('.popup__link_card');
const formCard = document.querySelector('.popup__container_card');
const popup = document.querySelector("#popupImage");
const popimg = popup.querySelector(".popup__image_link");
const poptxt = popimg.querySelector(".popup__image_text");
// Elementos del popup perfil
const buttonEdit = document.querySelector(".content__info_edit_button");
const editProfile = document.querySelector(".popup__profile");
const buttonCloseProfile = document.querySelector(".popup__button-cancel");
const formProfile = document.querySelector(".popup__container");
let profileName = document.querySelector(".profile__name");
let profileAbout = document.querySelector(".profile__about");
let nameInput = document.querySelector(".popup__name");
let aboutInput = document.querySelector(".popup__about");
const template = "#places__template";
import { Card } from "./card.js";
import { FormValidator } from "./formValidator.js";
import { Section } from "./section.js";
import Popup from "./popup.js";
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

// Funciones para abrir y cerrar popup cards
// function openPopupCard() {
//   popupCard.classList.add('active');
//   //popupCard.style.display = "block";
// }
// function closePopupCard() {
//   popupCard.classList.remove('active');
//   //popupCard.style.display = "none";
// }

// // Funciones para abrir y cerrar popup perfil
// function openPopupProfile() {
//   nameInput.value = profileName.textContent;
//   aboutInput.value = profileAbout.textContent;
//   editProfile.style.display = "block";
// }
// function closePopupProfile() {
//   editProfile.style.display = "none";
// }

// Cerrar popup cards al hacer clic fuera del contenido
// popupCard.addEventListener('click', (e) => {
//   if (e.target === popupCard) {
//     closePopupCard();
//   }
// });

// // Cerrar popup perfil al hacer clic fuera del contenido
editProfile.addEventListener('click', (e) => {
  if (e.target === editProfile) {
    popupProfile.close();
  }
});


// document.addEventListener('keydown', (e) => {
//   if (e.key === 'Escape' || e.key === 'Esc') {
//     // Cerrar popup card si está abierto
//     if (popupCard.classList.contains('active')) {
//       closePopupCard();
//     }
//     // Cerrar popup perfil si está abierto
//     if (editProfile.classList.contains('active')) {
//       closePopupProfile();
//     }
//     // Cerrar popup preview si está abierto
//     if (popupImagePreview.classList.contains('active')) {
//       popupImagePreview.classList.remove('active');
//     }
//   }
// });

// --- Popup preview ---

//const popupImagePreview = document.querySelector('.popup__image');


// Crear y agregar cards
// function createCard(cardData) {
//   const newCard = new Card(cardData, template);
//   const cardElement = newCard.renderCard();
//   cardsZone.prepend(cardElement);
//   return cardElement;
// }
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

// function addCards() {
//   initialCards.forEach((cardData) => {
//     const newCard = new Card(cardData, template);
//     const card = newCard.renderCard();
//     cardsZone.appendChild(card);
//     closePopupCard();
//   });
// }



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


