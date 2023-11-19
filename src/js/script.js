const form = document.querySelector('#form');
const formSend = document.querySelector('#form-send');
const inputField = document.querySelectorAll('.form-field');
const inputMessage = document.querySelector('.form-text');

function validateInputChange(input) {
    if (input.value.trim() !== '') {
        input.classList.add('valid');
        input.classList.remove('invalid');
        input.nextElementSibling.classList.remove('error');
    } else {
        input.classList.remove('valid');
    }
}

function validateFormChange(input) {
    if (input.value.trim() === '') {
        input.classList.add('invalid');
        input.nextElementSibling.classList.add('error');
        return;
    }
}

function validateFormSubmit() {

    let inputValidate = Array.from(inputField).every(input => input.classList.contains('valid'));
    let inputMessageValidate = inputMessage.classList.contains('valid')

    if (inputValidate && inputMessageValidate) {
        form.classList.add('hide');
        formSend.classList.remove('hide');
    }
}

inputField.forEach((input) => {
    input.addEventListener('change', () => {
        validateInputChange(input);
    })
})

inputMessage.addEventListener('change', () => {
    validateInputChange(inputMessage);
})

form.addEventListener('submit', (e) => {
    e.preventDefault();
    inputField.forEach((input) => {
        validateFormChange(input);
    })

    validateFormChange(inputMessage);
    validateFormSubmit();
})