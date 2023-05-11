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
  <div class="task-card" id="${cardID}" onclick="openTaskCard(${i}, '${cardID}')">
    <div
      class="category-label"
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

function openTaskCard(i, cardID) {
  console.log(cardID);
  document.getElementById(cardID).innerHTML = openTaskCardHTML(i);
}

function openTaskCardHTML(i) {
  return `<div class="task-card" id="${tasks[i]["status"]}${i}">
  <div class="category-label" style="background-color: ${renderCategoryLabelColor(
    i
  )};">
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
