// Elementos del popup cards
const cardsZone = document.querySelector('#cards__zone');
const buttonAddCard = document.querySelector('.profile__content-button-add');
const buttonCloseCard = document.querySelector("#popup-add-card .popup__close-button");
const popup = document.querySelector("#popupImage");

//Elementos de la Card
const buttonDeleteCard = document.querySelector('places__button_trash');

// Elementos del popup perfil
const buttonEdit = document.querySelector(".content__info_edit_button");
const buttonCloseProfile = document.querySelector(".popup__close-button");

//Imagen del perfil
const profileImage = document.querySelector('.profile__image');

const template = "#places__template";

import { Card } from "./card.js";
import { FormValidator } from "./formValidator.js";
import { Section } from "./section.js";
import PopupWithForm from "./popupWithForm.js";
import PopupWithImage from "./popupWithImage.js";
import { api } from "./api.js";
import ProfileInfo from "./profileInfo.js";

// Validación
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

// Perfil
const profileInfo = new ProfileInfo({
  nameSelector: '.profile__name',
  aboutSelector: '.profile__about',
  imageSelector: '.profile__image'
});

api.getProfileInfo()
  .then((data) => {
    profileInfo.setProfileInfo({
      name: data.name,
      about: data.about,
      image: data.avatar
    });
  })
  .catch((err) => console.error("Error al cargar perfil:", err));

// Guardar cambios perfil
function saveChangeProfile(values) {
  api.editProfileInfo({
    name: values.name,
    about: values.about,
  }).then(() => {
    profileInfo.setProfileInfo(values);
    popupProfile.close();
  }).catch((err) => console.error("Error al actualizar perfil:", err));
}

// Popup perfil
const popupProfile = new PopupWithForm("#popup-profile", saveChangeProfile);
popupProfile.setEventListeners();

buttonEdit.addEventListener("click", () => popupProfile.open());
buttonCloseProfile.addEventListener("click", () => popupProfile.close());

// Popup imagen
const popupImage = new PopupWithImage('#popupImage');
popupImage.setEventListeners();

// Popup crear tarjeta
const popupCard = new PopupWithForm('#popup-add-card', handleSubmitCardForm);
popupCard.setEventListeners();

buttonAddCard.addEventListener("click", () => popupCard.open());
buttonCloseCard.addEventListener("click", () => popupCard.close());

// Popup eliminar tarjeta
let cardToDelete = null;

const popupDeleteConfirm = new PopupWithForm('#popup-delete', () => {
  if (!cardToDelete) return;

  return api.deleteCard(cardToDelete._cardId)
    .then(() => {
      cardToDelete.removeCard();
      popupDeleteConfirm.close();
    })
    .catch((err) => {
      console.error("Error al eliminar tarjeta:", err);
    });
}, 'Eliminando...');

popupDeleteConfirm.setEventListeners();

// Función para manejar el click en el botón de eliminar
function handleCardDelete(cardInstance) {
  console.log("Click eliminar tarjeta", cardInstance);
  cardToDelete = cardInstance;
  popupDeleteConfirm.open();
  console.log("Se intentó abrir popupDeleteConfirm");
}


// Función para manejar el like
function handleCardLike(cardId, isLiked) {
  return api.toggleLike(cardId, isLiked)
    .then(() => !isLiked)
    .catch((err) => {
      console.error("Error al dar like:", err);
      throw err;
    });
}

// Función para ver imagen en grande
function handleCardClick(link, name) {
  popupImage.open(link, name);
}

//buttonDeleteCard.addEventListener('click', popupDeleteConfirm.open());
// Sección de tarjetas
let section = null;

api.getInitialCards()
  .then((cards) => {
    section = new Section(cards, (item) => {
      const newCard = new Card(
        {
          name: item.name,
          link: item.link,
          isLiked: item.isLiked,
          cardId: item._id
        },
        template,
        handleCardClick,
        handleCardLike,
        handleCardDelete
      );
      const cardElement = newCard.renderCard();
      section.additem(cardElement);
    }, cardsZone);

    section.createLayout();
  })
  .catch(err => {
    console.error("Error al obtener tarjetas:", err);
  });

// Función para agregar nueva tarjeta
function handleSubmitCardForm(values) {
  api.addCards({
    name: values.card,
    link: values.link,
  }).then((newCardData) => {
    const newCard = new Card(
      {
        name: newCardData.name,
        link: newCardData.link,
        isLiked: false,
        cardId: newCardData._id
      },
      template,
      handleCardClick,
      handleCardLike,
      handleCardDelete
    );
    const cardElement = newCard.renderCard();
    section.additem(cardElement);
    popupCard.close();
  }).catch(err => {
    console.error("Error al agregar tarjeta:", err);
  });
}

// Abre el popup al hacer click en la imagen
profileImage.addEventListener('click', () => popupAvatar.open());

// // Cambiar imagen
// function handleAvatarSubmit({ avatar }) {
//   api.editProfilePhoto({ avatar })
//     .then((updateAvatar) => {
//       profileInfo.setUserAvatar({
//         avatar: updateAvatar.avatar;
//       })
//     })
//     .catch(err => console.error("Error al actualizar avatar:", err))

// }

const popupAvatar = new PopupWithForm('#popup-avatar', (data) => {
  api.editProfilePhoto({
    name: data.name,
    about: data.about,
    avatar: data.avatar
  }).then(() => {
    profileInfo.setUserAvatar(data.avatar);
    popupAvatar.close();
  })
    .catch(err => console.error("Error al actualizar avatar:", err))
});
popupAvatar.setEventListeners();
