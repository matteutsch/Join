let priority;
let assignedContacts = [];
let selectedCategory;
let subtaskID = 0;
let remoteCategoryAsJSON;

async function initAddTask() {
  remoteTasksAsJSON = await getRemoteData("tasksRemote");
  remoteCategoryAsJSON = await getRemoteData("categoryRemote");
  addContactNamesToAssignedTo();
  addCategories();
  addSubtaskEventListener();
}

function setPrio(prio) {
  let urgentIcon = document.getElementById("urgentIcon");
  let mediumIcon = document.getElementById("mediumIcon");
  let lowIcon = document.getElementById("lowIcon");
  let prioIcon = document.getElementById(`${prio}Icon`);
  let selectedPrio = document.getElementById(`${prio}`);
  let elem = document.querySelectorAll(".prio-btn");
  for (let k = 0; k < elem.length; k++) {
    elem[k].classList.remove("urgent", "medium", "low");

    lowIcon.src = `assets/icons/low.png`;
    mediumIcon.src = `assets/icons/medium.png`;
    urgentIcon.src = `assets/icons/urgent.png`;
  }
  selectedPrio.classList.add(`${prio}`);
  prioIcon.src = `assets/icons/${prio}_white.png`;
  priority = prio;
}

function addContactNamesToAssignedTo() {
  //adding and rendering contacts to dropdown menu
  document.getElementById("selectContactDropdown").innerHTML = "";
  for (let i = 0; i < contacts.length; i++) {
    let contact = contacts[i];
    let name = contact.name;
    document.getElementById("selectContactDropdown").innerHTML += `
    <div id="assignedContactID${i}" onclick="selectOptionContacts(${i}), pushAssignedContact(${i})" class="option sb">${name} </div>`;
  }
}

async function addCategories() {
  //adding and rendering categories to dropdown menu
  document.getElementById(
    "categoryDropdown"
  ).innerHTML = `<div class="option" onclick="showNewCategory()">
    New Category 
  </div>`;
  for (let i = 0; i < remoteCategoryAsJSON.length; i++) {
    let category = remoteCategoryAsJSON[i];
    category["name"] =
      category["name"].charAt(0).toUpperCase() + category["name"].slice(1);
    document.getElementById("categoryDropdown").innerHTML += `
    <div onclick="selectOptionCategory(${i})" class="option">
      <div class="d-option">
        ${category["name"]}
        <div style="background-color: ${category["color"]}" class="category-circle"></div>
      </div>
      <img onclick="removeCategory(${i})" src="assets/icons/clear-subtask.png">  
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
    setTimeout(() => {
      window.location.href = "board.html";
    }, 1000);
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
  let subtaskContainer = document.getElementById("subtaskContainer");
  priority = "";
  document.getElementById("medium").classList.remove("medium");
  document.getElementById("mediumIcon").src = "assets/icons/medium.png";
  document.getElementById("urgent").classList.remove("urgent");
  document.getElementById("urgentIcon").src = "assets/icons/urgent.png";
  document.getElementById("low").classList.remove("low");
  document.getElementById("lowIcon").src = "assets/icons/low.png";
  title.value = "";
  description.value = "";
  category.innerHTML = "Select task category";
  dueDate.value = "";
  assignedTo.innerHTML = "";
  subtaskContainer.innerHTML = "";
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
  selectedCategory = remoteCategoryAsJSON[i]["name"];

  dropdown.classList.remove("expanded");
  category.classList.remove("category-expanded");
}

function showNewCategory() {
  let selectCat = document.getElementById("addTaskCategory");
  let newCat = document.getElementById("newCat");
  let dropdown = document.getElementById("categoryDropdown");
  selectCat.classList.add("d-none");
  newCat.classList.remove("d-none");
  dropdown.classList.add("d-none");
  renderColors();
}
function closeNewCategory() {
  let selectCat = document.getElementById("addTaskCategory");
  let newCat = document.getElementById("newCat");
  let dropdown = document.getElementById("categoryDropdown");
  selectCat.classList.remove("d-none");
  newCat.classList.add("d-none");
  dropdown.classList.remove("d-none");
  document.getElementById("newCatInput").value = "";
}
function renderColors() {
  let colorContainer = document.getElementById("newCatColors");
  colorContainer.innerHTML = "";
  for (let i = 0; i < nameColor.length; i++) {
    let color = nameColor[i];
    colorContainer.innerHTML += `
    <div id="newCatColorID${i}" onclick="selectCatColor(${i})" style="background-color: ${color}" class="newCatColor"></div>`;
  }
}
function selectCatColor(i) {
  let newColor = document.getElementById(`newCatColorID${i}`);
  let allColors = document.querySelectorAll(".newCatColor");
  for (let j = 0; j < allColors.length; j++) {
    allColors[j].classList.remove("selectedColor");
  }
  newColor.classList.add("selectedColor");
}

async function addNewCategory() {
  let newCatInp = document.getElementById("newCatInput");
  let newColorElement = document.querySelector(".selectedColor");
  let newColor = newColorElement.style.backgroundColor;
  let newCat = newCatInp.value;
  newCat = newCat.charAt(0).toUpperCase() + newCat.slice(1);

  if (newCat && newColor) {
    let newCategory = {
      name: newCat,
      color: newColor,
    };
    remoteCategoryAsJSON.push(newCategory);
    await setItem("categoryRemote", remoteCategoryAsJSON);
  }

  addCategories();
  closeNewCategory();
}

async function removeCategory(i) {
  remoteCategoryAsJSON.splice(i, 1);
  await setItem("categoryRemote", remoteCategoryAsJSON);
  document.getElementById("addTaskCategory").innerHTML = "Select task category";
  addCategories();
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
  // Adding and rendering selected Contacts into container below dropdown menu
  let dropdown = document.getElementById("selectContactDropdown");
  let selectContact = document.getElementById("selectContact");
  let chosenContacts = document.getElementById("chosenContacts");

  let assignedContact = document.getElementById(`assignedContactID${i}`);

  let initials = getInitials(contacts[i]["name"]);
  let color = contacts[i]["color"];

  // Checking if contact is already selected
  if (!isContactSelected(chosenContacts, contacts[i])) {
    if (chosenContacts.children.length < 5) {
      assignedContact.classList.add("d-none");

      let newContact = document.createElement("div");
      newContact.style.backgroundColor = color;
      newContact.classList.add("chosenContactInitials");
      newContact.textContent = initials;
      newContact.addEventListener("click", function () {
        removeContact(i, assignedContact);
      });

      chosenContacts.appendChild(newContact);
    } else {
      console.log("Maximum number of contacts reached!");
    }
  } else {
    console.log("Contact already selected!");
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
/* let assignedContacts = []; */

function removeContact(i, assignedContact) {
  deleteFromAssignedContacts(i);
  assignedContact.classList.remove("d-none");
  event.target.remove();
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
    success.innerHTML = `Please fill missing informations`;
  } else {
    success.innerHTML = `Task added to board &nbsp; <img src="assets/icons/board-icon.svg" />`;
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
    }, 100);
  });
}

function createNewSubtask() {
  let inputField = document.getElementById("addTaskSubtask");
  let subtaskContainer = document.getElementById("subtaskContainer");

  if (inputField.value) {
    subtaskContainer.innerHTML += subtaskHTML(inputField.value, subtaskID);
    subtaskID++;
    inputField.value = "";
  }
}

function renderSubtask(taskID) {
  let subtaskContainer = document.getElementById("editSubtaskContainer");

  for (let i = 0; i < remoteTasksAsJSON[taskID]["subtasks"].length; i++) {
    const subtaskName = remoteTasksAsJSON[taskID]["subtasks"][i]["name"];
    const subtaskStatus = remoteTasksAsJSON[taskID]["subtasks"][i]["status"];
    subtaskContainer.innerHTML += subtaskHTML(
      subtaskName,
      taskID,
      subtaskStatus
    );
  }
}

function pushSubtasks() {
  let subtasks = document.querySelectorAll(".subtask");
  let subtaskArray = [];
  subtasks.forEach((subtask) => {
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

function emptySubtaskValue() {
  let inputField = document.getElementById("addTaskSubtask");
  inputField.value = "";
}
