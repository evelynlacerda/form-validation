const form = document.querySelector('#form');
const formSend = document.querySelector('#form-send');
const inputField = document.querySelectorAll('.input-form');

const inputEmail = inputField[1];
const inputPhone = inputField[2];

function validateEmail(email) {
    const emailRegex = /\S+@\S+\.\S+/;
    return emailRegex.test(email);
}

function validatePhoneNumber(phoneNumber) {
    const phoneRegex = /^\d{2}\d{5}\d{4}$/;
    return phoneRegex.test(phoneNumber);
}

function validateFormChange(input) {
    input.classList.remove('valid');
    input.classList.add('invalid');
    input.nextElementSibling.classList.add('error');
}

function validateInputChange(input) {
    if (input.value.trim() !== '') {
        input.classList.add('valid');
        input.classList.remove('invalid');
        input.nextElementSibling.classList.remove('error');

        if (input === inputEmail) {
            if (!validateEmail(inputEmail.value.trim())) {
                validateFormChange(inputEmail);
            }
        } else if (input === inputPhone) {
            if (!validatePhoneNumber(inputPhone.value.trim())) {
                validateFormChange(inputPhone);
            }
        }
    } else {
        input.classList.remove('valid');
    }
}

inputField.forEach((input) => {
    input.addEventListener('input', () => validateInputChange(input))
    input.addEventListener('focus', () => validateInputChange(input))
    input.addEventListener('blur', () => input.value.trim() === '' && validateFormChange(input))
})

form.addEventListener('submit', (e) => {
    e.preventDefault();
    inputField.forEach(input => input.value.trim() === '' && validateFormChange(input))

    let inputValidate = Array.from(inputField).every(input => input.classList.contains('valid'));

    if (inputValidate) {
        form.classList.add('hide');
        formSend.classList.remove('hide');
    }
})