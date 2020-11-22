const form = document.getElementById('form');
const username = document.getElementById('username');
const email = document.getElementById('email');
const password = document.getElementById('password');
const password2 = document.getElementById('password2');

//Functions 
function showError(input, message) {
    // Adding class to show red border
    input.parentElement.className = 'formlabel invalid';
    // Adding querySelector to add our error message
    input.parentElement.querySelector('span').innerText = message;
}

function showSuccess(input) {
    // Adding class to show green border
    input.parentElement.className = 'formlabel valid';
}

// To conver error first alphabet capital
function errorMessageName(input) {
    return input.id.charAt(0).toUpperCase() + input.id.slice(1);
}

function checkRequiredField(inputArr) {
    // Loop though every array values
    inputArr.forEach(function(input) {
        if (input.value.trim() === '') {
            showError(input, `${errorMessageName(input)} is required`);
        } else {
            showSuccess(input);
        }
    });
}

function checkEmail(input) {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (re.test(input.value.trim())) {
        showSuccess(input);
    } else {
        showError(input, 'Please enter a valid email');
    }
}

function checkLength(input, min, max) {
    if (input.value.length < min) {
        showError(input, `${errorMessageName(input)} must be at least ${min} characters`);
    } else if (input.value.length > max) {
        showError(input, `${errorMessageName(input)} must be less than ${max} characters`);
    } else {
        showSuccess(input);
    }
}

function checkPasswordMatches(input1, input2) {
    if (input1.value !== input2.value) {
        showError(input2, 'Password do not matches');
    }
}

// Event listener
form.addEventListener('submit', function(e) {
    e.preventDefault();
    checkRequiredField([username, email, password, password2]);
    checkEmail(email);
    checkLength(username, 3, 15);
    checkLength(password, 8, 20);
    checkPasswordMatches(password, password2);
});
