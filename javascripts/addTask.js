let priority;
let assignedContacts = [];
let selectedCategory;

function setPrio(prio) {
  let urgentBtn = document.getElementById("urgentTask");
  let urgentIcon = document.getElementById("urgentIcon");
  let mediumBtn = document.getElementById("mediumTask");
  let mediumIcon = document.getElementById("mediumIcon");
  let lowBtn = document.getElementById("lowTask");
  let lowIcon = document.getElementById("lowIcon");
  if (prio == "urgent") {
    urgentBtn.classList.add("urgent");
    urgentIcon.src = "assets/icons/urgent_white.png";
    mediumBtn.classList.remove("medium");
    mediumIcon.src = "assets/icons/medium.png";
    lowBtn.classList.remove("low");
    lowIcon.src = "assets/icons/low.png";
    priority = "urgent";
  } else if (prio == "medium") {
    mediumBtn.classList.add("medium");
    mediumIcon.src = "assets/icons/medium_white.png";
    urgentBtn.classList.remove("urgent");
    urgentIcon.src = "assets/icons/urgent.png";
    lowBtn.classList.remove("low");
    lowIcon.src = "assets/icons/low.png";
    priority = "medium";
  } else if (prio == "low") {
    lowBtn.classList.add("low");
    lowIcon.src = "assets/icons/low_white.png";
    urgentBtn.classList.remove("urgent");
    urgentIcon.src = "assets/icons/urgent.png";
    mediumBtn.classList.remove("medium");
    mediumIcon.src = "assets/icons/medium.png";
    priority = "low";
  }
}
function addContactNamesToAssignedTo() {
  //adding and rendering contacts to dropdown menu
  document.getElementById("selectContactDropdown").innerHTML = "";
  for (let i = 0; i < contacts.length; i++) {
    let contact = contacts[i];
    let name = contact.name;
    document.getElementById("selectContactDropdown").innerHTML += `
    <div onclick="selectOptionContacts(${i}), pushAssignedContact(${i})" class="option sb">${name} </div>`;
  }
}

function addCategories() {
  //adding and rendering categories to dropdown menu
  for (let i = 0; i < categories.length; i++) {
    let category = categories[i];
    category["name"] =
      category["name"].charAt(0).toUpperCase() + category["name"].slice(1);
    document.getElementById("categoryDropdown").innerHTML += `
    <div onclick="selectOptionCategory(${i})" class="option">
        ${category["name"]}
        <div style="background-color: ${category["color"]}" class="category-circle"></div>
    </div>`;
  }
}

function pushAssignedContact(i) {
  // pushing selected contacts into assignedContacts Array
  let contact = contacts[i];
  let index = assignedContacts.indexOf(contact);
  if (index <= -1) {
    assignedContacts.push(contacts[i]);
  }
}

function createTask() {
  // checking if most important inputs are being filled in and creating new Task
  let title = document.getElementById("addTaskTitle");
  let description = document.getElementById("addTaskDescription");
  let subtask = document.getElementById("addTaskSubtask");
  let dueDate = document.getElementById("date");

  if (selectedCategory == "" || assignedContacts == "" || priority == "") {
    console.log("please fill missing informations");
  } else {
    let newTask = {
      title: title.value,
      description: description.value,
      category: selectedCategory,
      priority: priority,
      subtask: subtask.value,
      dueDate: dueDate.value,
      assignedTo: assignedContacts,
    };

    tasks.push(newTask);
    resetValues();
    taskAdded();
  }
}

function resetValues() {
  let title = document.getElementById("addTaskTitle");
  let description = document.getElementById("addTaskDescription");
  let category = document.getElementById("addTaskCategory");
  let assignedTo = document.getElementById("chosenContacts");
  let subtask = document.getElementById("addTaskSubtask");
  let dueDate = document.getElementById("date");
  priority = "";
  document.getElementById("mediumTask").classList.remove("medium");
  document.getElementById("mediumIcon").src = "assets/icons/medium.png";
  document.getElementById("urgentTask").classList.remove("urgent");
  document.getElementById("urgentIcon").src = "assets/icons/urgent.png";
  document.getElementById("lowTask").classList.remove("low");
  document.getElementById("lowIcon").src = "assets/icons/low.png";
  title.value = "";
  description.value = "";
  category.innerHTML = "Select task category";
  subtask.value = "";
  dueDate.value = "";
  assignedTo.innerHTML = "";

  assignedContacts = [];
  selectedCategory = [];
}

// custom select/dropdown
//-----------dropdown-category --------------------//
function openDropdownCategory() {
  let dropdown = document.getElementById("categoryDropdown");
  let category = document.getElementById("addTaskCategory");
  dropdown.classList.toggle("expanded");
  category.classList.toggle("category-expanded");
}

function selectOptionCategory(i) {
  let dropdown = document.getElementById("categoryDropdown");
  let category = document.getElementById("addTaskCategory");
  let selectedOption = event.target.innerHTML;

  category.innerHTML = selectedOption;
  selectedCategory = categories[i];

  dropdown.classList.remove("expanded");
  category.classList.remove("category-expanded");
}
//-----------dropdown-category --------------------//
//-----------dropdown-contacts --------------------//

function openDropdownContacts() {
  let dropdown = document.getElementById("selectContactDropdown");
  let selectContact = document.getElementById("selectContact");
  dropdown.classList.toggle("expanded");
  selectContact.classList.toggle("category-expanded");
}

function selectOptionContacts(i) {
  //adding and rendering selected Contacts into container below dropdown menu
  let dropdown = document.getElementById("selectContactDropdown");
  let selectContact = document.getElementById("selectContact");
  let chosenContacts = document.getElementById("chosenContacts");

  let initials = getInitials(contacts[i]["name"]);
  let color = contacts[i]["color"];
  // checking if contact got selected already
  if (!isContactSelected(chosenContacts, contacts[i])) {
    if (chosenContacts.children.length < 5) {
      chosenContacts.innerHTML += `<div onclick="removeContact(${i})" style="background-color:${color}" class="chosenContactInitials">
    ${initials}</div>`;
    } else {
      console.log("maximum number of contacts!");
    }
  } else {
    console.log("contact already selected!");
  }

  dropdown.classList.remove("expanded");
  selectContact.classList.remove("category-expanded");
}
//
function isContactSelected(chosenContacts, contact) {
  // checking if contact is in chosenContacts
  let contactElements = chosenContacts.getElementsByClassName(
    "chosenContactInitials"
  );

  for (let i = 0; i < contactElements.length; i++) {
    let initials = contactElements[i].textContent.trim();
    if (initials === getInitials(contact["name"])) {
      return true;
    }
  }

  return false;
}

//-----------dropdown-contacts ------------------------//
//-----------remove added contacts --------------------//
function removeContact(i) {
  chosenContacts.addEventListener("click", function (event) {
    if (event.target.classList.contains("chosenContactInitials")) {
      event.target.remove();
    }
  });
  deleteFromAssignedContacts(i);
}

function deleteFromAssignedContacts(i) {
  let contact = contacts[i];
  let index = assignedContacts.indexOf(contact);
  if (index > -1) {
    assignedContacts.splice(index, 1);
  }
}

//-----------remove added contacts --------------------//

//-------------task successfully added----------------//
function taskAdded() {
  let success = document.getElementById("taskAdded");
  success.style.display = "block";

  setTimeout(function () {
    success.style.display = "none";
  }, 2000);
}
//-------------task successfully added----------------//
