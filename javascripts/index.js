/**
 * Initializes the login page by executing fadeInAnimation and changeLogoColor functions.
 */
function initLoginPage() {
  fadeInAnimation();
  changeLogoColor();
}

/**
 * Initializes the guest JOIN functionality by setting item values and redirecting to the summary page.
 * @returns {Promise} A Promise that resolves when the guest JOIN is initialized.
 */
async function initGuestJOIN() {
  await setItem("currentUserName", { name: "Dear Guest" });
  await setItem("tasksRemote", tasks);
  window.location.href = "summary.html";
}

/**
 * Executes the fade-in animation on the login and sign-up containers and changes the logo image after a timeout.
 */
function fadeInAnimation() {
  const logo = document.querySelector(".logo-big");
  setTimeout(function () {
    logo.src = "assets/icons/logo-black.png";
    window.location.href = "login.html";
  }, 1500);
}

/**
 * Changes the color of the logo and the background color of the animation layer based on the window width.
 */
function changeLogoColor() {
  if (window.innerWidth < 800) {
    const logo = document.querySelector(".logo-big");
    logo.src = "assets/icons/logo-white-blue.png";
    document.querySelector(".logo-layer").style.backgroundColor = "#2A3647";
  } else {
    document.querySelector(".animation-layer").style.backgroundColor = "white";
  }
}

/**
 * Changes the arrow left color based on the window width.
 */
function changeArrowColor() {
  const arrow = document.getElementById("blueArrowLeft");

  if (window.innerWidth < 800) {
    arrow.src = "assets/icons/arrow-left-black.png";
  } else {
    arrow.src = "assets/icons/arrow-Left.png";
  }
}
if (window.location.href.includes("sign_up.html")) {
  window.addEventListener("resize", changeArrowColor);
}

/**
 * Toggles the logout popup window.
 */
function toggleLogout() {
  document.getElementById("logout").classList.toggle("d-none");
  document.getElementById("logoutLayer").classList.toggle("d-none");
}

/**
 * Redirects to the login page.
 */
function backToLogin() {
  window.location.href = "login.html";
  isActive = true;
  sessionStorage.setItem("isActive", JSON.stringify(isActive));
}

/**
 * Highlights the selected menu item based on the provided menu ID.
 * @param {string} menu - The ID of the selected menu item.
 */
function selectedMenu(menu) {
  let elem = document.querySelectorAll(".menuText");
  let selected = document.getElementById(`${menu}`);
  if (menu != "help") {
    for (let k = 0; k < elem.length; k++) {
      elem[k].classList.remove("selectedMenu");
    }
    selected.classList.add("selectedMenu");
  }
}

/**
 * Checks the entered password for login authentication and redirects to the summary page if valid.
 * @returns {Promise} A Promise that resolves when the password check is completed.
 */
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
  for (let i = 0; i < remoteUsersAsJSON.length; i++) {
    const obj = remoteUsersAsJSON[i];
    if (
      obj.email === enteredLoginEmailValue &&
      obj.password === enteredLoginPasswordValue
    ) {
      window.location.href = "summary.html";
      break;
    } else {
      enteredLoginPassword.value = "";
      enteredLoginEmail.value = "";
    }
  }
}
