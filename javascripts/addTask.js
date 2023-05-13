function setPrio(prio) {
  if (prio == "urgent") {
    document.getElementById("urgentTask").classList.add("urgent");
    document.getElementById("urgentIcon").src = "assets/icons/urgent_white.png";
    document.getElementById("mediumTask").classList.remove("medium");
    document.getElementById("mediumIcon").src = "assets/icons/medium.png";
    document.getElementById("lowTask").classList.remove("low");
    document.getElementById("lowIcon").src = "assets/icons/low.png";
  } else if (prio == "medium") {
    document.getElementById("mediumTask").classList.add("medium");
    document.getElementById("mediumIcon").src = "assets/icons/medium_white.png";
    document.getElementById("urgentTask").classList.remove("urgent");
    document.getElementById("urgentIcon").src = "assets/icons/urgent.png";
    document.getElementById("lowTask").classList.remove("low");
    document.getElementById("lowIcon").src = "assets/icons/low.png";
  } else if (prio == "low") {
    document.getElementById("lowTask").classList.add("low");
    document.getElementById("lowIcon").src = "assets/icons/low_white.png";
    document.getElementById("urgentTask").classList.remove("urgent");
    document.getElementById("urgentIcon").src = "assets/icons/urgent.png";
    document.getElementById("mediumTask").classList.remove("medium");
    document.getElementById("mediumIcon").src = "assets/icons/medium.png";
  }
}
