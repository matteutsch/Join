let priority;
let assignedContacts = [];
let selectedCategory;
let subtaskID = 0;

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
    category["name"] = category["name"].charAt(0).toUpperCase() + category["name"].slice(1);
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

async function createTask(status) {
  // checking if most important inputs are being filled in and creating new Task

  let title = document.getElementById("addTaskTitle");
  let description = document.getElementById("addTaskDescription");
  let dueDate = document.getElementById("date");

  if (selectedCategory == "" || assignedContacts == "" || !priority) {
    taskPopup(alert);
  } else {
    let newTask = {
      title: title.value,
      description: description.value,
      status: status,
      category: selectedCategory,
      priority: priority,
      subtasks: pushSubtasks(),
      dueDate: dueDate.value,
      assignedTo: assignedContacts,
    };

    remoteTasksAsJSON.push(newTask);
    await setItem("tasksRemote", remoteTasksAsJSON);
    subtaskID = 0;
    resetValues();
    taskPopup();
  }
  if (window.location.pathname.includes("board.html")) {
    initBoard();
    closeSlideInBtn();
  }
}

function resetValues() {
  let title = document.getElementById("addTaskTitle");
  let description = document.getElementById("addTaskDescription");
  let category = document.getElementById("addTaskCategory");
  let assignedTo = document.getElementById("chosenContacts");
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
  selectedCategory = categories[i]["name"];

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
  let contactElements = chosenContacts.getElementsByClassName("chosenContactInitials");

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
/* let assignedContacts = []; */

function removeContact(i) {
  deleteFromAssignedContacts(i);
  chosenContacts.addEventListener("click", function (event) {
    if (event.target.classList.contains("chosenContactInitials")) {
      event.target.remove();
    }
  });
}

function deleteFromAssignedContacts(i) {
  let contactName = contacts[i]["name"];
  let index = assignedContacts.findIndex((obj) => obj.name === contactName);
  if (index > -1) {
    assignedContacts.splice(index, 1);
  }
}

//-----------remove added contacts --------------------//

//-------------task successfully added----------------//
function taskPopup(change) {
  let success = document.getElementById("taskAdded");
  if (change == alert) {
    document.getElementById("taskAdded").innerHTML = `Please fill missing informations`;
  } else {
    document.getElementById(
      "taskAdded"
    ).innerHTML = `Task added to board &nbsp; <img src="assets/icons/board-icon.svg" />`;
  }
  success.style.display = "block";
  setTimeout(function () {
    success.style.display = "none";
  }, 2000);
}
//-------------task successfully added----------------//

//-------------setting min date to today----------------//
function setMinDate() {
  let date = new Date();
  let year = date.getFullYear();
  let month = date.getMonth() + 1;
  let minMonth = `0${month}`;
  let day = date.getDate();
  let minDay = `0${day}`;
  let today = document.getElementById("date");
  if (month < 10) {
    month = minMonth;
  }
  if (day < 10) {
    day = minDay;
  }
  today.min = `${year}-${month}-${day}`;
}
//-------------setting min date to today----------------//

//-------------subtask----------------//

function addSubtaskEventListener() {
  const inputField = document.getElementById("addTaskSubtask");
  const container = document.getElementById("subtask-buttons");

  inputField.addEventListener("focus", () => {
    container.style.display = "flex";
  });

  inputField.addEventListener("blur", () => {
    setTimeout(() => {
      container.style.display = "none";
    }, 100)
  });
}

function createNewSubtask(){
  let inputField = document.getElementById('addTaskSubtask');
  let subtaskContainer = document.getElementById('subtaskContainer')
  
  if (inputField.value) {
    subtaskContainer.innerHTML += subtaskHTML(inputField.value, subtaskID);
    subtaskID++
    inputField.value = '';
  }
}

function renderSubtask(taskID){
  let inputField = document.getElementById('addTaskSubtask');
  let subtaskContainer = document.getElementById('editSubtaskContainer')

  for (let i = 0; i < remoteTasksAsJSON[taskID]["subtasks"].length; i++) {
    const subtaskName = remoteTasksAsJSON[taskID]["subtasks"][i]["name"];
    const subtaskStatus = remoteTasksAsJSON[taskID]["subtasks"][i]["status"];
    subtaskContainer.innerHTML += subtaskHTML(subtaskName, taskID, subtaskStatus);
  }

}


function pushSubtasks() {
  let subtasks = document.querySelectorAll('.subtask');
  let subtaskArray = [];
  subtasks.forEach(subtask => {
    let checkbox = subtask.querySelector("input[type='checkbox']");
    subtaskArray.push({
      name: subtask.textContent, 
      status: isChecked(checkbox),
    });
  });
  return subtaskArray;
}

function isChecked(checkbox) {
  if (checkbox.checked) {
    return "done";
  } else {
    return "inProgress";
  }
}

function isSubtaskChecked(subtaskStatus) {
  if (subtaskStatus === "done") {
    return true;
  }
  return false;
}



function emptySubtaskValue(){
  let inputField = document.getElementById('addTaskSubtask');
  inputField.value = '';
}
