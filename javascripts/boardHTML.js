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
