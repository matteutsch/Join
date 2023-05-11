function initBoard() {
  renderTaskCards("todoContainer", "todo");
  renderTaskCards("inProgressContainer", "in-progress");
  renderTaskCards("feedbackContainer", "awaiting-feedback");
  renderTaskCards("doneContainer", "done");
}

function renderCategoryLabelColor(i) {
  let category = tasks[i]["category"];
  let labelColor = categoryColor[0][category];
  return labelColor;
}

function renderTaskCards(container, status) {
  for (let i = 0; i < tasks.length; i++) {
    let cardID = tasks[i]["status"] + i;
    const taskContainer = document.getElementById(container);
    const task = tasks[i];
    if (task["status"] === status) {
      taskContainer.innerHTML += taskCardHTML(i, cardID);
    }
  }
}

function taskCardHTML(i, cardID) {
  return `
  <div class="task-card" id="${cardID}" onclick="openTaskCard(${i})">
    <div class="category-label"
      style="background-color: ${renderCategoryLabelColor(i)};">
      ${tasks[i]["category"][0].toUpperCase() + tasks[i]["category"].slice(1)}
      </div>
    <div class="task-title">${tasks[i]["title"]}</div>
    <div class="task-description">
      ${renderTaskDescription(i)}
    </div>
    <div class="task-bottom">
      <div class="assignedTo-container">DE</div>
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

function openTaskCard(i) {
  displayLayer();
  /* taskLayer.classList.remove("d-none"); */
  document.getElementById("taskLayer").innerHTML = openTaskCardHTML(i);
  renderAssignedTo(i);
}

function openTaskCardHTML(i) {
  return `
    <div class="task-card-big" id="${tasks[i]["status"]}${i}">
      <div class="category-label-big" style="background-color: ${renderCategoryLabelColor(i)};">
        ${tasks[i]["category"][0].toUpperCase() + tasks[i]["category"].slice(1)}
      </div>
      <div class="task-title-big">${tasks[i]["title"]}</div>
      <div class="task-description-big">${renderTaskDescription(i)}</div>
      <div class="due-date"><b>Due date:</b> ${tasks[i]["dueDate"]}</div>
      <div class="task-card-priority"><b>Priority:</b> <img src="${renderUrgencyLabel(i)}" /></div>
      <p><b>Assigned To:</b></p>
      <div id="assignedTo-container${i}" class="assignedTo-container"></div>
    </div>
  `;
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

function renderAssignedTo(cardID){
  const container = document.getElementById(`assignedTo-container${cardID}`);
  const assignedToArray = tasks[cardID]["assignedTo"];
  for (let i = 0; i < assignedToArray.length; i++) {
    const assignedTo = assignedToArray[i];
    container.innerHTML += `<p>${assignedTo}</p>`;
  }
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
