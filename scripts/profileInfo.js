export default class ProfileInfo {
  constructor({ nameSelector, aboutSelector, imageSelector }) {
    this.nameSelector = document.querySelector(nameSelector);
    this.aboutSelector = document.querySelector(aboutSelector);
    this._imageElement = document.querySelector(imageSelector);
  }
  getProfileInfo() {
    return {
      name: this.nameSelector.textContent,
      about: this.aboutSelector.textContent,
      image: this._imageElement.src
    };
  }
  setProfileInfo({ name, about, image }) {
    this.nameSelector.textContent = name;
    this.aboutSelector.textContent = about;
    if (image) {
      this._imageElement.src = image;
    }
  }
  setUserAvatar(avatarUrl) {
    this._imageElement.src = avatarUrl;
  }
}