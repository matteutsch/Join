function renderContactList() {
  document.getElementById("contactList").innerHTML = "";
  for (let i = 0; i < contacts.length; i++) {
    const contact = contacts[i];
    let initials = contact.initials;
    let name = contact.name;
    let email = contact.email;
    let color = contact.color;

    document.getElementById("contactList").innerHTML += /*html*/ `
  <div id='singleContact${i}' class="singleContact" onclick="selectContact(${i})">
    <div style="background-color:${color}" class="singleContactInitials"> ${initials}</div>
    <div class="singleContactName">
    <h3>${name}</h3>
    <p>${email}</p>
    </div>
  </div>
  `;
  }
}

function selectContact(i) {
  let elem = document.querySelectorAll(".singleContact");
  for (let i = 0; i < elem.length; i++) {
    elem[i].classList.remove("selectedContact");
  }

  let singleContactContainer = document.getElementById(
    `singleContact${i}`
  ).classList;
  singleContactContainer.add("selectedContact");

  document.getElementById("contactsMid").innerHTML = `
  <div class="contact-name">
    <div>
      <div style="background-color:${contacts[i]["color"]}" class="contact-initials">
        ${contacts[i]["initials"]}
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
