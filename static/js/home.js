// Copy Mail Input Box Value
let copyBtn = document.querySelector('#copyBtn');
copyBtn.addEventListener('click', () => {
    let mailBox = document.querySelector('#f-input');
    navigator.clipboard.writeText(mailBox.value);
})
// Copy Mail Input Box Value
let mailInput = document.querySelector('#f-input');
mailInput.addEventListener('click', () => {
    let mailBox = document.querySelector('#f-input');
    navigator.clipboard.writeText(mailBox.value);
})
