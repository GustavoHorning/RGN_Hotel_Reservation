const form = document.getElementById("form");
const username = document.getElementById("username");
const email = document.getElementById("email");
const telephone = document.getElementById("telephone");
const checkin = document.getElementById("checkin");
const checkout = document.getElementById("checkout");
const adults = document.getElementById("adults");

form.addEventListener("submit", (event) => {
    event.preventDefault();

    checkForm();
});

function checkInputUsername() {
    const usernameValue = username.value;

    if (usernameValue === "") {
        errorInput(username, "Preencha um nome!");
    } else {
        clearError(username);
    }
}

function checkInputEmail() {
    const emailValue = email.value;

    if (emailValue === "") {
        errorInput(email, "O e-mail é obrigatório.");
    } else {
        clearError(email);
    }
}

function checkInputTelephone() {
    const telephoneValue = telephone.value;
    const telefoneRegex = /^\(\d{2}\) 9\d{4}-\d{4}$/;

    if (telephoneValue === "") {
        errorInput(telephone, "O telefone é obrigatório.");
    } else if (!telefoneRegex.test(telephoneValue)) {
        errorInput(telephone, "Insira um telefone válido no formato (99) 99999-9999.");
    } else {
        clearError(telephone);
    }
}

function checkInputDate() {
    const checkinValue = checkin.value;
    const checkoutValue = checkout.value;

    if (checkinValue === "" || checkoutValue === "") {
        errorInput(checkin, "Preencha as datas de check-in e check-out.");
        errorInput(checkout, "");
    } else if (new Date(checkoutValue) <= new Date(checkinValue)) {
        errorInput(checkout, "A data de check-out deve ser posterior à data de check-in.");
        errorInput(checkin, "");
    } else {
        clearError(checkin);
        clearError(checkout);
    }
}

function checkInputAdults() {
    const adultsValue = adults.value;

    if (adultsValue < 1) {
        errorInput(adults, "Pelo menos 1 adulto é obrigatório.");
    } else {
        clearError(adults);
    }
}

function checkForm() {
    checkInputUsername();
    checkInputEmail();
    checkInputTelephone();
    checkInputDate();
    checkInputAdults();

    const formItems = form.querySelectorAll(".form-content.error");
    const isValid = formItems.length === 0;

    console.log(isValid);
}

function errorInput(input, message) {
    const formItem = input.parentElement;
    let textMessage = formItem.querySelector("a.error-message");

    if (!textMessage) {
        textMessage = document.createElement("a");
        textMessage.classList.add("error-message");
        formItem.appendChild(textMessage);
    }

    if (message !== textMessage.innerText) {
        textMessage.innerText = message;
    }

    formItem.classList.add("error");
}




function clearError(input) {
    const formItem = input.parentElement;
    const textMessage = formItem.querySelector("a.error-message");

    if (textMessage) {
        textMessage.innerText = "";
        formItem.classList.remove("error");
    }
}
