/**

    Initializes the login page by executing fadeInAnimation and changeLogoColor functions.
    @function
    @name initLoginPage
    */
function initLoginPage() {
  fadeInAnimation();
  changeLogoColor();
}

/**

    Executes the fade-in animation on the login and sign-up containers, and changes the logo image after a timeout.
    @function
    @name fadeInAnimation
    */
function fadeInAnimation() {
  const animationLayer = document.querySelector('.animation-layer');
  const logo = document.querySelector(".logo-big");
  setTimeout(() => {
    document.querySelector(".login-container").style.opacity = "1";
    document.querySelector(".sign-up-container").style.opacity = "1";
  }, 1900);
  setTimeout(function() {
    animationLayer.style.display = 'none';
    logo.src = "assets/icons/logo-black.png";
  }, 1000);
}


/**

    Changes the color of the logo and the background color of the animation layer based on the window width.
    @function
    @name changeLogoColor
    */
function changeLogoColor() {
  if (window.innerWidth < 800) {
    const logo = document.querySelector(".logo-big");
    logo.src = "assets/icons/logo-white-blue.png";
    document.querySelector('.animation-layer').style.backgroundColor = '#2A3647';
  } else {
    document.querySelector('.animation-layer').style.backgroundColor = 'white';
  }
}

function changeArrowColor() {
  if (window.innerWidth < 800) {
    const arrow = document.getElementById("blueArrowLeft");
    arrow.src = "assets/icons/arrow-left-black.png";
  }
}
