function initBoard() {
  renderTaskCards("todoContainer", "todo");
  renderTaskCards("inProgressContainer", "inProgress");
  renderTaskCards("feedbackContainer", "awaitingFeedback");
  renderTaskCards("doneContainer", "done");
}

function renderCategoryLabelColor(i) {
  let category = tasks[i]["category"];
  let labelColor = categoryColor[0][category];
  return labelColor;
}

function renderTaskCards(container, status) {
  let cardIndex = 0;
  for (let i = 0; i < tasks.length; i++) {
    const taskContainer = document.getElementById(container);
    const task = tasks[i];
    if (task["status"] === status) {
      let cardID = tasks[i]["status"] + cardIndex;
      taskContainer.innerHTML += taskCardHTML(i, cardID);
      renderAssignedTo(i, `assignedToContainerSmall${i}`);
      cardIndex++;
    }
  }
}

function renderTaskDescription(i) {
  let description = tasks[i]["description"];
  return description;
}

function openTaskCard(i, cardID) {
  displayLayer();
  document.getElementById("taskLayer").innerHTML = openTaskCardHTML(i, cardID);
  renderAssignedTo(i, "assignedTo-container");
}

function deleteCard(cardIndex, cardID) {
  const card = document.getElementById(cardID);
  const taskIndex = cardIndex;
  card.remove();
  tasks.splice(taskIndex, 1);

  clearContainers([
    "todoContainer",
    "inProgressContainer",
    "feedbackContainer",
    "doneContainer",
  ]);

  initBoard();
  closeLayer();
}

function clearContainers(containerIds) {
  containerIds.forEach((containerId) => {
    const container = document.getElementById(containerId);
    container.innerHTML = "";
  });
}

function renderUrgencyImg(i) {
  const urgency = tasks[i]["priority"];
  if (urgency == "urgent") {
    return "assets/icons/urgent.png";
  } else if (urgency == "medium") {
    return "assets/icons/medium.png";
  } else {
    return "assets/icons/low.png";
  }
}

function renderUrgencyLabel(i) {
  const urgency = tasks[i]["priority"];
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
  const assignedToArray = tasks[taskID]["assignedTo"];

  for (let i = 0; i < assignedToArray.length; i++) {
    const assignedTo = assignedToArray[i];
    const assignedToName = assignedTo["name"];
    const contactColor = assignedTo["color"];
    const initials = getInitials(assignedToName);
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

function displayLayer() {
  let layer = document.getElementById("taskLayer");
  layer.style.display = "flex";
  layer.addEventListener("click", (event) => {
    if (event.target === layer) {
      closeLayer();
      closeSlideInContainer();
      closeTaskCardBig();
    }
  });
}

function closeSlideInContainer() {
  const slideInContainer = document.getElementById("slideInContainer");
  if (slideInContainer) {
    slideInContainer.style.right = "-1116px";
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
  layer.style.display = "none";
  layer.removeEventListener("click", displayLayer);
}

function slideInContainer() {
  const taskLayer = document.getElementById("taskLayer");
  taskLayer.innerHTML = slideInHTML();
  const slideInContainer = document.getElementById("slideInContainer");
  slideInContainer.style.display = "flex";
  slideInContainer.style.right = "0px";
  displayLayer();
  addContactNamesToAssignedTo();
}

function slideOutContainer() {
  const container = document.getElementById("slideInContainer");
  if (container.style.right == "-100%") {
    return null;
  } else {
    container.style.right = "-100%";
  }
  closeLayer(container);
}


