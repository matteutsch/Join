/**

    Initializes the login page by executing fadeInAnimation and changeLogoColor functions.
    @function
    @name initLoginPage
    */
function initLoginPage() {
    fadeInAnimation();
    changeLogoColor();
}

async function checkPassword() {
    let enteredLoginEmail = document.getElementById('enteredLoginEmail');
    enteredLoginEmail = enteredLoginEmail.value;
    console.log('Entered Login-Mail: ', enteredLoginEmail);
    let enteredLoginPassword = document.getElementById('enteredLoginPassword');
    enteredLoginPassword = enteredLoginPassword.value;
    console.log('Entered Login-Password: ', enteredLoginPassword);

    // Store current Login-User in local storage 
    let res2 = await getItem("contactsRemote");
    remoteContactsAsJSON = await JSON.parse(res2.data.value.replace(/'/g, '"'));
    console.log('Remote Contacts: ', remoteContactsAsJSON);

    let currentUser = remoteContactsAsJSON.filter((user) => user.email === enteredLoginEmail);
    console.log('Current User: ', currentUser);

    let currentUserName = currentUser.name;
    console.log('Current User-Name: ', currentUserName)
    setItem('currentUserName', JSON.stringify(currentUserName));

    // Check for matching passwords
    let res = await getItem("usersRemote");
    remoteUserssAsJSON = await JSON.parse(res.data.value.replace(/'/g, '"'));
    /* console.log(remoteUserssAsJSON); */

    for (let i = 0; i < remoteUserssAsJSON.length; i++) {
        const obj = remoteUserssAsJSON[i];
        if (obj.email === enteredLoginEmail.value && obj.password === enteredLoginPassword.value) {
            /* window.location.href = "summary.html"; */
            break;
        } else {
            /* window.location.href = "index.html"; */
            console.log('email and password do not match');
        }
    }
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
    setTimeout(function() {
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