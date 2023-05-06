function initLoginPage() {
  fadeInAnimation();
  changeLogoColor();
}

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
