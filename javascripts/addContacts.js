let letters = [];
let contactsByLetter = [];

function initContactList() {
  //get all the firstletters of contacts and push them into seperate array;
  //creating seperate array of contacts sorted by first letters
  letters = [];
  contactsByLetter = [];
  document.getElementById("contactList").innerHTML = "";
  for (let i = 0; i < contacts.length; i++) {
    const contact = contacts[i];
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

function renderContactList() {
  //iterating through letters array to create letters as headline
  //iterating through contactsByLetter[Letter] to render those below the matching firstLetter
  for (let i = 0; i < letters.length; i++) {
    let letter = letters[i];
    let contactsWithLetter = contactsByLetter[letter];
    document.getElementById(
      "contactList"
    ).innerHTML += `<div id="${letter}" ><h3 class="letterHeader" >${letter}</h3></div>`;

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
}

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

function selectContact(i, j) {
  //select a contact to display further information in container next to it
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

function renderSelectContactHTML(i, j) {
  let contact = contactsByLetter[letters[i]][j];
  let name = contact.name;
  let email = contact.email;
  let phone = contact.phone;
  let initials = getInitials(contacts[i]["name"]);

  return `
  <img id="arrowBack" onclick="exitContact()" class="arrowBack" src="../assets/icons/arrow-left-black.png">
  <div class="contact-name">
    <div>
      <div style="background-color:${contact.color}" class="contact-initials">
        ${initials}
      </div>
    </div>
    <div>
      <h1>${name}</h1>
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
    <p>${email}</p>
    <h3>Phone</h3>
    <p>${phone}</p>
  </div>`;
}

function addContact() {
  //adding new contact to contacts Array
  let name = document.getElementById("newContactName");
  let email = document.getElementById("newContactEmail");
  let phone = document.getElementById("newContactPhone");
  let randomNumber = Math.floor(Math.random() * nameColor.length);

  if (name.value == "" || email.value == "" || phone.value == "") {
    alert("please fill missing informations");
  } else {
    let newContact = {
      name: name.value.charAt(0).toUpperCase() + name.value.slice(1),
      email: email.value,
      phone: phone.value,
      color: nameColor[randomNumber],
    };
    contacts.push(newContact);
    name.value = "";
    email.value = "";
    phone.value = "";
    contactCreated();
    closeNewContact();
  }
  initContactList();
}

function openNewContact() {
  document.getElementById(`addContactsOverlay`).classList.remove("d-none");
}

function closeNewContact() {
  document.getElementById(`addContactsOverlay`).classList.add("d-none");
}

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
  editName.value = contact.name;
  editMail.value = contact.email;
  editPhone.value = contact.phone;
}
function createEditHTML(i, j) {
  return `<div class="addContact">
  <div class="addContactLeft">
    <img src="assets/icons/logo-white-blue.png" />
    <h1>Edit contact</h1>
    <p>Tasks are better with a team</p>
    <div class="blueLine"></div>
  </div>
  <div class="addContactRight">
    <div onclick="closeEditContact()" class="x-mark">
      x
    </div>
    <div class="createContactContainer">
      <div>
        <img class="contactImage" src="assets/icons/add_contact.png" />
      </div>
      <div>
        <input
          id="editName"
          class="addContactInput contactName"
          placeholder="Name"
        />
        <input
          id="editMail"
          class="addContactInput contactEmail"
          placeholder="Email"
        />
        <input
          id="editPhone"
          class="addContactInput contactPhone"
          placeholder="Phone"
        />
      </div>
    </div>
    <div class="addContactBtn">
      <button onclick="deleteContact(${i}, ${j})" class="cancel-btn">Delete</button>
      <button onclick="saveContact(${i}, ${j})" class="create-contact-btn">
        Save
      </button>
    </div>
  </div>
</div>`;
}

function closeEditContact() {
  document.getElementById(`editContactsOverlay`).classList.add("d-none");
}

function saveContact(i, j) {
  let editName = document.getElementById("editName").value;
  let editMail = document.getElementById("editMail").value;
  let editPhone = document.getElementById("editPhone").value;
  let contact = contactsByLetter[letters[i]][j];
  contact.name = editName;
  contact.email = editMail;
  contact.phone = editPhone;

  document.getElementById("contactsMid").innerHTML = "";
  initContactList();
  closeEditContact();
}

function deleteContact(i, j) {
  let editName = document.getElementById("editName");
  let editMail = document.getElementById("editMail");
  let editPhone = document.getElementById("editPhone");

  let contact = contactsByLetter[letters[i]][j];
  let contactIndex = contacts.indexOf(contact);

  contactsByLetter[letters[i]].splice(j, 1);
  contacts.splice(contactIndex, 1);

  editName.value = "";
  editMail.value = "";
  editPhone.value = "";
  document.getElementById("contactsMid").innerHTML = "";
  initContactList();
}

function changeMobileView() {
  document.getElementById("newContactBtn").classList.add("hideMobile");
  document.getElementById("contactsRight").classList.add("contactInfoMobile");
  document.getElementById("contactList").classList.add("hideMobile");
}
function exitContact() {
  document
    .getElementById("contactsRight")
    .classList.remove("contactInfoMobile");
  document.getElementById("contactList").classList.remove("hideMobile");
  document.getElementById("newContactBtn").classList.remove("hideMobile");
  document.getElementById("arrowBack").classList.add("hideMobile");
}

//----------------contact successfully created ---------------//
function contactCreated() {
  let success = document.getElementById("contactCreated");
  success.style.display = "block";

  setTimeout(function () {
    success.style.display = "none";
  }, 2000);
}
//----------------contact successfully created ---------------//
