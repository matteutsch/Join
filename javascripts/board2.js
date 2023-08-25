/**
 * Closes the slide-in container and the task layer.
 */
function closeSlideInBtn() {
  closeSlideInContainer();
  closeLayer();
  closeTaskCardBig();
  document.body.style.overflow = "auto";
}

/**
 * Closes the slide-in container.
 */
function closeSlideInContainer() {
  let slideInContainer = document.getElementById("slideInContainer");
  let taskLayer = document.getElementById("taskLayer");
  taskLayer.style.zIndex = "103";
  if (slideInContainer) {
    slideInContainer.style.transform = "translateX(200%)";
  }
}

/**
 * Closes the task card in the task layer.
 */
function closeTaskCardBig() {
  let taskCardBig = document.querySelector(".task-card-big");
  if (taskCardBig) {
    taskCardBig.style.display = "none";
  }
}

/**
 * Closes the task layer and performs necessary cleanup.
 */
function closeLayer() {
  let layer = document.getElementById("taskLayer");
  setTimeout(() => {
    layer.style.display = "none";
  }, 200),
    layer.removeEventListener("click", displayLayer);
  subtaskCount = 0;
  assignedContactNames = [];
}

/**
 * Displays the slide-in container for a specific status.
 * @param {string} status - The status of the tasks in the container.
 */
function slideInContainer(status) {
  displayLayer();
  let taskLayer = document.getElementById("taskLayer");
  taskLayer.style.zIndex = "1000";
  taskLayer.innerHTML = slideInHTML(status);
  setTimeout(() => {
    let slideInContainer = document.getElementById("slideInContainer");
    slideInContainer.style.display = "flex";
    slideInContainer.style.transform = "translateX(0%)";
  }, 100);
  addContactNamesToAssignedTo();
  addCategories();
  addSubtaskEventListener();
  document.body.style.overflow = "hidden";
}
document.addEventListener("input", function (event) {
  if (event.target.id === "searchInput") {
    filterCards();
  }
});

/**
 * Filters task cards based on the search input value.
 */
function filterCards() {
  let query = document.getElementById("searchInput").value.toLowerCase();
  let cards = document.querySelectorAll(".task-card");

  cards.forEach((card) => {
    let header = card.querySelector(".task-title").innerHTML.toLowerCase();
    let description = card
      .querySelector(".task-description")
      .innerHTML.toLowerCase();
    if (header.includes(query) || description.includes(query)) {
      card.style.display = "flex";
    } else {
      card.style.display = "none";
    }
  });
}

/**
 * Counts the number of done subtasks for a task at the given index.
 * @param {number} i - The index of the task.
 * @returns {number} The count of done subtasks.
 */
function countDoneSubtasks(i) {
  let doneSubtasks = remoteTasksAsJSON[i]["subtasks"].filter(
    (subtask) => subtask.status === "done"
  );
  let doneSubtasksCount = doneSubtasks.length;
  return doneSubtasksCount;
}

/**
 * Renders the progress of a task at the given index.
 * @param {number} i - The index of the task.
 * @returns {number} The progress percentage.
 */
function renderProgress(i) {
  let doneCount = countDoneSubtasks(i);
  let subtaskLength = remoteTasksAsJSON[i]["subtasks"].length;
  let percentage = (doneCount / subtaskLength) * 100;
  if (subtaskLength == 0) {
    return 0;
  } else {
    return percentage;
  }
}

/**
 * Starts dragging a task card with the specified index.
 * @param {number} i - The index of the task.
 */
function startDragging(i) {
  currentDraggedElement = i;
}

/**
 * Moves a task card to the specified status.
 * @param {string} status - The status to move the task to.
 */
async function moveTo(status) {
  remoteTasksAsJSON[currentDraggedElement]["status"] = status;
  await setItem("tasksRemote", remoteTasksAsJSON);
  remoteTasksAsJSON = await getRemoteData("tasksRemote");
  initBoard();
  removeHighlight(status);
}

/**
 * Allows dropping of elements during drag and drop.
 * @param {Event} ev - The dragover event object.
 */
function allowDrop(ev) {
  ev.preventDefault();
}

/**
 * Highlights the status container with the specified ID.
 * @param {string} id - The ID of the status container.
 */
function highlight(id) {
  let container = document.getElementById(id);
  container.style.transition = "background-color 0.5s";
  container.style.backgroundColor = "#d1d1d1";
}

/**
 * Removes the highlight from the status container with the specified ID.
 * @param {string} id - The ID of the status container.
 */
function removeHighlight(id) {
  let container = document.getElementById(id);
  container.style.transition = "background-color 0.5s";
  container.style.backgroundColor = "#f6f7f8";
}

/**
 * Highlights all status containers.
 */
function highlightAll() {
  let statusContainers = document.querySelectorAll(".statusContainer");
  statusContainers.forEach((container) => {
    container.style.border = "1px dashed black";
    container.style.transition = "border 0.5s";
  });
}

/**
 * Removes the highlight from all status containers.
 */
function removeHighlightAll() {
  let statusContainers = document.querySelectorAll(".statusContainer");
  if (statusContainers) {
    statusContainers.forEach((container) => {
      container.style.border = "none";
      container.style.transition = "none";
    });
  }
}

/**
 * Toggles the visibility of a dropdown menu.
 * @param {Event} event - The click event object.
 * @param {number} i - The index of the dropdown.
 */
function toggleDropdown(event, i) {
  event.stopPropagation();
  let dropdownContent = document.getElementById(`dropdown-content${i}`);
  dropdownContent.style.transition = "opacity 0.3s ease";
  if (
    dropdownContent.style.display === "" ||
    dropdownContent.style.display === "none"
  ) {
    dropdownContent.style.opacity = "0";
    dropdownContent.style.display = "block";
    setTimeout(() => {
      dropdownContent.style.opacity = "1";
    }, 10);
  } else {
    dropdownContent.style.opacity = "0";
    dropdownContent.style.display = "none";
  }
  function hideDropdown(event) {
    if (!event.target.closest(".container")) {
      dropdownContent.style.opacity = "0";
      dropdownContent.style.display = "none";
      document.removeEventListener("click", hideDropdown);
    }
  }
  if (dropdownContent.style.display === "block") {
    document.addEventListener("click", hideDropdown);
  }
}

/**
 * Selects an option from the dropdown menu and performs the associated action.
 * @param {Event} event - The click event object.
 * @param {number} option - The selected option index.
 * @param {number} i - The index of the task.
 * @param {string} status - The status to set for the task.
 */
async function selectOption(event, option, i, status) {
  event.stopPropagation();
  let dropdownBtn = document.getElementById(`dropdown-btn${option}`);
  let taskContainer = remoteTasksAsJSON[i];
  dropdownBtn.classList.remove("highlighted");

  if (option >= 1 && option <= 4) {
    dropdownBtn.classList.add("highlighted");
    taskContainer["status"] = status;
    await setItem("tasksRemote", remoteTasksAsJSON);
    await initBoard();
  }
}

/**
 * Toggles the visibility of the dropdown buttons based on the window width.
 */
function toggleButtonVisibility() {
  let buttons = document.querySelectorAll(".dropdown-btn");
  buttons.forEach((button) => {
    if (window.innerWidth < 671) {
      button.style.display = "block";
    } else {
      button.style.display = "none";
    }
  });
}

window.addEventListener("resize", toggleButtonVisibility);
