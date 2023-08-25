let remoteUserssAsJSON;
let newUser;

/**
 * Registers a new user by retrieving remote users data, adding a new user to the array, and redirecting to the login page.
 * @returns {Promise} A Promise that resolves when the registration is completed.
 */
async function register() {
  let res = await getItem("usersRemote");
  remoteUserssAsJSON = await JSON.parse(res.data.value.replace(/'/g, '"'));
  let signupName = document.getElementById("signupName");
  let signupEmail = document.getElementById("signupEmail");
  let signupPassword = document.getElementById("signupPassword");
  newUser = {
    name: signupName.value,
    email: signupEmail.value,
    password: signupPassword.value,
  };

  remoteUserssAsJSON.push(newUser);
  await setItem("usersRemote", remoteUserssAsJSON);

  signupName.value = "";
  signupEmail.value = "";
  signupPassword.value = "";

  window.location.href = "login.html";
}
