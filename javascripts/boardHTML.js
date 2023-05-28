function taskCardHTML(i, cardID) {
  return `
  <div draggable="true" ondragstart="startDragging(${i})"  class="task-card" id="${cardID}" onclick="openTaskCard(${i}, '${cardID}')">
    <div class="categoryHeader">
      <div class="category-label"
        style="background-color: ${renderCategoryLabelColor(i)};">
        ${tasks[i]["category"][0].toUpperCase() + tasks[i]["category"].slice(1)}
      </div>
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
  return /* html */ `
    <div class="task-card-big" id="${cardID}">
      <div class="category-label-big" style="background-color: ${renderCategoryLabelColor(
        i
      )};">
        ${tasks[i]["category"][0].toUpperCase() + tasks[i]["category"].slice(1)}
      </div>
      <div class="task-title-big">${tasks[i]["title"]}</div>
      <div class="task-description-big">${renderTaskDescription(i)}</div>
      <div class="due-date"><b>Due date:</b> ${tasks[i]["dueDate"]}</div>
      <div class="task-card-priority"><b>Priority:</b> <img src="${renderUrgencyLabel(
        i
      )}" /></div>
      <p><b>Assigned To:</b></p>
      <div id="assignedTo-container"></div>
      <div class="open-task-buttons">
        <div class="delete-button" onclick="deleteCard(${i}, '${cardID}')">
          <img src="assets/icons/delete_black.png" />
        </div>
        <div class="edit-button" onclick="editTaskCard(${i})"><img src="assets/icons/Pencil_icon.png" /></div>
      </div>
      <img src="assets/icons/arrow-left-black.png" class="task-card-arrow" onclick="closeSlideInBtn()">
      <img src="assets/icons/clear.png" class="task-card-closeBtn" onclick="closeSlideInBtn()">

    </div>
  `;
}

function editTaskCardHTML() {
  return /* html */ `
      <div class="task-section-edit">
            <div>
              <p>Title</p>
              <input required id="addTaskTitle" placeholder="Enter a title" />
            </div>
            <div>
              <p>Description</p>
              <textarea
                required
                id="addTaskDescription"
                placeholder="Enter a Description"
                style="resize: none"
              ></textarea>
            </div>
            <div>
              <p>Due date</p>
              <input
                required
                id="date"
                class="input pointer"
                type="date"
                value="dd/mm/yyyy"
              />
            </div>
            <div>
              <p>Prio</p>
              <div class="prio-section">
                <div
                  id="urgentTask"
                  onclick="setPrio('urgent')"
                  class="prio-btn pointer"
                >
                  Urgent <img id="urgentIcon" src="assets/icons/urgent.png" />
                </div>
                <div
                  id="mediumTask"
                  onclick="setPrio('medium')"
                  class="prio-btn pointer"
                >
                  Medium <img id="mediumIcon" src="assets/icons/medium.png" />
                </div>
                <div
                  id="lowTask"
                  onclick="setPrio('low')"
                  class="prio-btn pointer"
                >
                  Low <img id="lowIcon" src="assets/icons/low.png" />
                </div>
              </div>
            </div>
            <div>
              <p>Assigned to</p>
              <div class="content">
                <div
                  onclick="openDropdownContacts()"
                  id="selectContact"
                  class="selectContainer"
                >
                  Select contacts to assign
                </div>
                <div class="expand-container">
                  <div id="selectContactDropdown"></div>
                </div>
                <div id="chosenContacts" class="chosenContactsEdit"></div>
              </div>
            </div>
            <div class="edit-okBtn">Ok <img src="assets/icons/checkmark-white-small.png"></div>
        
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

function slideInHTML(status) {
  return `
      <div id="slideInContainer" class="task-form">
        <div class="task-head">
          <h1>Add Task</h1>
          <img class="pointer" src="assets/icons/clear.png" onclick="closeSlideInBtn()" />
        </div>
        <form onsubmit="event.preventDefault(); createTask('${status}')">
        <div class="task-section form-section-mobile">
          <div class="content-left">
            <div>
              <p>Title</p>
              <input required id="addTaskTitle" placeholder="Enter a title" />
            </div>
            <div>
              <p>Description</p>
              <textarea required
                id="addTaskDescription"
                placeholder="Enter a Description"
                style="resize: none"
              ></textarea>
            </div>
            <div>
              <p>Category</p>
              <div class="content">
                <div
                  onclick="openDropdownCategory()"
                  id="addTaskCategory"
                  class="selectContainer"
                >
                  Select task Category
                </div>
                <div class="expand-container">
                  <div id="categoryDropdown">
                    <div onclick="selectOptionCategory()" class="option">
                      New Category
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div>
              <p>Assigned to</p>
              <div class="content">
                <div
                  onclick="openDropdownContacts()"
                  id="selectContact"
                  class="selectContainer"
                >
                  Select contacts to assign
                </div>
                <div class="expand-container">
                  <div id="selectContactDropdown"></div>
                </div>
                <div
                  id="chosenContacts"
                  class="chosenContacts chosenContactsForm"
                ></div>
              </div>
            </div>
          </div>

          <div class="content-right mobile-form-right">
            <div>
              <p>Due date</p>
              <input
                required
                id="date"
                class="input pointer"
                type="date"
                value="dd/mm/yyyy"
              />
            </div>
            <div>
              <p>Prio</p>
              <div class="prio-section">
                <div
                  id="urgentTask"
                  onclick="setPrio('urgent')"
                  class="prio-btn pointer"
                >
                  Urgent <img id="urgentIcon" src="assets/icons/urgent.png" />
                </div>
                <div
                  id="mediumTask"
                  onclick="setPrio('medium')"
                  class="prio-btn pointer"
                >
                  Medium <img id="mediumIcon" src="assets/icons/medium.png" />
                </div>
                <div
                  id="lowTask"
                  onclick="setPrio('low')"
                  class="prio-btn pointer"
                >
                  Low <img id="lowIcon" src="assets/icons/low.png" />
                </div>
              </div>
            </div>
            <!-- <div>
              <p>Subtasks</p>
              <input
                id="addTaskSubtask"
                class="input"
                type="text"
                placeholder="Add new subtask"
              />
              <div class="new-subtask">
                <input type="checkbox" />
                <p>Subtask 1</p>
              </div>
            </div> -->
          </div>
        </div>

        <div class="button-container-form">
          <button type="button" onclick="resetValues()" class="clear-btn pointer">
            Clear &nbsp; x
          </button>
          <button type="submit"
            id="createTaskBtn"
            class="create-btn pointer"
          >
            Create Task <img src="assets/icons/check-white.png" />
          </button>
        </div>
</form>
        <div id="taskAdded" class="taskAdded">
        Task added to board &nbsp; <img src="assets/icons/board-icon.svg" />
      </div>
      </div>
  `;
}
