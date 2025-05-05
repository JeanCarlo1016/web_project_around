//Elementos del popup cards
const placesZone = document.querySelector('#cards__zone');
const placesContainer = document.querySelector('.places__card');
const popupCard = document.querySelector('.popup__opened_card');
const buttonAddCard = document.querySelector('.profile__content-button-add');
const buttonCloseCard = document.querySelector(".popup__button_cancel_card");
const titleCard = document.querySelector('.popup__name_card');
const linkCard = document.querySelector('.popup__link_card');
const formElementCard = document.querySelector('.popup__container_card');
const likeButton = document.querySelector('.places__button_like');
//Elementos del popup Imagen
const popupImage = document.querySelector('.popup__image');
const popupImgTag = popupImage.querySelector('.popup__image_link');
const popupText = popupImage.querySelector('.popup__image_text');
const closeBtn = popupImage.querySelector('.popup__image-button-close');
//Elementos del popup perfil
const buttonEdit = document.querySelector(".content__info_edit_button");
const popupProfile = document.querySelector(".popup");
const buttonClose = document.querySelector(".popup__button-cancel");
const formElementProfile = document.querySelector(".popup__container");
let profileName = document.querySelector(".profile__name");
let profileAbout = document.querySelector(".profile__about");
let nameInput = document.querySelector(".popup__name");
let aboutInput = document.querySelector(".popup__about");

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

function giveLike() {
  console.log(likeButton);
  likeButton.classList.add('places__button_like-active');
}

//funciones del popup Image

function openPopupImage(name, link) {
  popupImgTag.src = link;
  popupImgTag.alt = name;
  popupText.textContent = name;
  popupImage.classList.add('popup_opened');
  popupImage.style = "display:block";
}

function closePopupImage() {
  popupImage.classList.remove('popup_opened');
  popupImage.style = "display:none";
}
closeBtn.addEventListener('click', closePopupImage);

//Funciones de las cards
function openPopupCard() {
  popupCard.style = "display:block";
}
function closePopupCard() {
  popupCard.style = "display:none";
}

function createCard(cardData) {
  const template = document.querySelector("#places__template").content;
  const newCard = template.querySelector('.places__card').cloneNode(true);

  const cardTitle = newCard.querySelector('.places__text');
  const cardImage = newCard.querySelector('.places__image');
  const deleteButton = newCard.querySelector('.places__button_trash');

  cardTitle.textContent = cardData.name;
  cardImage.src = cardData.link;
  cardImage.alt = cardData.name;
  deleteButton.addEventListener('click', () => (newCard.remove()));

  cardImage.addEventListener('click', () => {
    openPopupImage(cardData.name, cardData.link);
  });
  return newCard;
}

function handlePopupCardClose() {
  closePopupCard();
}

function addCards() {
  initialCards.forEach((cardData) => {
    const card = createCard(cardData);
    placesZone.appendChild(card);
    closePopupCard();
  });
}

function handleSubmitCardForm(e) {
  e.preventDefault();
  const name = titleCard.value;
  const link = linkCard.value;
  const cardElement = {
    name,
    link
  }
  const card = createCard(cardElement);
  placesZone.prepend(card);
  closePopupCard();
}

addCards();

buttonAddCard.addEventListener("click", openPopupCard);
buttonCloseCard.addEventListener('click', closePopupCard);
formElementCard.addEventListener('submit', handleSubmitCardForm);
likeButton.addEventListener('click', giveLike);

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