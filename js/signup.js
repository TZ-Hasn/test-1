let eyeOpen = document.querySelector("#form .input-box .eye-container .icon.open");
let eyeClose = document.querySelector("#form .input-box .eye-container .icon.closed");

let eyeOpenConfirm = document.querySelector("#form .input-box .eye-container.confirm .icon.open");
let eyeCloseConfirm = document.querySelector("#form .input-box .eye-container.confirm .icon.closed");

let pswd = document.querySelector("input[name=password]");
let pswdConfirm = document.querySelector("input[name='confirmPassword']");
eyeOpen.style.zIndex = "1";
eyeOpenConfirm.style.zIndex = "1";

// Adding Event listners to eye icons in password tag
eyeOpen.addEventListener("click", () => { togglePasswordView(eyeOpen, pswd); });
eyeClose.addEventListener("click", () => { togglePasswordView(eyeOpen, pswd); });
eyeOpenConfirm.addEventListener("click", () => { togglePasswordView(eyeOpenConfirm, pswdConfirm); });
eyeCloseConfirm.addEventListener("click", () => { togglePasswordView(eyeOpenConfirm, pswdConfirm); });


// Password hide unhide Toggler
// function togglePasswordView(a, b) {
//     console.log(a.style.zIndex);
//     if (a.style.zIndex == "1") {
//         a.style.zIndex = "2";
//         b.type = 'text';
//     } else {
//         b.type = 'password';
//         a.style.zIndex = "1";
//     }
// }

function togglePasswordView(a, b) {
    console.log(a.style.zIndex);
    if (a.style.zIndex == "1") {
        a.style.zIndex = "2";
        b.type = 'text';
    } else {
        b.type = 'password';
        a.style.zIndex = "1";
    }
}


// Form Input Validations
var totalValidation = 0;

// Email Validation
let email = document.querySelector('input[type=email]');
email.addEventListener("keyup", () => { ValidateEmail(email); });
function ValidateEmail(input) {
    input = email;
    console.log('validate Email Ran');
    var validRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    if (input.value.match(validRegex)) {
        document.getElementById('mail-err').classList.remove('invalid');
        document.getElementById('mail-err').classList.add('valid');
        console.log("Valid email address!");
        // document.form1.text1.focus();
        return true;
    } else {
        document.getElementById('mail-err').classList.remove('valid');
        document.getElementById('mail-err').classList.add('invalid');
        console.log("Invalid email address!");
        // document.form1.text1.focus();
        return false;
    }
    console.log('email validation ran');
}
// function validateMail(mail) {
//     console.log(email.value)
//     if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(mail)) {
//         document.getElementById('mail-err').classList.remove('invalid');
//         document.getElementById('mail-err').classList.add('valid');
//         console.log("valid mail")
//         retrn = true;
//         return true;
//     }
//     document.getElementById('mail-err').classList.remove('valid');
//     document.getElementById('mail-err').classList.add('invalid');
//     console.log("INvalid Email");
//     retrn = false;
//     return false;
// }

// Password Validation
let loginbtn = document.getElementById("loginbtn");
let letter = document.getElementById("letter");
let capital = document.getElementById("capital");
let number = document.getElementById("number");
let length = document.getElementById("length");


// When the user clicks on the password field, show the message box
pswd.onfocus = function () {
    document.querySelector("#pswd-err").style.display = "inline";
}

// When the user clicks outside of the password field, hide the message box
// myInput.onblur = function () {
// document.querySelector("#pswd-err").style.display = "none";
// }

// When the user starts to type something inside the password field
let pswdReturn = false;
// email.addEventListener("keyup", () => { ValidateEmail(email); });
pswd.addEventListener('keyup', () => { validatePassword(); });
function validatePassword() {
    let invalids = 0;
    console.log('validatePasswordRan');

    // Validate lowercase letters
    let lowerCaseLetters = /[a-z]/g;
    if (pswd.value.match(lowerCaseLetters)) {
        letter.classList.remove("invalid");
        letter.classList.add("valid");
    } else {
        if (invalids == 0) {
            letter.classList.remove("valid");
            letter.classList.add("invalid");
            ++invalids;
        } else {
            letter.classList.remove("invalid");
            letter.classList.add("valid");
        }
    }

    // Validate capital letters
    let upperCaseLetters = /[A-Z]/g;
    if (pswd.value.match(upperCaseLetters)) {
        capital.classList.remove("invalid");
        capital.classList.add("valid");
    } else {
        if (invalids == 0) {
            capital.classList.remove("valid");
            capital.classList.add("invalid");
            ++invalids;
        } else {
            capital.classList.remove("invalid");
            capital.classList.add("valid");
        }
    }

    // Validate numbers
    let numbers = /[0-9]/g;
    if (pswd.value.match(numbers)) {
        number.classList.remove("invalid");
        number.classList.add("valid");
    } else {
        if (invalids == 0) {
            number.classList.remove("valid");
            number.classList.add("invalid");
            ++invalids;
        } else {
            number.classList.remove("invalid");
            number.classList.add("valid");
        }
    }

    // Validate length
    if (pswd.value.length >= 8) {
        length.classList.remove("invalid");
        length.classList.add("valid");
    } else {
        if (invalids == 0) {
            length.classList.remove("valid");
            length.classList.add("invalid");
            ++invalids;
        } else {
            length.classList.remove("invalid");
            length.classList.add("valid");
        }
    }

    if (invalids == 0) {
        document.querySelector('#final-pswd').classList.remove('msg-wrong-pswd');
        document.querySelector("#final-pswd").classList.add('msg-correct-pswd');
        return true;
    } else {
        document.querySelector("#final-pswd").classList.remove('msg-correct-pswd');
        document.querySelector("#final-pswd").classList.add('msg-wrong-pswd');
        return false;
    }
}

// Defined At start
let cnfrmPswdReturn = false;
pswdConfirm.addEventListener('keyup', () => { validateConfirm(email); });
function validateConfirm() {
    console.log('Validate Confirm Password ran');
    let confirmMsg = document.querySelector('#err-confirm');
    console.log('confirm mesg')
    if (pswdConfirm.value == pswd.value) {
        confirmMsg.classList.remove('invalid')
        confirmMsg.classList.add('valid')
        return true;
    } else {
        confirmMsg.classList.remove('valid')
        confirmMsg.classList.add('invalid')
        return false;
    }
}

// Input masking
$(document).ready(function () {
    $("#cnic").inputmask({ "mask": "99999-9999999-9", "placeholder": "_____-_______-_", "clearMaskOnLostFocus": false });
    $("#phone2").inputmask({ "mask": "9999-9999999", "placeholder": "____-_______", "clearMaskOnLostFocus": false });
});

let submitBtn = document.getElementById('register');
submitBtn.addEventListener('click', () => { validateForm(); });
function validateForm() {
    console.log("Validating complete form")
    if (validateConfirm() && ValidateEmail() && validatePassword() && validateCnic() && validatePhone()) {
        submitBtn.type = 'submit';
        console.log("true c");
    } else {
        submitBtn.type = 'button';
        console.log("false c");
    }
}

// CNIC Validation
function validateCnic() {
    let cnic = document.getElementById('cnic').value.replaceAll('_','');
    if (cnic.length == 15) {
        return true;
    } else {
        return false;
    }
}

// Phone Number Validation
function validatePhone() {
    let phone = document.getElementById('phone2').value.replaceAll('_','');
    if (phone.length == 12) {
        return true;
    } else {
        return false;
    }
}
