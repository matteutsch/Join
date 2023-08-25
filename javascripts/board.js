let openTaskIndex;
let openTaskID;
let assignedToArray;
let remoteTasksAsJSON;
let assignedContactNames = [];
let currentDraggedElement;

/**
 * Initializes the board by fetching remote data, rendering task cards, and setting button visibility.
 * @returns {Promise} A Promise that resolves when the board is initialized.
 */
async function initBoard() {
  remoteTasksAsJSON = await getRemoteData("tasksRemote");
  remoteCategoryAsJSON = await getRemoteData("categoryRemote");
  renderTaskCards("todo", "todo");
  renderTaskCards("inProgress", "inProgress");
  renderTaskCards("awaitingFeedback", "awaitingFeedback");
  renderTaskCards("done", "done");
  toggleButtonVisibility();
  isEmptyStatusContainer();
}

/**
 * Renders the category label color based on the given index.
 * @param {number} i - The index of the task.
 * @returns {string} The label color.
 */
function renderCategoryLabelColor(i) {
  let categoryName =
    remoteTasksAsJSON[i]["category"].charAt(0).toUpperCase() +
    remoteTasksAsJSON[i]["category"].slice(1);
  let labelColor = findColorByName(categoryName);

  return labelColor;
}

/**
 * Finds the color of a category by its name.
 * @param {string} categoryName - The name of the category.
 * @returns {string|null} The color of the category, or null if not found.
 */
function findColorByName(categoryName) {
  for (let i = 0; i < remoteCategoryAsJSON.length; i++) {
    if (remoteCategoryAsJSON[i].name === categoryName) {
      return remoteCategoryAsJSON[i].color;
    }
  }
  return null;
}

/**
 * Renders task cards in the specified container based on the task status.
 * @param {string} container - The ID of the container element.
 * @param {string} status - The status of the tasks to render.
 */
function renderTaskCards(container, status) {
  let cardIndex = 0;
  document.getElementById(container).innerHTML = "";
  for (let i = 0; i < remoteTasksAsJSON.length; i++) {
    let taskContainer = document.getElementById(container);
    let task = remoteTasksAsJSON[i];
    if (task["status"] === status) {
      let cardID = remoteTasksAsJSON[i]["status"] + cardIndex;

      taskContainer.innerHTML += taskCardHTML(i, cardID);
      renderAssignedTo(i, `assignedToContainerSmall${i}`);
      cardIndex++;
    }
  }
}

/**
 * Renders the description of a task based on the given index.
 * @param {number} i - The index of the task.
 * @returns {string} The task description.
 */
function renderTaskDescription(i) {
  let description = remoteTasksAsJSON[i]["description"];
  return description;
}

/**
 * Checks if a status container is empty and adjusts its minimum height if necessary.
 */
function isEmptyStatusContainer() {
  let statusContainers = document.querySelectorAll(".statusContainer");
  statusContainers.forEach((c) => {
    if (c.innerHTML == "") {
      c.style.minHeight = "100px";
    }
  });
}

/**
 * Opens a task card with the specified index and ID.
 * @param {number} i - The index of the task.
 * @param {string} cardID - The ID of the task card.
 */
function openTaskCard(i, cardID) {
  let taskLayer = document.getElementById("taskLayer");
  taskLayer.style.zIndex = "1";
  if (window.innerWidth > 670) {
    taskLayer.style.zIndex = "103";
  } else {
    taskLayer.style.zIndex = "1";
  }
  taskLayer.innerHTML = openTaskCardHTML(i, cardID);
  openTaskID = cardID;
  displayLayer();
  renderAssignedTo(i, "assignedTo-container");
  renderClosingArrow();
  document.body.style.overflow = "hidden";
  fillAssignedContactNames();
}

/**
 * Fills the assigned contact names array from the assignedToContainer.
 */
function fillAssignedContactNames() {
  let assignedToContainer = document.querySelectorAll(".assignedTo-row p");
  assignedToContainer.forEach((container) => {
    let name = container;
    assignedContactNames.push(name.innerHTML);
  });
}

/**
 * Edits a task card with the specified index.
 * @param {number} taskIndex - The index of the task to edit.
 */
function editTaskCard(taskIndex) {
  let openCardContainer = document.querySelector(".task-card-big");
  openCardContainer.innerHTML = editTaskCardHTML(taskIndex);
  fillEditFields(taskIndex);
  addContactNamesToAssignedTo();
  renderSubtask(taskIndex);
  openTaskIndex = taskIndex;
  excludeNamesInDropdown();
}

/**
 * Excludes assigned contact names from the dropdown options.
 */
function excludeNamesInDropdown() {
  for (let i = 0; i < assignedContactNames.length; i++) {
    let name = assignedContactNames[i];
    let dropdownNames = document.querySelectorAll(".option");
    dropdownNames.forEach((dropdownName) => {
      let contactName = dropdownName.innerHTML;
      if (contactName.includes(name)) {
        dropdownName.classList.add("d-none");
      }
    });
  }
}

/**
 * Fills the edit fields with data from the specified task index.
 * @param {number} taskIndex - The index of the task.
 */
function fillEditFields(taskIndex) {
  let titleInputField = document.getElementById("addTaskTitle");
  let descriptionInputField = document.getElementById("addTaskDescription");
  let dueDateField = document.getElementById("date");
  let prio = remoteTasksAsJSON[taskIndex]["priority"];
  assignedToArray = remoteTasksAsJSON[taskIndex]["assignedTo"];

  titleInputField.value = remoteTasksAsJSON[taskIndex]["title"];
  descriptionInputField.value = remoteTasksAsJSON[taskIndex]["description"];
  dueDateField.value = remoteTasksAsJSON[taskIndex]["dueDate"];

  setPrio(prio);
  pushToAssignedContact(assignedToArray);
  renderAssignedToEdit();
}

/**
 * Saves the changes made to the task card.
 * @returns {Promise} A Promise that resolves when the changes are saved.
 */
async function saveChanges() {
  let titleInputFieldValue = document.getElementById("addTaskTitle").value;
  let descriptionInputFieldValue =
    document.getElementById("addTaskDescription").value;
  let dueDateFieldValue = document.getElementById("date").value;

  let updatedTask = {
    ...remoteTasksAsJSON[openTaskIndex],
    title: titleInputFieldValue,
    description: descriptionInputFieldValue,
    dueDate: dueDateFieldValue,
    priority: priority,
    assignedTo: assignedContacts,
  };

  remoteTasksAsJSON[openTaskIndex] = updatedTask;
  loadSubtasks();
  await setItem("tasksRemote", remoteTasksAsJSON);
  openTaskCard(openTaskIndex, openTaskID);
  assignedContacts = [];
  await initBoard();
}

/**
 * Loads the subtasks and updates their status based on the checkbox values.
 */
function loadSubtasks() {
  let subtaskContainer = document.getElementById("editSubtaskContainer");

  for (let i = 0; i < subtaskContainer.childElementCount; i++) {
    let subtask = subtaskContainer.children[i];
    let checkbox = subtask.querySelector(".checkbox");
    let storageSubtask = remoteTasksAsJSON[openTaskIndex]["subtasks"][i];
    if (checkbox.checked) {
      storageSubtask.status = "done";
    } else {
      storageSubtask.status = "inProgress";
    }
  }
}

/**
 * Pushes assigned contacts to the assignedContacts array.
 * @param {Array} assignedToArray - The array of assigned contacts.
 */
function pushToAssignedContact(assignedToArray) {
  for (let i = 0; i < assignedToArray.length; i++) {
    let contact = assignedToArray[i];
    assignedContacts.push(contact);
  }
}

/**
 * Renders the assigned contacts in the edit mode.
 */
function renderAssignedToEdit() {
  let chosenContacts = document.getElementById("chosenContacts");
  for (let i = 0; i < assignedContacts.length; i++) {
    let contact = assignedContacts[i];
    let color = contact["color"];
    let assignedToName = contact["name"];
    let initials = getInitials(assignedToName);
    let contactIndex = contacts.findIndex((c) => {
      return (
        c.name === contact.name &&
        c.color === contact.color &&
        c.email === contact.email &&
        c.phone === contact.phone
      );
    });
    if (chosenContacts.children.length < 5) {
      chosenContacts.innerHTML += `<div onclick="removeContact(${contactIndex})" style="background-color:${color}" class="chosenContactInitials">
      ${initials}</div>`;
    }
  }
}

/**
 * Renders the closing arrow based on the window width.
 */
function renderClosingArrow() {
  let arrow = document.querySelector(".task-card-arrow");
  if (window.innerWidth > 670) {
    arrow.style.display = "none";
  } else {
    arrow.style.display = "unset";
  }
}

/**
 * Renders the close button based on the window width.
 */
function renderCloseBtn() {
  let closeBtn = document.querySelector(".task-card-closeBtn");
  if (window.innerWidth > 670) {
    closeBtn.style.display = "unset";
  } else {
    closeBtn.style.display = "none";
  }
}

/**
 * Deletes a task card with the specified index and ID.
 * @param {number} cardIndex - The index of the task.
 * @param {string} cardID - The ID of the task card.
 * @returns {Promise} A Promise that resolves when the card is deleted.
 */
async function deleteCard(cardIndex, cardID) {
  let card = document.getElementById(cardID);
  card.remove();
  remoteTasksAsJSON.splice(cardIndex, 1);
  clearContainers(["todo", "inProgress", "awaitingFeedback", "done"]);
  setItem("tasksRemote", remoteTasksAsJSON);
  remoteTasksAsJSON = await getRemoteData("tasksRemote");
  initBoard();
  closeLayer();
  document.body.style.overflow = "auto";
}

/**
 * Retrieves remote data based on the given key.
 * @param {string} key - The key of the remote data to retrieve.
 * @returns {Promise<Object>} A Promise that resolves with the remote data.
 */
async function getRemoteData(key) {
  let res = await getItem(key);
  return JSON.parse(res.data.value.replace(/'/g, '"'));
}

/**
 * Clears the specified containers by emptying their HTML content.
 * @param {Array<string>} containerIds - An array of container IDs to clear.
 */
function clearContainers(containerIds) {
  containerIds.forEach((containerId) => {
    let container = document.getElementById(containerId);
    container.innerHTML = "";
  });
}

/**
 * Renders the urgency image based on the task's priority at the given index.
 * @param {number} i - The index of the task.
 * @returns {string} The path to the urgency image.
 */
function renderUrgencyImg(i) {
  let urgency = remoteTasksAsJSON[i]["priority"];
  if (urgency == "urgent") {
    return "assets/icons/urgent.png";
  } else if (urgency == "medium") {
    return "assets/icons/medium.png";
  } else {
    return "assets/icons/low.png";
  }
}

/**
 * Renders the urgency label image based on the task's priority at the given index.
 * @param {number} i - The index of the task.
 * @returns {string} The path to the urgency label image.
 */
function renderUrgencyLabel(i) {
  let urgency = remoteTasksAsJSON[i]["priority"];
  if (urgency == "urgent") {
    return "assets/icons/urgent-label.png";
  } else if (urgency == "medium") {
    return "assets/icons/medium-label.png";
  } else {
    return "assets/icons/low-label.png";
  }
}

/**
 * Renders the assigned contacts for a task with the specified ID and container class.
 * @param {number} taskID - The ID of the task.
 * @param {string} containerClass - The class of the container element.
 */
function renderAssignedTo(taskID, containerClass) {
  let container = document.getElementById(containerClass);
  let assignedToArray = remoteTasksAsJSON[taskID]["assignedTo"];

  for (let i = 0; i < assignedToArray.length; i++) {
    let assignedTo = assignedToArray[i];
    let assignedToName = assignedTo["name"];
    let contactColor = assignedTo["color"];
    let initials = getInitials(assignedToName);
    if (container.id === "assignedTo-container") {
      container.innerHTML += assignedToHTML(
        contactColor,
        initials,
        assignedToName
      );
    } else {
      container.innerHTML += assignedToCardHTML(
        contactColor,
        initials,
        assignedToName
      );
    }
  }
}

/**
 * Displays the task layer and handles the click event to close the layer.
 */
function displayLayer() {
  let layer = document.getElementById("taskLayer");
  layer.style.display = "flex";
  layer.addEventListener("click", (event) => {
    if (event.target === layer) {
      closeSlideInContainer();
      closeLayer();
      closeTaskCardBig();
      assignedContacts = [];
      document.body.style.overflow = "auto";
    }
  });
}
