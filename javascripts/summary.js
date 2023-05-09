function startSummary() {
    includeHTML()
    greet()
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
