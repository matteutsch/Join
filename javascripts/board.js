function initBoard() {
  renderTaskCards("todoContainer");
  renderTaskCards("inProgressContainer");
  renderTaskCards("feedbackContainer");
  renderTaskCards("doneContainer");
}

function renderCategoryLabel(i) {
  let category = tasks[i]["category"];
  let labelColor = categoryColor[0][category];
  return labelColor;
}

function renderTaskCards(container) {
  for (let i = 0; i < tasks.length; i++) {
    const taskContainer = document.getElementById(container);
    taskContainer.innerHTML += taskCardHTML(i);
  }
}

function taskCardHTML(i) {
  return ` <div class="task-card">
    <div
      class="category-label"
      style="background-color: ${renderCategoryLabel(i)};">Sales</div>
    <div class="task-title">${tasks[i]["title"]}</div>
    <div class="task-description">
      Make the product presentation to prospective buyers
    </div>
    <div class="task-bottom">
      <div class="assignedTo-container">DE</div>
      <div class="task-urgency-container">
        <img src="assets/icons/urgent.png" />
      </div>
    </div>
  </div>`;
}
