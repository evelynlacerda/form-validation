const form = document.querySelector('#form');
const formSend = document.querySelector('#form-send');
const inputField = document.querySelectorAll('.form-field');
const inputMessage = document.querySelector('.form-text');

// ------------------------------------------------------

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

function showValidateInput(input) {
    input.classList.remove('valid');
    input.classList.add('invalid');
    input.nextElementSibling.classList.add('error');
}

// ------------------------------------------------------

function validateInputChange(input) {
    
    if (input.value.trim() !== '') {
        input.classList.add('valid');
        input.classList.remove('invalid');
        input.nextElementSibling.classList.remove('error');
        
        if (input === inputEmail) {
            if (!validateEmail(inputEmail.value.trim())) {
                showValidateInput(inputEmail);
            }
        } else if (input === inputPhone) {
            if (!validatePhoneNumber(inputPhone.value.trim())) {
                showValidateInput(inputPhone);
            }
        }

    } else {
        input.classList.remove('valid');
    }
}

function validateFormChange(input) {
    if (input.value.trim() === '') {
        input.classList.add('invalid');
        input.nextElementSibling.classList.add('error');
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

// ------------------------------------------------------

function validateOnEvent(input) {
    input.addEventListener('input', () => {
        validateInputChange(input);
    })

    input.addEventListener('focus', () => {
        validateInputChange(input);
    })

    input.addEventListener('blur', () => {
        validateFormChange(input);
    })
}

inputField.forEach((input) => {
    validateOnEvent(input)
})

validateOnEvent(inputMessage);

form.addEventListener('submit', (e) => {
    e.preventDefault();
    inputField.forEach((input) => {
        validateFormChange(input);
    })

    validateFormChange(inputMessage);
    validateFormSubmit();
})