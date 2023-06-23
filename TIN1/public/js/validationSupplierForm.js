function validateForm() {
    const nameInput = document.getElementById('name');
    const emailInput = document.getElementById('email');

    const errorname = document.getElementById('errorname');
    const erroremail = document.getElementById('erroremail');
    const errorsSummary = document.getElementById('errorSummary');

    resetErrors([nameInput, emailInput],[errorname, erroremail],errorsSummary);
    
    let valid = true;

    if(!checkRequired(nameInput.value)) {
        valid = false;
        nameInput.classList.add("error-input");
        errorname.innerText = "Pole jest wymagane";
    } else if (!checkTextLenghtRange(nameInput.value, 2, 60)) {
        valid = false;
        nameInput.classList.add("error-input");
        errorname.innerText = "Pole powinno zawierać od 2 do 60 znaków";
    }

    if(!checkRequired(emailInput.value)) {
        valid = false;
        emailInput.classList.add("error-input");
        erroremail.innerText = "Pole jest wymagane";
    } else if (!checkTextLenghtRange(emailInput.value, 5, 60)) {
        valid = false;
        emailInput.classList.add("error-input");
        erroremail.innerText = "Pole powinno zawierać od 5 do 60 znaków";
    } else if (!checkemail(emailInput.value)) {
        valid = false;
        emailInput.classList.add("error-input");
        erroremail.innerText = "Pole powinno prawidłowy adres email";
    }

    if(!valid) {
        errorsSummary.innerText = "Formularz zawiera błędy";
    }

    return valid;
}

function resetErrors(inputs, errorTexts, errorInfo) {
    for (let index = 0; index < inputs.length; index++) {
        inputs[index].classList.remove("error-input");
    }
    for (let index = 0; index < errorTexts.length; index++) {
        errorTexts[index].innerText = "";
    }
    errorInfo.innerText = "";
}

function checkRequired(value) {
    if (!value) {
        return false;
    }
    value = value.toString().trim();
    if (value === "") {
        return false;
    }
    return true;
}

function checkTextLenghtRange(value, min, max) {
    if (!value) {
        return false;
    }
    value = value.toString().trim();
    const length = value.length;
    if (max && length > max) {
        return false;
    }
    if (min && length < min) {
        return false;
    }
    return true;
}

function checkemail(value) {
    if (!value) {
        return false;
    }
    value = value.toString().trim();
    const re = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
    return re.test(value);
}