let priority;

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
  document.getElementById("selectContactDropdown").innerHTML = "";
  for (let i = 0; i < contacts.length; i++) {
    let contact = contacts[i];
    let name = contact.name;
    document.getElementById("selectContactDropdown").innerHTML += `
    <div onclick="selectOptionContacts(${i})" class="option sb">${name} <input class="contactCheckbox" type="checkbox"></div>`;
  }
}

function createTask() {
  let title = document.getElementById("addTaskTitle");
  let description = document.getElementById("addTaskDescription");
  let category = document.getElementById("addTaskCategory");
  let assignedTo = document.getElementById("chosenContacts");
  let subtask = document.getElementById("addTaskSubtask");
  let dueDate = document.getElementById("date");

  if (
    title.value == "" ||
    description.value == "" ||
    category.textContent == "" ||
    assignedTo.children == "" ||
    priority == "" ||
    dueDate.value == ""
  ) {
    alert("please fill missing informations");
  } else {
    let newTask = {
      title: title.value,
      description: description.value,
      category: category.value,
      priority: priority,
      subtask: subtask.value,
      dueDate: dueDate.value,
      assignedTo: [],
    };

    tasks.push(newTask);
    resetValues(title, description, category, assignedTo, subtask, dueDate);
  }
}

function resetValues(
  title,
  description,
  category,
  assignedTo,
  subtask,
  dueDate
) {
  priority = "";
  document.getElementById("mediumTask").classList.remove("medium");
  document.getElementById("mediumIcon").src = "assets/icons/medium.png";
  document.getElementById("urgentTask").classList.remove("urgent");
  document.getElementById("urgentIcon").src = "assets/icons/urgent.png";
  document.getElementById("lowTask").classList.remove("low");
  document.getElementById("lowIcon").src = "assets/icons/low.png";
  title.value = "";
  description.value = "";
  category.value = "";
  subtask.value = "";
  dueDate.value = "";
  assignedTo.value = "";
}

// custom select/dropdown
//-----------dropdown-category --------------------//
function openDropdownCategory() {
  let dropdown = document.getElementById("categoryDropdown");
  let category = document.getElementById("addTaskCategory");
  dropdown.classList.toggle("expanded");
  category.classList.toggle("category-expanded");
}

function selectOptionCategory() {
  let dropdown = document.getElementById("categoryDropdown");
  let category = document.getElementById("addTaskCategory");
  let selectedOption = event.target.innerHTML;

  category.innerHTML = selectedOption;

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
  let dropdown = document.getElementById("selectContactDropdown");
  let selectContact = document.getElementById("selectContact");
  let chosenContacts = document.getElementById("chosenContacts");

  let maxContacts = 5;
  let initials = getInitials(contacts[i]["name"]);
  let color = contacts[i]["color"];
  if (chosenContacts.children.length < maxContacts) {
    chosenContacts.innerHTML += `<div onclick="removeContact()" style="background-color:${color}" class="chosenContactInitials">
    ${initials}</div>`;
  } else {
    console.log("maximum number of contacts!");
  }

  dropdown.classList.remove("expanded");
  selectContact.classList.remove("category-expanded");
}
//-----------dropdown-contacts --------------------//
//-----------remove added contacts --------------------//
function removeContact() {
  chosenContacts.addEventListener("click", function (event) {
    if (event.target.classList.contains("chosenContactInitials")) {
      removeChosenContact(event);
    }
  });
}
function removeChosenContact(event) {
  event.target.remove();
}
//-----------remove added contacts --------------------//
