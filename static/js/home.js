// Copy Mail Input Box Value
// copy mail on click
let copyBtn = document.querySelector('.mail-input-container');
copyBtn.addEventListener('click', () => {
    let mailBox = document.querySelector('#user-mail');
    let copyMsg = document.querySelector('.copy-msg');
    copyMsg.innerHTML = '<i></i> Copied!'
    setTimeout(() => {
        copyMsg.innerHTML = '<i></i> Click To Copy!'
        window.getSelection().removeAllRanges();
    }, 2500)
    mailBox.select();
    navigator.clipboard.writeText(mailBox.value);
})

// On Click Refresh button event
let refreshBtn = document.querySelector('.refresh-btn');
refreshBtn.addEventListener('click', () => {
    window.location.reload();
})

// On Click Change button event
let changeBtn = document.querySelector('.change-btn');
changeBtn.addEventListener('click', () => {
    window.location.href = '/mail/change'
})


function fetchMessages() {
    // Fetch mails
    fetch('/mail/receive')
        .then(response => response.json())
        .then(res => {
            // Do something with the API data
            data = res.data;
            // Adding Mails in object
            if (data.length == 0 || res.status == false)
                return;

            let response = ' ';
            for (i = 0; i < data.length; i++) {
                response += `
                <div class="mails">
                    <div class="mail-msg">
                        <a class="link-reset" href="/mail/receive/${data[i].id}">
                            <div class="col1">
                                ${(data[i].from.name.length > 25) ? data[i].from.name.slice(0, 20) + '...' : data[i].from.name} 
                                <br>
                                ${(data[i].from.address.length > 18) ? data[i].from.address.slice(0, 15) + '...' : data[i].from.address}
                            </div>
                            <div class="col2">
                                ${(data[i].subject.length > 30) ? data[i].subject.slice(0, 30) + '..' : data[i].subject}
                            </div>
                            <div class="col3">
                                <iconify-icon class="arrowicon" icon="material-symbols:arrow-circle-right-outline-rounded"></iconify-icon>
                            </div>
                        </a>
                    </div>
                </div>`;
            }
            // Add Mails in Mail Box
            let mailBox = document.querySelector('.emails-container');
            let emptyBox = document.querySelector('.empty-box-msg');
            emptyBox.style.display = 'none';
            mailBox.innerHTML = response;
            return;
        })
        .catch(error => {
            // Handle any errors
            // console.error(error);
        });
}
fetchMessages();

async function timer() {
    let timer = document.querySelector('.mail-input-container b')
    let i = 0;
    setInterval(() => {
        timer.innerText = i++;
        if (i == 10) {
            fetchMessages();
            i = 0;
        }
    }, 1000);
}
timer();