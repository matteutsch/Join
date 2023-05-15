function startSummary() {
    includeHTML()
    greet()
    getDataForSummary()
    taskWithEarliestDuedate()
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
}

/**
 * Find the task with the earliest dueDate froms tasks
*/ 
function taskWithEarliestDuedate(){
  earliestDate = [3000]
  for (let i = 0; i < tasks.length; i++) {
    if(tasks[i].priority == 'urgent') {
      let currentDate = tasks[i].dueDate;
      if(currentDate < earliestDate){
        earliestDate = currentDate;
      }
    }
  let d1 = new Date(earliestDate);
  let d2 = d1.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric'});
  document.getElementById('dateDeadline').innerHTML = d2;
  }
}