// Elementos del popup cards
const placesZone = document.querySelector('#cards__zone');
const popupCard = document.querySelector('.popup__opened_card');
const buttonAddCard = document.querySelector('.profile__content-button-add');
const buttonCloseCard = document.querySelector(".popup__button_cancel_card");
const titleCard = document.querySelector('.popup__name_card');
const linkCard = document.querySelector('.popup__link_card');
const formElementCard = document.querySelector('.popup__container_card');

// Elementos del popup perfil
const buttonEdit = document.querySelector(".content__info_edit_button");
const popupProfile = document.querySelector(".popup__profile");
const buttonClose = document.querySelector(".popup__button-cancel");
const formElementProfile = document.querySelector(".popup__container");
let profileName = document.querySelector(".profile__name");
let profileAbout = document.querySelector(".profile__about");
let nameInput = document.querySelector(".popup__name");
let aboutInput = document.querySelector(".popup__about");
const template = "#places__template";
import { Card } from "./card.js";
import { FormValidator } from "./formValidator.js";

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
function openPopupCard() {
  popupCard.style.display = "block";
}
function closePopupCard() {
  popupCard.style.display = "none";
}

// Funciones para abrir y cerrar popup perfil
function openPopupProfile() {
  nameInput.value = profileName.textContent;
  aboutInput.value = profileAbout.textContent;
  popupProfile.style.display = "block";
}
function closePopupProfile() {
  popupProfile.style.display = "none";
}

// Cerrar popup cards al hacer clic fuera del contenido
popupCard.addEventListener('click', (e) => {
  if (e.target === popupCard) {
    closePopupCard();
  }
});

// Cerrar popup perfil al hacer clic fuera del contenido
popupProfile.addEventListener('click', (e) => {
  if (e.target === popupProfile) {
    closePopupProfile();
  }
});


document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' || e.key === 'Esc') {
    // Cerrar popup card si está abierto
    if (popupCard.style.display === "block") {
      closePopupCard();
    }
    // Cerrar popup perfil si está abierto
    if (popupProfile.classList.contains('popup_opened')) {
      closePopupProfile();
    }
    // Cerrar popup preview si está abierto
    if (popupImagePreview.classList.contains('popup_opened_preview')) {
      popupImagePreview.classList.remove('popup_opened_preview');
    }
  }
});

// --- Popup preview ---

const popupImagePreview = document.getElementById('popup__image_preview');

popupImagePreview.addEventListener('click', (e) => {
  // Cerrar si clic fuera del contenido (suponiendo contenido dentro .popup__content_img)
  if (e.target === popupImagePreview) {
    popupImagePreview.classList.remove('popup_opened_preview');
  }
});

// Puedes agregar también un botón para cerrar el preview si tienes uno:
const btnClosePreview = popupImagePreview.querySelector('.popup__image-button-close');
if (btnClosePreview) {
  btnClosePreview.addEventListener('click', () => {
    popupImagePreview.classList.remove('popup_opened_preview');
  });
}

// Crear y agregar cards
function createCard(cardData) {
  const newCard = new Card(cardData, template);
  const cardElement = newCard.renderCard();
  placesZone.prepend(cardElement);
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
  createCard(cardData);
  closePopupCard();
}

addCards();

// Event listeners para botones y formularios
buttonAddCard.addEventListener("click", openPopupCard);
buttonCloseCard.addEventListener('click', closePopupCard);
formElementCard.addEventListener('submit', handleSubmitCardForm);

buttonEdit.addEventListener("click", openPopupProfile);
buttonClose.addEventListener("click", closePopupProfile);

function saveChangeProfile(e) {
  e.preventDefault();
  profileName.textContent = nameInput.value;
  profileAbout.textContent = aboutInput.value;
  closePopupProfile();
}

formElementProfile.addEventListener("submit", saveChangeProfile);
