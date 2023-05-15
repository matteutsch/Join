function startSummary() {
    includeHTML()
    greet()
    getDataForSummary()
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
    document.getElementById("greetingText").innerHTML = timeOfDay;
}

/**
 * Sumes up tasks per category and urgency per priority
 */
function getDataForSummary() {
  document.getElementById('tasksInBoard').innerHTML = tasks.length;

  let tasksInProgress = tasks.filter((task) => task.status === "todo");
  document.getElementById('tasksInProgress').innerHTML = tasksInProgress.length;

  let tasksAwaitingFeedback = tasks.filter((task) => task.status === "awaiting-feedback");
  document.getElementById('tasksAwaitingFeedback').innerHTML = tasksAwaitingFeedback.length;

  let sumToDo = tasks.filter((task) => task.status === "todo");
  document.getElementById('sumToDo').innerHTML = sumToDo.length;

  let sumDone = tasks.filter((task) => task.status === "done");
  document.getElementById('sumDone').innerHTML = sumDone.length;

  let sumUrgent = tasks.filter((task) => task.priority === "urgent");
  document.getElementById('sumUrgent').innerHTML = sumUrgent.length;

  let deadlines = tasks.filter((task) => task.dueDate === true);
  console.log(deadlines);
/*   document.getElementById('dateDeadline').innerHTML = sumUrgent.length;
 */


  
}