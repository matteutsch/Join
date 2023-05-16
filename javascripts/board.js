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

function taskCardHTML(i, cardID) {
  return `
  <div class="task-card" id="${cardID}" onclick="openTaskCard(${i}, '${cardID}')">
    <div class="category-label"
      style="background-color: ${renderCategoryLabelColor(i)};">
      ${tasks[i]["category"][0].toUpperCase() + tasks[i]["category"].slice(1)}
      </div>
    <div class="task-title">${tasks[i]["title"]}</div>
    <div class="task-description">
      ${renderTaskDescription(i)}
    </div>
    <div class="task-bottom">
      <div class="assignedToContainerSmall" id="assignedToContainerSmall${i}"></div>
      <div class="task-urgency-container">
        <img src="${renderUrgencyImg(i)}" />
      </div>
    </div>
  </div>`;
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

function openTaskCardHTML(i, cardID) {
  return `
    <div class="task-card-big" id="${cardID}">
      <div class="category-label-big" style="background-color: ${renderCategoryLabelColor(i)};">
        ${tasks[i]["category"][0].toUpperCase() + tasks[i]["category"].slice(1)}
      </div>
      <div class="task-title-big">${tasks[i]["title"]}</div>
      <div class="task-description-big">${renderTaskDescription(i)}</div>
      <div class="due-date"><b>Due date:</b> ${tasks[i]["dueDate"]}</div>
      <div class="task-card-priority"><b>Priority:</b> <img src="${renderUrgencyLabel(i)}" /></div>
      <p><b>Assigned To:</b></p>
      <div id="assignedTo-container"></div>
      <div class="open-task-buttons">
      <div class="delete-button" onclick="deleteCard(${i}, '${cardID}')">
      <img src="assets/icons/delete_black.png" />
    </div>
        <div class="edit-button"><img src="assets/icons/Pencil_icon.png" /></div>
      </div>
    </div>
  `;
}

function deleteCard(cardIndex, cardID) {
  const card = document.getElementById(cardID);
  const taskIndex = cardIndex;
  if (card && taskIndex) {
    card.remove();
    tasks.splice(taskIndex, 1);
  }
  closeLayer();
}



function renderUrgencyImg(i) {
  const urgency = tasks[i]["priority"];
  if (urgency == "urgent") {
    return "assets/icons/urgent.png";
  } else if (urgency == "medium") {
    return "assets/icons/medium.png";
  } else {
    return "assets/icons/low.png";
    TaskCard;
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
    const initials = assignedTo["initials"];
    if (container.id === "assignedTo-container") {
      container.innerHTML += assignedToHTML(contactColor, initials, assignedToName);
    } else {
      container.innerHTML += assignedToCardHTML(contactColor, initials, assignedToName);
    }
  }
}

function assignedToHTML(contactColor, initials, assignedToName) {
  return `
  <div class="assignedTo-row">
  <div class="initial-label" style="background-color:${contactColor}">${initials}</div><p>${assignedToName}</p>
  </div>
  `;
}

function assignedToCardHTML(contactColor, initials) {
  return `
  <div class="initial-label-card" style="background-color:${contactColor}">${initials}</div>
  `;
}

function displayLayer() {
  let layer = document.getElementById("taskLayer");
  layer.style.display = "flex";
  layer.addEventListener("click", (event) => {
    if (event.target === layer) {
      closeLayer();
    }
  });
}

function closeLayer() {
  let layer = document.getElementById("taskLayer");
  layer.style.display = "none";
  layer.removeEventListener("click", displayLayer);
}
