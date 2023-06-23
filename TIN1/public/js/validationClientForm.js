function validateForm() {
    const nameInput = document.getElementById('name');
    const congomenInput = document.getElementById('congomen');
    const companyInput = document.getElementById('company');

    const errorname = document.getElementById('errorname');
    const errorcongomen = document.getElementById('errorcongomen');
    const errorcompany = document.getElementById('errorcompany');
    const errorsSummary = document.getElementById('errorSummary');

    resetErrors([nameInput, congomenInput, companyInput],[errorname, errorcongomen, errorcompany],errorsSummary);
    
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

    if(!checkRequired(congomenInput.value)) {
        valid = false;
        congomenInput.classList.add("error-input");
        errorcongomen.innerText = "Pole jest wymagane";
    } else if (!checkTextLenghtRange(congomenInput.value, 2, 60)) {
        valid = false;
        congomenInput.classList.add("error-input");
        errorcongomen.innerText = "Pole powinno zawierać od 2 do 60 znaków";
    }

    if(!checkRequired(companyInput.value)) {
        valid = false;
        companyInput.classList.add("error-input");
        errorcompany.innerText = "Pole jest wymagane";
    } else if (!checkTextLenghtRange(companyInput.value, 1, 60)) {
        valid = false;
        companyInput.classList.add("error-input");
        errorcompany.innerText = "Pole powinno zawierać od 1 do 60 znaków";
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