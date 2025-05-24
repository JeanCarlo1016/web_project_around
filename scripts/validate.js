const showError = (input, config) => {
  const inputElement = document.querySelector(`#${input.id}-error`);
  inputElement.textContent = input.validationMessage;
  inputElement.classList.add(config.errorClass);
}
const hideError = (input, config) => {
  const inputElement = document.querySelector(`#${input.id}-error`);
  inputElement.textContent = '';
  inputElement.classList.remove(config.errorClass);
}

const checkInputValidity = (input, config) => {
  if (input.validity.valid) {
    hideError(input, config);
  } else {
    showError(input, config);
  }
}

const toggleButtonState = (form, button, config) => {
  const inputs = Array.from(form.querySelectorAll(config.inputSelector));
  const isValid = inputs.every((input) => input.validity.valid);
  if (isValid) {
    button.disabled = false;
    button.classList.remove(config.inactiveButtonClass);
  } else {
    button.disabled = true;
    button.classList.add(config.inactiveButtonClass);
  }
}

const setEventListener = (form, config) => {
  const inputs = form.querySelectorAll(config.inputSelector);
  const button = form.querySelector(config.submitButtonSelector);
  toggleButtonState(form, button, config);
  inputs.forEach((input) => {
    input.addEventListener("input", () => {
      toggleButtonState(form, button, config);
      checkInputValidity(input, config);
    });
  });

  form.addEventListener("submit", (e) => {
    e.preventDefault();
  });
}

export const enableValidation = (config) => {
  const forms = document.querySelectorAll(config.formSelector);
  forms.forEach((form) => {
    setEventListener(form, config);
  });
}