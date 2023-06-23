function validateForm() {
    const supplier_idInput = document.getElementById('supplier_id');
    const client_idInput = document.getElementById('client_id');
    const order_dateInput = document.getElementById('order_date');
    const delivery_dateInput = document.getElementById('delivery_date');

    const errorsupplier_id = document.getElementById('errorsupplier_id');
    const errorclient_id = document.getElementById('errorclient_id');
    const errororder_date = document.getElementById('errororder_date');
    const errordelivery_date = document.getElementById('errordelivery_date');
    const errorsSummary = document.getElementById('errorSummary');

    resetErrors([supplier_idInput, client_idInput, order_dateInput, delivery_dateInput],[errorsupplier_id, errorclient_id, errororder_date, errordelivery_date],errorsSummary);
    
    let valid = true;
    let nowDate = new Date(),
    month = '' + (nowDate.getMonth() + 1),
    day = '' + nowDate.getDate(),
    year = '' + nowDate.getFullYear();

    if(month.length < 2)
        month = '0' + month;
    if(day.length < 2)
        day = '0' + day;
    const nowString = [year, month, day].join('-');

    if(!checkRequired(supplier_idInput.value)) {
        valid = false;
        supplier_idInput.classList.add("error-input");
        errorsupplier_id.innerText = "Pole jest wymagane";
    }

    if(!checkRequired(client_idInput.value)) {
        valid = false;
        client_idInput.classList.add("error-input");
        errorclient_id.innerText = "Pole jest wymagane";
    }

    if(!checkRequired(order_dateInput.value)) {
        valid = false;
        order_dateInput.classList.add("error-input");
        errororder_date.innerText = "Pole jest wymagane";
    } else if (!checkDate(order_dateInput.value)) {
        valid = false;
        order_dateInput.classList.add("error-input");
        errororder_date.innerText = "Pole powinno zawierać date w formacie dd-MM-yyyy";
    } else if (!checkDateIfAfter(order_dateInput.value , nowString)) {
        valid = false;
        order_dateInput.classList.add("error-input");
        errororder_date.innerText = "Data nie może być z przyszłości";
    } 
    if(delivery_dateInput.value){
        if (!checkDateIfAfter(delivery_dateInput.value , nowString)) {
            valid = false;
            delivery_dateInput.classList.add("error-input");
            errordelivery_date.innerText = "Data nie może być z przyszłości";
        }
        else if(!checkDateIfAfter(order_dateInput.value , delivery_dateInput.value)) {
            valid = false;
            delivery_dateInput.classList.add("error-input");
            errordelivery_date.innerText = "Data dostawy musi być po dacie zamówienia";
        }
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
    if (value === "--Wybierz Id Dostawcy--" || value === "--Wybierz Id Klienta--") {
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

function checkDate(value) {
    if (!value) {
        return false;
    }
    const pattern = /(\d{4})-(\d{2})-(\d{2})/;
    return pattern.test(value);
}

function checkDateIfAfter(value, compareTo) {
    if (!value) {
        return false;
    }
    if (!compareTo) {
        return false;
    }
    if(!checkDate(value)){
        return false;
    }
    if (!checkDate(compareTo)) {
        return false;
    }
    const valueDate = new Date(value);
    const compareDate = new Date(compareTo);
    if (valueDate.getTime() > compareDate.getTime()) {
        return false;
    }
    return true;
}