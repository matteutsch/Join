/* let currentUserName = 'Dear dear Guest';
 */
/**
    Initializes the login page by executing fadeInAnimation and changeLogoColor functions.
    @function
    @name initLoginPage
    */
function initLoginPage() {
  fadeInAnimation();
  changeLogoColor();
}

async function initGuestJOIN() {
  await setItem("currentUserName", { name: "Dear Guest" });

  await setItem("tasksRemote", tasks);
  /* tasksAsJSON = await getRemoteData("tasksRemote"); */

  window.location.href = "summary.html";
}

/**
    Executes the fade-in animation on the login and sign-up containers, and changes the logo image after a timeout.
    @function
    @name fadeInAnimation
    */
function fadeInAnimation() {
  const animationLayer = document.querySelector(".animation-layer");
  const logo = document.querySelector(".logo-big");
  setTimeout(() => {
    document.querySelector(".login-container").style.opacity = "1";
    document.querySelector(".sign-up-container").style.opacity = "1";
  }, 1900);
  setTimeout(function () {
    animationLayer.style.display = "none";
    logo.src = "assets/icons/logo-black.png";
  }, 1500);
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
    document.querySelector(".animation-layer").style.backgroundColor =
      "#2A3647";
  } else {
    document.querySelector(".animation-layer").style.backgroundColor = "white";
  }
}

/**
 *
 * Changes the arrow left color based on the window width
 * @function
 * @name changeArrowColor
 */
function changeArrowColor() {
  const arrow = document.getElementById("blueArrowLeft");

  if (window.innerWidth < 800) {
    arrow.src = "assets/icons/arrow-left-black.png";
  } else {
    arrow.src = "assets/icons/arrow-left.png";
  }
}

if (window.location.href.includes("sign_up.html")) {
  window.addEventListener("resize", changeArrowColor);
}

function showLogout() {
  document.getElementById("logout").classList.toggle("d-none");
  document.getElementById("logoutLayer").classList.remove("d-none");
}

function hideLogout() {
  document.getElementById("logout").classList.add("d-none");
  document.getElementById("logoutLayer").classList.add("d-none");
}

async function checkPassword() {
  let enteredLoginPassword = document.getElementById("enteredLoginPassword");
  let enteredLoginPasswordValue = enteredLoginPassword.value;

  let enteredLoginEmail = document.getElementById("enteredLoginEmail");
  let enteredLoginEmailValue = enteredLoginEmail.value;

  let res = await getItem("usersRemote");
  remoteUsersAsJSON = await JSON.parse(res.data.value.replace(/'/g, '"'));

  let currentUser = remoteUsersAsJSON.filter(
    (user) => user.email == enteredLoginEmailValue
  );
  if (currentUser.length == 0) {
  } else {
    await setItem("currentUserName", { name: currentUser[0].name });
  }
  // Checks wether entered Login-Mail and Password are in Remote-user-array
  for (let i = 0; i < remoteUsersAsJSON.length; i++) {
    const obj = remoteUsersAsJSON[i];
    if (
      obj.email === enteredLoginEmailValue &&
      obj.password === enteredLoginPasswordValue
    ) {
      window.location.href = "summary.html";
      break;
    } else {
      enteredLoginPasswordValue = "";
      enteredLoginEmailValue = "";
      console.log("email and password do not match");
    }
  }
}