let openTaskIndex;
let openTaskID;
let assignedToArray;
let remoteTasksAsJSON;

async function initBoard() {
  remoteTasksAsJSON = await getRemoteData("tasksRemote");
  renderTaskCards("todo", "todo");
  renderTaskCards("inProgress", "inProgress");
  renderTaskCards("awaitingFeedback", "awaitingFeedback");
  renderTaskCards("done", "done");
}

function renderCategoryLabelColor(i) {
  let categoryName = remoteTasksAsJSON[i]["category"].toLowerCase();
  let labelColor = categoryColor[0][categoryName];
  return labelColor;
}

function renderTaskCards(container, status) {
  let cardIndex = 0;
  document.getElementById(container).innerHTML = "";
  for (let i = 0; i < remoteTasksAsJSON.length; i++) {
    const taskContainer = document.getElementById(container);
    const task = remoteTasksAsJSON[i];
    if (task["status"] === status) {
      let cardID = remoteTasksAsJSON[i]["status"] + cardIndex;

      taskContainer.innerHTML += taskCardHTML(i, cardID);
      renderAssignedTo(i, `assignedToContainerSmall${i}`);
      cardIndex++;
    }
  }
}

function renderTaskDescription(i) {
  let description = remoteTasksAsJSON[i]["description"];
  return description;
}

function openTaskCard(i, cardID) {
  const taskLayer = document.getElementById("taskLayer");
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
}

function editTaskCard(taskIndex) {
  let openCardContainer = document.querySelector(".task-card-big");
  openCardContainer.innerHTML = editTaskCardHTML(taskIndex);
  fillEditFields(taskIndex);
  addContactNamesToAssignedTo();
  renderSubtask(taskIndex);
  openTaskIndex = taskIndex;
}

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

async function saveChanges() {
  let titleInputFieldValue = document.getElementById("addTaskTitle").value;
  let descriptionInputFieldValue = document.getElementById("addTaskDescription").value;
  let dueDateFieldValue = document.getElementById("date").value;

  remoteTasksAsJSON[openTaskIndex].title = titleInputFieldValue;
  remoteTasksAsJSON[openTaskIndex].description = descriptionInputFieldValue;
  remoteTasksAsJSON[openTaskIndex].dueDate = dueDateFieldValue;
  remoteTasksAsJSON[openTaskIndex].priority = priority;
  remoteTasksAsJSON[openTaskIndex].assignedTo = assignedContacts;
  /* remoteTasksAsJSON[openTaskIndex].subtasks = ; */
  await setItem("tasksRemote", remoteTasksAsJSON);
  openTaskCard(openTaskIndex, openTaskID);
  assignedContacts = [];
  await initBoard();
}

function pushToAssignedContact(assignedToArray) {
  for (let i = 0; i < assignedToArray.length; i++) {
    const contact = assignedToArray[i];
    assignedContacts.push(contact);
  }
}

function renderAssignedToEdit() {
  let chosenContacts = document.getElementById("chosenContacts");
  for (let i = 0; i < assignedContacts.length; i++) {
    const contact = assignedContacts[i];
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

function renderClosingArrow() {
  let arrow = document.querySelector(".task-card-arrow");
  if (window.innerWidth > 670) {
    arrow.style.display = "none";
  } else {
    arrow.style.display = "unset";
  }
}

function renderCloseBtn() {
  const closeBtn = document.querySelector(".task-card-closeBtn");
  if (window.innerWidth > 670) {
    closeBtn.style.display = "unset";
  } else {
    closeBtn.style.display = "none";
  }
}

async function deleteCard(cardIndex, cardID) {
  const card = document.getElementById(cardID);
  card.remove();
  remoteTasksAsJSON.splice(cardIndex, 1);
  clearContainers(["todo", "inProgress", "awaitingFeedback", "done"]);
  setItem("tasksRemote", remoteTasksAsJSON);
  remoteTasksAsJSON = await getRemoteData("tasksRemote");
  initBoard();
  closeLayer();
}

async function getRemoteData(key) {
  let res = await getItem(key);
  return JSON.parse(res.data.value.replace(/'/g, '"'));
}

function clearContainers(containerIds) {
  containerIds.forEach((containerId) => {
    const container = document.getElementById(containerId);
    container.innerHTML = "";
  });
}

function renderUrgencyImg(i) {
  const urgency = remoteTasksAsJSON[i]["priority"];
  if (urgency == "urgent") {
    return "assets/icons/urgent.png";
  } else if (urgency == "medium") {
    return "assets/icons/medium.png";
  } else {
    return "assets/icons/low.png";
  }
}

function renderUrgencyLabel(i) {
  const urgency = remoteTasksAsJSON[i]["priority"];
  if (urgency == "urgent") {
    return "assets/icons/urgent-label.png";
  } else if (urgency == "medium") {
    return "assets/icons/medium-label.png";
  } else {
    return "assets/icons/low-label.png";
  }
}

function renderAssignedTo(taskID, containerClass) {
  const container = document.getElementById(containerClass);
  const assignedToArray = remoteTasksAsJSON[taskID]["assignedTo"];

  for (let i = 0; i < assignedToArray.length; i++) {
    const assignedTo = assignedToArray[i];
    const assignedToName = assignedTo["name"];
    const contactColor = assignedTo["color"];
    const initials = getInitials(assignedToName);
    if (container.id === "assignedTo-container") {
      container.innerHTML += assignedToHTML(contactColor, initials, assignedToName);
    } else {
      container.innerHTML += assignedToCardHTML(contactColor, initials, assignedToName);
    }
  }
}

function displayLayer() {
  let layer = document.getElementById("taskLayer");
  layer.style.display = "flex";
  layer.addEventListener("click", (event) => {
    if (event.target === layer) {
      closeSlideInContainer();
      closeLayer();
      closeTaskCardBig();
      assignedContacts = [];
    }
  });
}

function closeSlideInBtn() {
  closeSlideInContainer();
  closeLayer();
  closeTaskCardBig();
}

function closeSlideInContainer() {
  const slideInContainer = document.getElementById("slideInContainer");
  const taskLayer = document.getElementById("taskLayer");
  taskLayer.style.zIndex = "103";
  if (slideInContainer) {
    slideInContainer.style.transform = "translateX(200%)";
  }
}

function closeTaskCardBig() {
  const taskCardBig = document.querySelector(".task-card-big");
  if (taskCardBig) {
    taskCardBig.style.display = "none";
  }
}

function closeLayer() {
  let layer = document.getElementById("taskLayer");
  setTimeout(() => {
    layer.style.display = "none";
  }, 200),
  layer.removeEventListener("click", displayLayer);
  subtaskCount = 0;
}

function slideInContainer(status) {
  displayLayer();
  const taskLayer = document.getElementById("taskLayer");
  taskLayer.style.zIndex = "1000";
  taskLayer.innerHTML = slideInHTML(status);
  setTimeout(() => {
    const slideInContainer = document.getElementById("slideInContainer");
    slideInContainer.style.display = "flex";
    slideInContainer.style.transform = "translateX(0%)";
  }, 100);
  addContactNamesToAssignedTo();
  addCategories();
  addSubtaskEventListener();
}

document.addEventListener("input", function (event) {
  if (event.target.id === "searchInput") {
    filterCards();
  }
});

function filterCards() {
  const query = document.getElementById("searchInput").value.toLowerCase();
  const cards = document.querySelectorAll(".task-card");

  cards.forEach((card) => {
    const header = card.querySelector(".task-title").innerHTML.toLowerCase();
    const description = card.querySelector(".task-description").innerHTML.toLowerCase();
    if (header.includes(query) || description.includes(query)) {
      card.style.display = "flex";
    } else {
      card.style.display = "none";
    }
  });
}

function countDoneSubtasks(i) {
  let doneSubtasks = remoteTasksAsJSON[i]["subtasks"].filter(
    (subtask) => subtask.status === "done"
  );
  let doneSubtasksCount = doneSubtasks.length;
  return doneSubtasksCount;
}

function renderProgress(i) {
  let doneCount = countDoneSubtasks(i);
  let subtaskLength = remoteTasksAsJSON[i]["subtasks"].length;
  let percentage = (doneCount / subtaskLength) * 100;
  return percentage;
}

// -----------------------drag-&-drop ----------------------------//

let currentDraggedElement;

function startDragging(i) {
  currentDraggedElement = i;
}

async function moveTo(status) {
  remoteTasksAsJSON[currentDraggedElement]["status"] = status;
  await setItem("tasksRemote", remoteTasksAsJSON);
  remoteTasksAsJSON = await getRemoteData("tasksRemote");
  initBoard();
  removeHighlight(status);
}

function allowDrop(ev) {
  ev.preventDefault();
}

function highlight(id) {
  let container = document.getElementById(id);
  container.style.transition = "background-color 0.5s";
  container.style.backgroundColor = "#d1d1d1";
}

function removeHighlight(id) {
  let container = document.getElementById(id);
  container.style.transition = "background-color 0.5s";
  container.style.backgroundColor = "#f6f7f8";
}

function highlightAll() {
  let statusContainers = document.querySelectorAll(".statusContainer");
  statusContainers.forEach((container) => {
    container.style.border = "1px dashed black";
    container.style.transition = "border 0.5s";
  });
}

function removeHighlightAll() {
  let statusContainers = document.querySelectorAll(".statusContainer");
  if (statusContainers) {
    statusContainers.forEach((container) => {
      container.style.border = "none";
      container.style.transition = "none";
    });
  }
}
