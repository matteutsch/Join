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
    const taskContainer = document.getElementById(container);
    const task = tasks[i];
    if (task["status"] === status) {
      taskContainer.innerHTML += taskCardHTML(i);
    }
  }
}

function taskCardHTML(i) {
  return `<div class="task-card">
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
