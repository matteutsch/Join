let priority;
let assignedContacts = [];
let selectedCategory;
let subtaskID = 0;
let remoteCategoryAsJSON;

/**
 * Initializes the add task functionality by fetching remote tasks and categories, and setting up event listeners.
 * @returns {Promise}
 */
async function initAddTask() {
  remoteTasksAsJSON = await getRemoteData("tasksRemote");
  remoteCategoryAsJSON = await getRemoteData("categoryRemote");
  addContactNamesToAssignedTo();
  addCategories();
  addSubtaskEventListener();
}

/**
 * Sets the priority of the task.
 * @param {string} prio - The priority value ("urgent", "medium", or "low").
 */
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

/**
 * Adds contact names to the assignedTo dropdown menu.
 */
function addContactNamesToAssignedTo() {
  document.getElementById("selectContactDropdown").innerHTML = "";
  for (let i = 0; i < contacts.length; i++) {
    let contact = contacts[i];
    let name = contact.name;
    document.getElementById("selectContactDropdown").innerHTML += `
    <div id="assignedContactID${i}" onclick="selectOptionContacts(${i}), pushAssignedContact(${i})" class="option sb">${name} </div>`;
  }
}

/**
 * Adds categories to the category dropdown menu.
 */
async function addCategories() {
  document.getElementById(
    "categoryDropdown"
  ).innerHTML = `<div class="option" onclick="showNewCategory()">
    New Category 
  </div>`;
  for (let i = 0; i < remoteCategoryAsJSON.length; i++) {
    let category = remoteCategoryAsJSON[i];
    let name = category["name"];
    let color = category["color"];
    name = name.charAt(0).toUpperCase() + name.slice(1);
    document.getElementById("categoryDropdown").innerHTML += genCategoryHTML(
      i,
      name,
      color
    );
  }
}

/**
 * Generates HTML for a category in the dropdown menu.
 * @param {number} i - The index of the category.
 * @param {string} name - The name of the category.
 * @param {string} color - The color of the category.
 * @returns {string} The generated HTML for the category.
 */
function genCategoryHTML(i, name, color) {
  return `
<div onclick="selectOptionCategory(${i})" class="option">
  <div class="d-option">
    ${name}
    <div style="background-color: ${color}" class="category-circle"></div>
  </div>
  <img onclick="removeCategory(event, ${i})" src="assets/icons/clear-subtask.png">  
</div>`;
}

/**
 * Pushes the selected assigned contact to the assignedContacts array.
 * @param {number} i - The index of the contact.
 */
function pushAssignedContact(i) {
  let contact = contacts[i];
  let index = assignedContacts.indexOf(contact);
  if (index <= -1 && assignedContacts.length < 5) {
    assignedContacts.push(contacts[i]);
  }
}

/**
 * Creates a new task with the given status, title, description, due date, assigned contacts, priority, category, and subtasks.
 * @param {string} status - The status of the task.
 * @returns {Promise}
 */
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
    setNewTask(newTask);
  }
}

/**
 * Sets a new task by adding it to the remoteTasksAsJSON array and updating the remote storage.
 * Resets values and performs additional actions after setting the new task.
 *
 * @param {object} newTask - The new task object to be added.
 * @returns {Promise}
 */
async function setNewTask(newTask) {
  remoteTasksAsJSON.push(newTask);
  await setItem("tasksRemote", remoteTasksAsJSON);
  subtaskID = 0;
  resetValues();
  taskPopup();
  boardCondition();
}

/**
 * Handles the behavior when a task is added to the board.
 */
function boardCondition() {
  if (window.location.pathname.includes("add_task.html")) {
    setTimeout(() => {
      window.location.href = "board.html";
    }, 1000);
  }
  if (window.location.pathname.includes("board.html")) {
    initBoard();
    closeSlideInBtn();
  }
}

/**
 * Resets the values of the input fields and dropdowns after a task is created.
 */
function resetValues() {
  let category = document.getElementById("addTaskCategory");
  let assignedTo = document.getElementById("chosenContacts");
  let subtaskContainer = document.getElementById("subtaskContainer");
  let title = document.getElementById("addTaskTitle");
  let description = document.getElementById("addTaskDescription");
  let dueDate = document.getElementById("date");
  priority = "";
  title.value = "";
  description.value = "";
  dueDate.value = "";
  category.innerHTML = "Select task category";
  assignedTo.innerHTML = "";
  subtaskContainer.innerHTML = "";
  assignedContacts = [];
  selectedCategory = [];
  resetPrioBtn();
}

/**
 * Resets the priority button.
 */
function resetPrioBtn() {
  let elem = document.querySelectorAll(".prio-btn");
  for (let k = 0; k < elem.length; k++) {
    elem[k].classList.remove("urgent", "medium", "low");
    document.getElementById("mediumIcon").src = "assets/icons/medium.png";
    document.getElementById("urgentIcon").src = "assets/icons/urgent.png";
    document.getElementById("lowIcon").src = "assets/icons/low.png";
  }
}

/**
 * Opens the category dropdown menu.
 */
function openDropdownCategory() {
  let dropdown = document.getElementById("categoryDropdown");
  let category = document.getElementById("addTaskCategory");
  dropdown.classList.toggle("expanded");
  category.classList.toggle("category-expanded");
}

/**
 * Selects a category option from the dropdown menu.
 * @param {number} i - The index of the category.
 */
function selectOptionCategory(i) {
  let dropdown = document.getElementById("categoryDropdown");
  let category = document.getElementById("addTaskCategory");
  let selectedOption = event.target.innerHTML;

  category.innerHTML = selectedOption;
  selectedCategory = remoteCategoryAsJSON[i]["name"];

  dropdown.classList.remove("expanded");
  category.classList.remove("category-expanded");
}

/**
 * Shows the new category input field and hides the category dropdown menu.
 */
function showNewCategory() {
  let selectCat = document.getElementById("addTaskCategory");
  let newCat = document.getElementById("newCat");
  let dropdown = document.getElementById("categoryDropdown");
  selectCat.classList.add("d-none");
  newCat.classList.remove("d-none");
  dropdown.classList.add("d-none");
  renderColors();
}

/**
 * Closes the new category input field and shows the category dropdown menu.
 */
function closeNewCategory() {
  let selectCat = document.getElementById("addTaskCategory");
  let newCat = document.getElementById("newCat");
  let dropdown = document.getElementById("categoryDropdown");
  selectCat.classList.remove("d-none");
  newCat.classList.add("d-none");
  dropdown.classList.remove("d-none");
  document.getElementById("newCatInput").value = "";
}

/**
 * Renders the available colors for the new category.
 */
function renderColors() {
  let colorContainer = document.getElementById("newCatColors");
  colorContainer.innerHTML = "";
  for (let i = 0; i < nameColor.length; i++) {
    let color = nameColor[i];
    colorContainer.innerHTML += `
    <div id="newCatColorID${i}" onclick="selectCatColor(${i})" style="background-color: ${color}" class="newCatColor"></div>`;
  }
}

/**
 * Selects a color for the new category.
 * @param {number} i - The index of the color.
 */
function selectCatColor(i) {
  let newColor = document.getElementById(`newCatColorID${i}`);
  let allColors = document.querySelectorAll(".newCatColor");
  for (let j = 0; j < allColors.length; j++) {
    allColors[j].classList.remove("selectedColor");
  }
  newColor.classList.add("selectedColor");
}

/**
 * Adds a new category to the category list.
 * @returns {Promise}
 */
async function addNewCategory() {
  let newCatInp = document.getElementById("newCatInput");
  let newColorElement = document.querySelector(".selectedColor");
  let newColor = newColorElement ? newColorElement.style.backgroundColor : null;
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

/**
 * Removes a category from the category list.
 * @param {Event} event - The event object.
 * @param {number} i - The index of the category.
 * @returns {Promise}
 */
async function removeCategory(event, i) {
  event.stopPropagation();

  remoteCategoryAsJSON.splice(i, 1);
  await setItem("categoryRemote", remoteCategoryAsJSON);
  document.getElementById("addTaskCategory").innerHTML = "Select task category";
  addCategories();
}

/**
 * Opens the contacts dropdown menu.
 */
function openDropdownContacts() {
  let dropdown = document.getElementById("selectContactDropdown");
  let selectContact = document.getElementById("selectContact");
  dropdown.classList.toggle("expanded");
  selectContact.classList.toggle("category-expanded");
}

/**
 * Selects a contact option from the dropdown menu.
 * @param {number} i - The index of the contact.
 */
function selectOptionContacts(i) {
  let dropdown = document.getElementById("selectContactDropdown");
  let chosenContacts = document.getElementById("chosenContacts");
  let assignedContact = document.getElementById(`assignedContactID${i}`);
  let initials = getInitials(contacts[i]["name"]);
  let color = contacts[i]["color"];

  if (!isContactSelected(chosenContacts, contacts[i])) {
    if (chosenContacts.children.length < 5) {
      assignedContact.classList.add("d-none");

      let newContactHTML = `
        <div style="background-color: ${color}" class="chosenContactInitials" onclick="removeContact(${i})">
          ${initials}
        </div>
      `;
      chosenContacts.innerHTML += newContactHTML;
      let selectedOption = dropdown.querySelector(`option[value="${i}"]`);
      if (selectedOption) {
        selectedOption.remove();
      }
    }
  }
}

/**
 * Closes the assign to and category dropdown menus.
 */
document.addEventListener("click", (e) => {
  let dropdown = document.getElementById("selectContactDropdown");
  let selectContact = document.getElementById("selectContact");
  if (!dropdown.contains(e.target) && !selectContact.contains(e.target)) {
    dropdown.classList.remove("expanded");
    selectContact.classList.remove("category-expanded");
  }
  let category = document.getElementById("addTaskCategory");
  let selectCategory = document.getElementById("categoryDropdown");
  if (!category.contains(e.target) && !selectCategory.contains(e.target)) {
    category.classList.remove("category-expanded");
    selectCategory.classList.remove("expanded");
  }
});

/**
 * Checks if a contact is already selected in the chosen contacts container.
 * @param {HTMLElement} chosenContacts - The chosen contacts container.
 * @param {object} contact - The contact object.
 * @returns {boolean} True if the contact is already selected, false otherwise.
 */
function isContactSelected(chosenContacts, contact) {
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

/**
 * Removes a contact from the chosenContacts container and adds it back to the selectContactDropdown.
 * @param {number} i - The index of the contact.
 */
function removeContact(i) {
  let dropdown = document.getElementById("selectContactDropdown");
  let contact = contacts[i];
  let contactID = assignedContacts.indexOf(contact);
  assignedContacts.splice(contactID, 1);
  let selectedContact = contacts[i];
  let contactName = selectedContact.name;
  let assignedContactID = `assignedContactID${i}`;
  let existingOption = dropdown.querySelector(`#${assignedContactID}`);

  if (!existingOption) {
    let newOptionHTML = `
      <div id="${assignedContactID}" onclick="selectOptionContacts(${i})" class="option sb">${contactName}</div>
    `;
    dropdown.innerHTML += newOptionHTML;
  }

  removeFromChosenContacts(i, contactName);
  recoverAssignedContact(assignedContactID);
}
