let buttonEdit = document.querySelector(".content__edit_button");
let popup = document.querySelector(".popup");
let buttonClose = document.querySelector(".popup__button-cancel");
let formElement = document.querySelector(".popup__container");
let profileName = document.querySelector(".profile__name");
let profileAbout = document.querySelector(".profile__about");
let nameInput = document.querySelector(".form__name");
let aboutInput = document.querySelector(".form__about");

console.log(profileName);
console.log(profileAbout);
console.log(nameInput);
console.log(aboutInput);

function openPopup() {
  nameInput.value = profileName.textContent;
  aboutInput.value = profileAbout.textContent;
  popup.classList.toggle("popup_opened");
}

buttonEdit.addEventListener("click", openPopup);
buttonClose.addEventListener("click", openPopup);

function saveChange(e) {
  e.preventDefault();
  profileName.textContent = nameInput.value;
  profileAbout.textContent = aboutInput.value;
  openPopup();
}

formElement.addEventListener("submit", saveChange);