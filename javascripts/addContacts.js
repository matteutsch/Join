let letters = [];
let contactsByLetter = [];

function renderContactList() {
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

  for (let i = 0; i < letters.length; i++) {
    let letter = letters[i];
    let contactsWithLetter = contactsByLetter[letter];
    console.log(contactsByLetter[letter]);
    document.getElementById(
      "contactList"
    ).innerHTML += `<div id="letter${letter}" ><h3 class="letterHeader" >${letter}</h3></div>`;

    for (let j = 0; j < contactsWithLetter.length; j++) {
      let contact = contactsWithLetter[j];
      let name = contact.name;
      let initials = getInitials(name);
      let email = contact.email;
      let color = contact.color;
      document.getElementById(`letter${letter}`).innerHTML +=
        addContactListHTML(j, color, initials, name, email);
    }
  }
}
function addContactListHTML(j, color, initials, name, email) {
  return `
    <div id='singleContact${j}' class="singleContact" onclick="selectContact(${j})">
      <div style="background-color:${color}" class="singleContactInitials"> ${initials}</div>
      <div class="singleContactName">
      <h3>${name}</h3>
      <p>${email}</p>
      </div>
    </div>
    `;
}

function selectContact(i) {
  let elem = document.querySelectorAll(".singleContact");
  for (let i = 0; i < elem.length; i++) {
    elem[i].classList.remove("selectedContact");
  }
  document.getElementById(`singleContact${i}`).classList.add("selectedContact");

  document.getElementById("contactsMid").innerHTML = renderSelectContactHTML(i);
}

function renderSelectContactHTML(i) {
  let initials = getInitials(contacts[i]["name"]);
  return `
  <div class="contact-name">
    <div>
      <div style="background-color:${contacts[i]["color"]}" class="contact-initials">
        ${initials}
      </div>
    </div>
    <div>
      <h1>${contacts[i]["name"]}</h1>
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
        <p onclick="openEditContact()">&nbsp; Edit Contact</p>
      </div>
    </div>
    <h3>Email</h3>
    <p>${contacts[i]["email"]}</p>
    <h3>Phone</h3>
    <p>+49&nbsp;1103202181</p>
  </div>`;
}

function addContact() {
  let name = document.getElementById("newContactName");
  let email = document.getElementById("newContactEmail");
  let phone = document.getElementById("newContactPhone");
  let randomNumber = Math.floor(Math.random() * nameColor.length);

  let newContact = {
    name: name.value,
    email: email.value,
    phone: phone.value,
    color: nameColor[randomNumber],
  };

  contacts.push(newContact);

  name.value = "";
  email.value = "";
  phone.value = "";
}

function openNewContact() {
  document.getElementById(`addContactsOverlay`).classList.remove("d-none");
}

function closeNewContact() {
  document.getElementById(`addContactsOverlay`).classList.add("d-none");
}

function openEditContact() {
  document.getElementById(`editContactsOverlay`).classList.remove("d-none");
}

function closeEditContact() {
  document.getElementById(`editContactsOverlay`).classList.add("d-none");
}
