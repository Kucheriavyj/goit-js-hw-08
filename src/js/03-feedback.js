import throttle from 'lodash.throttle';

const formEl = document.querySelector('form.feedback-form');
const inputEmailEl = document.querySelector('input');
const textareaMessageEl = document.querySelector('textarea');
const buttonSubmitEl = document.querySelector('button');


const obj = {};
const INPUT_FORM_KEY = 'feedback-form-state';

reloadPage();

formEl.addEventListener('input', throttle(onWriteDataToLocalStorage, 500));
formEl.addEventListener('submit', onSubmitForm);

function onWriteDataToLocalStorage(evt) {
  checkSubmitButton();
  obj[evt.target.getAttribute('name')] = evt.target.value;
  localStorage.setItem(INPUT_FORM_KEY, JSON.stringify(obj));
};

function onSubmitForm(evt) {
  evt.preventDefault();
  console.log(obj);
  formEl.reset();
  localStorage.removeItem(INPUT_FORM_KEY);
  obj.email = '';
  obj.message = '';
  checkSubmitButton();
};

function reloadPage() {
  const dataFromLocalStorage = JSON.parse(localStorage.getItem(INPUT_FORM_KEY));

  if (dataFromLocalStorage) {
    if (dataFromLocalStorage.email) {
      inputEmailEl.value = dataFromLocalStorage.email;
      obj.email = dataFromLocalStorage.email;
    }

    if (dataFromLocalStorage.message) {
      textareaMessageEl.value = dataFromLocalStorage.message;
      obj.message = dataFromLocalStorage.message;
    }
  }
  checkSubmitButton();
};

function checkSubmitButton() {
  if (!inputEmailEl.value.length || !textareaMessageEl.value) {
    buttonSubmitEl.setAttribute('disabled', 'true');
  } else {
    if (buttonSubmitEl.hasAttribute('disabled')) {
      buttonSubmitEl.removeAttribute('disabled');
    }
  }
};