function updateLogo() {
    const logo = document.querySelector('header .logo img');
    const mobileLogoUrl = './img/free fire.png'; // Make sure to add this image to your img folder
    const desktopLogoUrl = './img/ff.png';

    if (window.innerWidth <= 768) { // Standard mobile breakpoint
        logo.src = mobileLogoUrl;
    } else {
        logo.src = desktopLogoUrl;
    }
}

// Run on page load
window.addEventListener('load', updateLogo);

// Run when window is resized
window.addEventListener('resize', updateLogo);