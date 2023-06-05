/**
 * Calls all functions for summary card
 */
async function startSummary() {
    includeHTML();
    greet();
    getDataForSummary();
    taskWithEarliestDuedate();
    tasksAsJSON = await getRemoteData("tasksRemote");
}

/**
 * Changes greeting according to the time of day
 */
function greet() {
    let date = new Date();
    let hours = date.getHours();
    let timeOfDay;
    if (hours < 12) {
        timeOfDay = "Good morning,";
    } else if (hours >= 12 && hours < 17) {
        timeOfDay = "Good afternoon,";
    } else {
        timeOfDay = "Good evening,";
    }

    let element = document.getElementById("greeting");
    let property = window.getComputedStyle(element).getPropertyValue("display");

    if (property !== "none") {
        document.getElementById("greetingText").innerHTML = timeOfDay;
        document.getElementById("greetingName").innerHTML = 'Noch anpassen' /* aktiveContact.name; */
    } else {
        document.getElementById("greetingText2").innerHTML = timeOfDay;
        document.getElementById("greetingName2").innerHTML = 'Noch anpassen' /* aktiveContact.name; */
    }
}

/**
 * Sumes up tasks per category and urgency per priority
 */

async function getDataForSummary() {

    let res = await getItem("tasksRemote");
    remoteTasksAsJSON = await JSON.parse(res.data.value.replace(/'/g, '"'));
    console.log(remoteTasksAsJSON);

    document.getElementById("tasksInBoard").innerHTML = remoteTasksAsJSON.length;

    let tasksInProgress = remoteTasksAsJSON.filter((task) => task.status === "inProgress");
    document.getElementById("tasksInProgress").innerHTML = tasksInProgress.length;

    let tasksAwaitingFeedback = remoteTasksAsJSON.filter(
        (task) => task.status === "awaitingFeedback"
    );
    document.getElementById("tasksAwaitingFeedback").innerHTML =
        tasksAwaitingFeedback.length;

    let sumToDo = remoteTasksAsJSON.filter((task) => task.status === "todo");
    document.getElementById("sumToDo").innerHTML = sumToDo.length;

    let sumDone = remoteTasksAsJSON.filter((task) => task.status === "done");
    document.getElementById("sumDone").innerHTML = sumDone.length;

    let sumUrgent = remoteTasksAsJSON.filter((task) => task.priority === "urgent");
    document.getElementById("sumUrgent").innerHTML = sumUrgent.length;
}

/**
 * Shows earliest due date of tasks with category='urgent'
 */
async function taskWithEarliestDuedate() {
    let res = await getItem("tasksRemote");
    remoteTasksAsJSON = await JSON.parse(res.data.value.replace(/'/g, '"'));
    console.log(remoteTasksAsJSON);

    let earliestDate = ['2021-06-04'];
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

function jumpToBoard() {
    window.location.href = "board.html";
}

/* returns the whole contact */
/* function returnAssignedContact(i) {
      for (let j = 0; j < assignedContacts.length; j++) {
            if (contacts[i][name] === assignedContacts[j][name]) {
              return assignedContacts[j]
              }   
      }
  } */

/**
 * Shows and removes both overlay container and greeting container
 */
// Waits until document in loaded
document.addEventListener("DOMContentLoaded", function() {
    var overlay = document.querySelector(".overlay");

    // Adds class "show" to make the overlay container visible
    overlay.classList.add("show");

    // Removes the class "show" after 2 seconds to make the overlay container invisible
    setTimeout(function() {
        overlay.classList.remove("show");
    }, 2000);

    var greeting = document.querySelector(".greeting");

    // Adds class "show" to make the overlay container visible
    greeting.classList.add("show");

    // Removes the class "show" after 2 seconds to make the overlay container invisible
    setTimeout(function() {
        greeting.classList.remove("show");
    }, 1000);
});