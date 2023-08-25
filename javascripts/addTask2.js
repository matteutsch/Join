
/**
 * Removes a contact from the chosenContacts container.
 * @param {number} i - The index of the contact.
 * @param {string} contactName - The name of the contact.
 */
function removeFromChosenContacts(i, contactName) {
    let chosenContacts = document.getElementById("chosenContacts");
    let contactInitials = getInitials(contactName);
    let chosenContact = chosenContacts.querySelector(
      `.chosenContactInitials[onclick*="removeContact(${i})"]`
    );
    if (chosenContact) {
      chosenContact.remove();
    }
  }
  
  /**
   * Shows the assigned contact again in the selectContactDropdown.
   * @param {string} assignedContactID - The ID of the assigned contact.
   */
  function recoverAssignedContact(assignedContactID) {
    let assignedContact = document.getElementById(assignedContactID);
    if (assignedContact) {
      assignedContact.classList.remove("d-none");
    }
  }
  
  /**
   * Deletes a contact from the assignedContacts array.
   * @param {number} i - The index of the contact.
   */
  function deleteFromAssignedContacts(i) {
    let contactName = contacts[i]["name"];
    let index = assignedContacts.findIndex((obj) => obj.name === contactName);
    if (index > -1) {
      assignedContacts.splice(index, 1);
    }
  }
  
  /**
   * Displays a popup message for a successful task addition or missing information alert.
   * @param {string} change - The type of message to display ("alert" for missing information, undefined for successful task addition).
   */
  function taskPopup(change) {
    let success = document.getElementById("taskAdded");
    if (change == alert) {
      success.innerHTML = `Please fill missing informations`;
    } else {
      success.innerHTML = `Task added to board &nbsp; <img src="assets/icons/board-icon.svg" />`;
    }
    success.style.display = "block";
    setTimeout(function () {
      success.style.display = "none";
    }, 2000);
  }
  
  /**
   * Sets the minimum date for the due date input field to today.
   */
  function setMinDate() {
    let date = new Date();
    let year = date.getFullYear();
    let month = date.getMonth() + 1;
    let minMonth = `0${month}`;
    let day = date.getDate();
    let minDay = `0${day}`;
    let today = document.getElementById("date");
    if (month < 10) {
      month = minMonth;
    }
    if (day < 10) {
      day = minDay;
    }
    today.min = `${year}-${month}-${day}`;
  }
  
  /**
   * Adds an event listener to the addTaskSubtask input field to show or hide the subtask buttons.
   */
  function addSubtaskEventListener() {
    let inputField = document.getElementById("addTaskSubtask");
    let container = document.getElementById("subtask-buttons");
  
    inputField.addEventListener("focus", () => {
      container.style.display = "flex";
    });
  
    inputField.addEventListener("blur", () => {
      setTimeout(() => {
        container.style.display = "none";
      }, 100);
    });
  }
  
  /**
   * Creates a new subtask based on the value entered in the addTaskSubtask input field.
   */
  function createNewSubtask() {
    let inputField = document.getElementById("addTaskSubtask");
    let subtaskContainer = document.getElementById("subtaskContainer");
  
    if (inputField.value) {
      subtaskContainer.innerHTML += subtaskHTML(inputField.value, subtaskID);
      subtaskID++;
      inputField.value = "";
    }
  }
  
  /**
   * Renders the subtasks for a specific task.
   * @param {number} taskID - The ID of the task.
   */
  function renderSubtask(taskID) {
    let subtaskContainer = document.getElementById("editSubtaskContainer");
  
    for (let i = 0; i < remoteTasksAsJSON[taskID]["subtasks"].length; i++) {
      let subtaskName = remoteTasksAsJSON[taskID]["subtasks"][i]["name"];
      let subtaskStatus = remoteTasksAsJSON[taskID]["subtasks"][i]["status"];
      subtaskContainer.innerHTML += subtaskHTML(
        subtaskName,
        taskID,
        subtaskStatus
      );
    }
  }
  
  /**
   * Pushes the subtasks to an array.
   * @returns {object[]} The array of subtasks.
   */
  function pushSubtasks() {
    let subtasks = document.querySelectorAll(".subtask");
    let subtaskArray = [];
    subtasks.forEach((subtask) => {
      let checkbox = subtask.querySelector("input[type='checkbox']");
      subtaskArray.push({
        name: subtask.textContent,
        status: isChecked(checkbox),
      });
    });
    return subtaskArray;
  }
  
  /**
   * Checks if a subtask checkbox is checked.
   * @param {HTMLInputElement} checkbox - The subtask checkbox.
   * @returns {string} The status of the subtask ("done" if checked, "inProgress" otherwise).
   */
  function isChecked(checkbox) {
    if (checkbox.checked) {
      return "done";
    } else {
      return "inProgress";
    }
  }
  
  /**
   * Checks if a subtask is checked.
   * @param {string} subtaskStatus - The status of the subtask.
   * @returns {boolean} True if the subtask is checked, false otherwise.
   */
  function isSubtaskChecked(subtaskStatus) {
    if (subtaskStatus === "done") {
      return true;
    }
    return false;
  }
  
  /**
   * Clears the value of the addTaskSubtask input field.
   */
  function emptySubtaskValue() {
    let inputField = document.getElementById("addTaskSubtask");
    inputField.value = "";
  }