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
  const taskLayer = document.getElementById("taskLayer");
  taskLayer.style.zIndex = "1";
  if (window.innerWidth > 670) {
    taskLayer.style.zIndex = "100";
  } else {
    taskLayer.style.zIndex = "1";
  }
  taskLayer.innerHTML = openTaskCardHTML(i, cardID);
  displayLayer();
  renderAssignedTo(i, "assignedTo-container");
  renderClosingArrow();
}

function renderClosingArrow() {
  const arrow = document.querySelector(".task-card-arrow");
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

function deleteCard(cardIndex, cardID) {
  const card = document.getElementById(cardID);
  const taskIndex = cardIndex;
  card.remove();
  tasks.splice(taskIndex, 1);
  clearContainers(["todoContainer", "inProgressContainer", "feedbackContainer", "doneContainer"]);
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
  taskLayer.style.zIndex = "100";
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
}

document.addEventListener("input", function(event) {
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



