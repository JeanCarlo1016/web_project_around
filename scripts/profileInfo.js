export default class ProfileInfo {
  constructor({ nameSelector, aboutSelector, imageSelector }) {
    this.nameSelector = document.querySelector(nameSelector);
    this.aboutSelector = document.querySelector(aboutSelector);
    this.imageSelector = document.querySelector(imageSelector);
  }
  getProfileInfo() {
    return {
      name: this.nameSelector.textContent,
      about: this.aboutSelector.textContent,
      image: this.imageSelector.src
    };
  }
  setProfileInfo({ name, about, image }) {
    this.nameSelector.textContent = name;
    this.aboutSelector.textContent = about;
    if (image) {
      this.imageSelector.src = image;
    }
  }
}