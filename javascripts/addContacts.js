let letters = [];
let contactsByLetter = [];
let remoteContactsAsJSON;

/**
 * Initializes the contact list by fetching remote contacts, sorting them by first letter, and rendering the list on the page.
 * @returns {Promise}
 */
async function initContactList() {
  let res = await getItem("contactsRemote");
  remoteContactsAsJSON = await JSON.parse(res.data.value.replace(/'/g, '"'));
  letters = [];
  contactsByLetter = [];
  document.getElementById("contactList").innerHTML = "";
  for (let i = 0; i < remoteContactsAsJSON.length; i++) {
    const contact = remoteContactsAsJSON[i];
    let name = contact.name;
    let firstLetter = name.charAt(0);
    if (!letters.includes(firstLetter)) {
      letters.push(firstLetter);
    }
    if (!contactsByLetter[firstLetter]) {
      contactsByLetter[firstLetter] = [];
    }
    contactsByLetter[firstLetter].push(contact);
  }
  renderContactList();
}

/**
 * Renders the contact list on the page.
 */
function renderContactList() {
  for (let i = 0; i < letters.length; i++) {
    let letter = letters[i];
    let contactsWithLetter = contactsByLetter[letter];
    document.getElementById(
      "contactList"
    ).innerHTML += `<div id="${letter}" ><h3 class="letterHeader" >${letter}</h3></div>`;
    renderContactsByLetter(i, letter, contactsWithLetter);
  }
}

/**
 * Renders the contacts underneath the letters inside the contactlist.
 */
function renderContactsByLetter(i, letter, contactsWithLetter) {
  for (let j = 0; j < contactsWithLetter.length; j++) {
    let contact = contactsWithLetter[j];
    let name = contact.name;
    let initials = getInitials(name);
    let email = contact.email;
    let color = contact.color;
    document.getElementById(`${letter}`).innerHTML += addContactsHTML(
      i,
      j,
      color,
      initials,
      name,
      email
    );
  }
}

/**
 * Adds HTML for a contact.
 * @param {number} i - The index of the letter.
 * @param {number} j - The index of the contact with the matching first letter.
 * @param {string} color - The color of the contact.
 * @param {string} initials - The initials of the contact.
 * @param {string} name - The name of the contact.
 * @param {string} email - The email of the contact.
 * @returns {string} The generated HTML for the contact.
 */
function addContactsHTML(i, j, color, initials, name, email) {
  return `
    <div id='singleContact${i}-${j}' class="singleContact" onclick="selectContact(${i},${j})">
      <div style="background-color:${color}" class="singleContactInitials"> ${initials}</div>
      <div class="singleContactName">
      <h3>${name}</h3>
      <p>${email}</p>
      </div>
    </div>
    `;
}

/**
 * Selects a contact and displays further information in a container next to it.
 * @param {number} i - The index of the letter.
 * @param {number} j - The index of the contact with the matching first letter.
 */
function selectContact(i, j) {
  let elem = document.querySelectorAll(".singleContact");
  for (let k = 0; k < elem.length; k++) {
    elem[k].classList.remove("selectedContact");
  }
  document
    .getElementById(`singleContact${i}-${j}`)
    .classList.add("selectedContact");
  changeMobileView();
  document.getElementById("contactsMid").innerHTML = renderSelectContactHTML(
    i,
    j
  );
}

/**
 * Renders the selected contact information.
 * @param {number} i - The index of the letter.
 * @param {number} j - The index of the contact with the matching first letter.
 * @returns {string} The generated HTML for the selected contact.
 */
function renderSelectContactHTML(i, j) {
  let contact = contactsByLetter[letters[i]][j];
  let name = contact.name;
  let email = contact.email;
  let phone = contact.phone;
  let initials = getInitials(name);
  return `
  <img id="arrowBack" onclick="exitContact()" class="arrowBack hideArrow" src="assets/icons/arrow-left-black.png">
  <div class="contact-name">
    <div id="emptyInitial">
      <div  style="background-color:${contact.color}" class="contact-initials">
        ${initials}
      </div>
    </div>
    <div>
      <h1 id="emptyName" >${name}</h1>
      <div class="contacts-add-task">
        <img src="assets/icons/plus.small.png" /> &nbsp; Add Task
      </div>
    </div>
  </div>
  <div class="contact-info">
    <div class="contact-info-edit">
      <p>Contact Information</p>
      <div class="edit-contact">
        <img src="assets/icons/pencil.small.png" />
        <p onclick="openEditContact(${i}, ${j})">&nbsp; Edit Contact</p>
      </div>
    </div>
    <h3>Email</h3>
    <p id="emptyEmail" >${email}</p>
    <h3>Phone</h3>
    <p id="emptyPhone" >${phone}</p>
  </div>`;
}

/**
 * Adds a new contact to the contacts array.
 * @returns {Promise}
 */
async function addContact() {
  let name = document.getElementById("newContactName");
  let email = document.getElementById("newContactEmail");
  let phone = document.getElementById("newContactPhone");
  let randomNumber = Math.floor(Math.random() * nameColor.length);

  let newContact = {
    name: name.value.charAt(0).toUpperCase() + name.value.slice(1),
    email: email.value,
    phone: phone.value,
    color: nameColor[randomNumber],
  };
  remoteContactsAsJSON.push(newContact);
  await setItem("contactsRemote", remoteContactsAsJSON);

  name.value = "";
  email.value = "";
  phone.value = "";
  contactPopup("new");
  closeNewContact();
  initContactList();
}

/**
 * Opens the new contact overlay.
 */
function openNewContact() {
  document.getElementById(`addContactsOverlay`).classList.remove("d-none");
}

/**
 * Closes the new contact overlay.
 */
function closeNewContact() {
  document.getElementById(`addContactsOverlay`).classList.add("d-none");
}

/**
 * Opens the edit contact overlay.
 * @param {number} i - The index of the letter.
 * @param {number} j - The index of the contact with the matching first letter.
 */
function openEditContact(i, j) {
  document.getElementById(`editContactsOverlay`).classList.remove("d-none");
  document.getElementById("editContactsOverlay").innerHTML = createEditHTML(
    i,
    j
  );
  let editName = document.getElementById("editName");
  let editMail = document.getElementById("editMail");
  let editPhone = document.getElementById("editPhone");
  let contact = contactsByLetter[letters[i]][j];
  let initials = getInitials(contact.name);
  editName.value = contact.name;
  editMail.value = contact.email;
  editPhone.value = contact.phone;
  document.getElementById("editImage").innerHTML = `
    <div style="background-color:${contact.color}" class="contactImage editInitials">
      ${initials}
    </div>`;
}

/**
 * Creates the HTML for the edit contact overlay.
 * @param {number} i - The index of the letter.
 * @param {number} j - The index of the contact with the matching first letter.
 * @returns {string} The generated HTML for the edit contact overlay.
 */
function createEditHTML(i, j) {
  return /*html*/ ` <div class="addContact">
  <div class="addContactLeft">
    <img src="assets/icons/logo-white-blue.png" />
    <h1>Edit contact</h1>
    <p>Tasks are better with a team</p>
    <div class="blueLine"></div>
  </div>
  
  <div class="addContactRight editContactRight">
    <div onclick="closeEditContact()" class="x-mark">
      x
    </div>
    <form class="editForm" onsubmit="event.preventDefault(), saveContact(${i}, ${j}), contactPopup('edit') ">
      <div class="createContactContainer">
        <div id="editImage">
          <img class="contactImage" src="assets/icons/add_contact.png" />
        </div>
        <div class="contactInputContainer">
          <input
          required
            id="editName"
            class="addContactInput contactName"
            placeholder="Name"
            type="name" 
          />
          <input
          required
            id="editMail"
            class="addContactInput contactEmail"
            placeholder="Email"
            type="email" 
          />
          <input
          required
            id="editPhone"
            class="addContactInput contactPhone"
            placeholder="Phone"
            type="number" 
          />
        </div>
      </div>
        <div class="addContactBtn">
          <button type="button" onclick="deleteContact(${i}, ${j}), exitContact()" class="cancel-btn">Delete</button>
          <button type="submit" class="create-contact-btn">
            Save
          </button>
        </div>
      </div>
    </form>
  </div>`;
}

/**
 * Closes the edit contact overlay.
 */
function closeEditContact() {
  document.getElementById(`editContactsOverlay`).classList.add("d-none");
}

/**
 * Saves the changes made to a contact.
 * @param {number} i - The index of the letter.
 * @param {number} j - The index of the contact with the matching first letter.
 * @returns {Promise}
 */
async function saveContact(i, j) {
  let editName = document.getElementById("editName").value;
  let editMail = document.getElementById("editMail").value;
  let editPhone = document.getElementById("editPhone").value;
  let contact = contactsByLetter[letters[i]][j];
  contact.name = editName;
  contact.email = editMail;
  contact.phone = editPhone;

  remoteContactsAsJSON.name = contact.name;
  remoteContactsAsJSON.email = contact.email;
  remoteContactsAsJSON.phone = contact.phone;
  await setItem("contactsRemote", remoteContactsAsJSON);

  document.getElementById("contactsMid").innerHTML = "";

  initContactList();
  closeEditContact();
}

/**
 * Deletes a contact.
 * @param {number} i - The index of the letter.
 * @param {number} j - The index of the contact with the matching first letter.
 * @returns {Promise}
 */
async function deleteContact(i, j) {
  let editName = document.getElementById("editName");
  let editMail = document.getElementById("editMail");
  let editPhone = document.getElementById("editPhone");
  let contact = contactsByLetter[letters[i]][j];
  let contactIndex = remoteContactsAsJSON.indexOf(contact);
  contactsByLetter[letters[i]].splice(j, 1);
  remoteContactsAsJSON.splice(contactIndex, 1);
  await setItem("contactsRemote", remoteContactsAsJSON);

  emptyEdit(editName, editMail, editPhone);
  initContactList();
  closeEditContact();
}

/**
 * Resets the edit values.
 * @param {HTMLInputElement} editName - The input field for editing the name.
 * @param {HTMLInputElement} editMail - The input field for editing the email.
 * @param {HTMLInputElement} editPhone - The input field for editing the phone number.
 */
function emptyEdit(editName, editMail, editPhone) {
  editName.value = "";
  editMail.value = "";
  editPhone.value = "";
  document.getElementById("contactsMid").innerHTML = "";
}

/**
 * Changes the view on mobile when a contact is selected.
 */
function changeMobileView() {
  document.getElementById("newContactBtn").classList.add("hideMobile");
  document.getElementById("contactsRight").classList.add("contactInfoMobile");
  document.getElementById("contactList").classList.add("hideMobile");
}

/**
 * Exits the selected contact view.
 */
function exitContact() {
  document
    .getElementById("contactsRight")
    .classList.remove("contactInfoMobile");
  document.getElementById("contactList").classList.remove("hideMobile");
  document.getElementById("newContactBtn").classList.remove("hideMobile");
  document.getElementById("arrowBack").classList.add("hideMobile");
}

/**
 * Displays a popup message for a successful contact creation/edit.
 * @param {string} change - The type of change (either "new" or "edit").
 */
function contactPopup(change) {
  let success = document.getElementById("changedContact");

  success.style.display = "block";
  if (change == "new") {
    success.innerHTML = "Contact successfully created";
  } else {
    success.innerHTML = "Contact successfully edited";
  }
  setTimeout(function () {
    success.style.display = "none";
  }, 2000);
}
