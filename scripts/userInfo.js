export class UserInfo {
  constructor(name, about) {
    this.name = name;
    this.about = about;
  }
  getUserInfo() {
    return {
      name: this.name.textContent,
      about: this.about.textContent,
    };
  }
  setUserInfo({ name, about }) {
    this.name.textContent = name;
    this.about.textContent = about;
  }
}