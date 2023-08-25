/**
 * Checks whether the isActive flag variable already exists in sessionStorage.
 * If not, sets it to true.
 */
let isActive = sessionStorage.getItem("isActive");

isActive = isActive === null ? true : JSON.parse(isActive);

/**
 * Calls all functions for the summary card.
 * @returns {Promise} A Promise that resolves when the summary initialization is completed.
 */
async function startSummary() {
  includeHTML("summaryMenu");
  getDataForSummary();
  taskWithEarliestDuedate();
  tasksAsJSON = await getRemoteData("tasksRemote");
  if (!isActive && window.innerWidth < 670) {
    return;
  }
  greet();
  isActive = false;
  sessionStorage.setItem("isActive", JSON.stringify(isActive));
}

/**
 * Changes the greeting according to the time of day.
 */
async function greet() {
  let date = new Date();
  let hours = date.getHours();
  let timeOfDay;

  if (hours < 12) {
    timeOfDay = "Good morning,";
  } else if (hours < 17) {
    timeOfDay = "Good afternoon,";
  } else {
    timeOfDay = "Good evening,";
  }

  let element = document.getElementById("greeting");
  let property = window.getComputedStyle(element).getPropertyValue("display");

  let currentUserName = (
    await JSON.parse(
      (await getItem("currentUserName")).data.value.replace(/'/g, '"')
    )
  ).name;

  document.getElementById("greetingText").innerHTML = timeOfDay;
  document.getElementById("greetingName").innerHTML = currentUserName;

  document.getElementById("greetingText2").innerHTML = timeOfDay;
  document.getElementById("greetingName2").innerHTML = currentUserName;
}

/**
 * Retrieves data for the summary card, including task counts per category and urgency per priority.
 * @returns {Promise} A Promise that resolves when the data retrieval is completed.
 */
async function getDataForSummary() {
  let res = await getItem("tasksRemote");
  let remoteTasksAsJSON = JSON.parse(res.data.value.replace(/'/g, '"'));

  document.getElementById("tasksInBoard").innerHTML = remoteTasksAsJSON.length;
  document.getElementById("tasksInProgress").innerHTML = getCountByStatus(
    remoteTasksAsJSON,
    "inProgress"
  );
  document.getElementById("tasksAwaitingFeedback").innerHTML = getCountByStatus(
    remoteTasksAsJSON,
    "awaitingFeedback"
  );
  document.getElementById("sumToDo").innerHTML = getCountByStatus(
    remoteTasksAsJSON,
    "todo"
  );
  document.getElementById("sumDone").innerHTML = getCountByStatus(
    remoteTasksAsJSON,
    "done"
  );
  document.getElementById("sumUrgent").innerHTML = getCountByPriority(
    remoteTasksAsJSON,
    "urgent"
  );
}

/**
 * Retrieves the count of tasks with a specific status.
 * @param {Array} tasks - The array of tasks.
 * @param {string} status - The status to count.
 * @returns {number} The count of tasks with the specified status.
 */
function getCountByStatus(tasks, status) {
  return tasks.filter((task) => task.status === status).length;
}

/**
 * Retrieves the count of tasks with a specific priority.
 * @param {Array} tasks - The array of tasks.
 * @param {string} priority - The priority to count.
 * @returns {number} The count of tasks with the specified priority.
 */
function getCountByPriority(tasks, priority) {
  return tasks.filter((task) => task.priority === priority).length;
}

/**
 * Shows the earliest due date among tasks with category 'urgent'.
 * @returns {Promise} A Promise that resolves when the earliest due date is displayed.
 */
async function taskWithEarliestDuedate() {
  let res = await getItem("tasksRemote");
  remoteTasksAsJSON = await JSON.parse(res.data.value.replace(/'/g, '"'));

  let earliestDate = ["2021-06-04"];
  for (let i = 0; i < remoteTasksAsJSON.length; i++) {
    if (remoteTasksAsJSON[i].priority == "urgent") {
      let currentDate = remoteTasksAsJSON[i].dueDate;
      if (currentDate > earliestDate) {
        earliestDate = currentDate;
      }
    }
    let d1 = new Date(earliestDate);
    let d2 = d1.toLocaleDateString("en-US", {
      month: "long",
      day: "numeric",
      year: "numeric",
    });
    document.getElementById("dateDeadline").innerHTML = d2;
  }
}

/**
 * Redirects to the board page.
 */
function jumpToBoard() {
  window.location.href = "board.html";
}

/**
 * Waits until the document is loaded and executes specific actions.
 */
document.addEventListener("DOMContentLoaded", function () {
  if (!isActive) {
    return;
  }
  let overlay = document.querySelector(".overlay");
  overlay.classList.add("show");

  setTimeout(function () {
    overlay.classList.remove("show");
  }, 2000);

  let greeting = document.querySelector(".greeting");
  greeting.classList.add("show");

  setTimeout(function () {
    greeting.classList.remove("show");
  }, 1000);
});
