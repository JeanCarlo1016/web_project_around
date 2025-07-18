// Elementos del popup cards
const cardsZone = document.querySelector('#cards__zone');
const buttonAddCard = document.querySelector('.profile__content-button-add');
const buttonCloseCard = document.querySelector(".popup__close-button");
const popup = document.querySelector("#popupImage");
const popimg = popup.querySelector(".popup__preview-image");
//const poptxt = popimg.querySelector(".popup__preview-caption");
// Elementos del popup perfil
const buttonEdit = document.querySelector(".content__info_edit_button");
const editProfile = document.querySelector(".popup__profile");
const buttonCloseProfile = document.querySelector(".popup__button-cancel");
const profileName = document.querySelector(".profile__name");
const profileAbout = document.querySelector(".profile__about");

const template = "#places__template";
import { Card } from "./card.js";
import { FormValidator } from "./formValidator.js";
import { Section } from "./section.js";
import PopupWithForm from "./popupWithForm.js";
import PopupWithImage from "./popupWithImage.js";
import { api } from "./api.js";
import ProfileInfo from "./profileInfo.js";


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

const profileInfo = new ProfileInfo({
  nameSelector: '.profile__name',
  aboutSelector: '.profile__about',
  imageSelector: '.profile__image'
});

api.getProfileInfo().then((data) => {
  profileInfo.setProfileInfo({
    name: data.name,
    about: data.about,
    image: data.avatar
  })
})

function saveChangeProfile(values) {
  api.editProfileInfo({
    name: values.name,
    about: values.about,
  }).then(() => {
    profileInfo.setProfileInfo(values);
  })
  popupProfile.close();
}

//Popup perfil
const popupProfile = new PopupWithForm(".popup__profile", saveChangeProfile);
popupProfile.setEventListeners();

// // Cerrar popup perfil al hacer clic fuera del contenido
editProfile.addEventListener('click', (e) => {
  if (e.target === editProfile) {
    popupProfile.close();
  }
});


api.getInitialCards().then((cards) => {

  const section = new Section(cards, (item) => {
    const newCard = new Card(item, template, popupImage);
    const cardElement = newCard.renderCard();
    //cardsZone.prepend(cardElement);
    section.additem(cardElement);
  }, cardsZone);

  section.createLayout();
})

const popupImage = new PopupWithImage('.popup__image');
popupImage.setEventListeners();

// const handleRenderer = (item) => {
//   const newCard = new Card(item, template, popupImage);
//   const cardElement = newCard.renderCard();
//   cardsZone.prepend(cardElement);
//   section.additem(cardElement);
// }


function handleSubmitCardForm(values) {
  console.log(values);
  api.addCards({
    name: values.card,
    link: values.link,
  }).then(() => {
    api.getInitialCards().then((cards) => {

      const section = new Section(cards, (item) => {
        console.log(cards);
        const newCard = new Card(item, template, popupImage);
        const cardElement = newCard.renderCard();
        //cardsZone.prepend(cardElement);
        section.additem(cardElement);
      }, cardsZone);

      section.createLayout();
    })
  })
  popupCard.close();
}





buttonEdit.addEventListener("click", () => popupProfile.open());
buttonCloseProfile.addEventListener("click", () => popupProfile.close());

//Popup crear card
const popupCard = new PopupWithForm('.popup__card', handleSubmitCardForm);
popupCard.setEventListeners();

// Event listeners para botones y formularios
buttonAddCard.addEventListener("click", () => popupCard.open());
buttonCloseCard.addEventListener('click', () => popupCard.close());
//formCard.addEventListener('submit', handleSubmitCardForm);


