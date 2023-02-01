let eyeOpen = document.querySelector("#form .input-box .eye-container .icon.open");
let eyeClose = document.querySelector("#form .input-box .eye-container .icon.closed");
let pswd = document.querySelector("#password");
eyeOpen.style.zIndex = "1";

// Adding Event listners to eye icons in password tag
eyeOpen.addEventListener("click", () => { togglePasswordView(); });
eyeClose.addEventListener("click", () => { togglePasswordView(); });

// Password hide unhide Toggler
function togglePasswordView() {
    console.log(eyeOpen.style.zIndex);
    if (eyeOpen.style.zIndex == "1") {
        eyeOpen.style.zIndex = "2";
        pswd.type = 'text';
    } else {
        pswd.type = 'password';
        eyeOpen.style.zIndex = "1";
    }
}

//password validation


let password=document.getElementById('password');

let minimumLentgh=document.getElementById('minLength');

let lowerCase=document.getElementById('lowerC');

let upperCase=document.getElementById('upperC');

let digits=document.getElementById('digit');

let specialCharcter=document.getElementById('special_symbols');

function checkPassword(data){

    const minLength= new RegExp('(?=.{8,})');
    const lowerC= new RegExp('(?=.*[a-z])');
    const upperC= new RegExp('(?=.*[A-Z])');
    const digit= new RegExp('(?=.*[0-9])');
    const special_symbols= new RegExp('(?=.*[!@#\$%\^&\*])');
    
    if (minLength.test(data)){
        minimumLentgh.classList.add('valid');
    }
    else{
        minimumLentgh.classList.remove('valid');
    }
    
    if (lowerC.test(data)){
        lowerCase.classList.add('valid');
    }
    else{
        lowerCase.classList.remove('valid');
    }
    
    if (upperC.test(data)){
        upperCase.classList.add('valid');
    }
    else{
        upperCase.classList.remove('valid');
    }
    
    if (digit.test(data)){
        digits.classList.add('valid');
    }
    else{
        digits.classList.remove('valid');
    }
    
    if (special_symbols.test(data)){
        specialCharcter.classList.add('valid');
    }
    else{
        specialCharcter.classList.remove('valid');
    }

}

