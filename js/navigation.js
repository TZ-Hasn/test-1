console.log("Script Ran")
// Error Handling (Applying Default CSS)
document.getElementById('nav-container').style.transform = 'translateX(-400px)';

// Event Listener for Navigation Expand Button
document.querySelector('.hamburger-container').addEventListener('click', function () {
    console.log('Function ran')
    let navContainer = document.getElementById('nav-container');
    let hamburgerContainer = document.getElementById('hamburger-main');

    if (navContainer.style.transform == 'translateX(-400px)') {
        navContainer.style.transform = 'translateX(0px)';
        console.log("condition true");
    } else {
        navContainer.style.transform = 'translateX(-400px)';
        console.log("condition false");
    }
})
