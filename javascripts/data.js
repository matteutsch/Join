let contacts = [{
    'name':'Anton Mayer',
    'initials':'AM',
    'email':'antom@gmail.com',
},{
    'name':'Anja Schulz',
    'initials':'AS',
    'email':'schulz@hotmail',
},{
    'name':'Benedikt Ziegler',
    'initials':'BZ',
    'email':'benedikt@gmail',
},{
    'name':'David Eisenberg',
    'initials':'DE',
    'email':'davidberg@gmail',
}]

let state = ['To Do','In Progress','Awaiting Feedback','Done']
let cat = ['Design','Sales','Backoffice','Marketing','Media']
let prio = ['urgent','medium','low']

let tasks = [{
    'titel':'',
    'description':'',
    'status': state[0],
    'category':cat[1],
    'priority':prio[2],
    'subtasks':[],
    'dueDate':'',
    'assignedTo':[contacts[0],contacts[2],contacts[3]]
},{
    'titel':'',
    'description':'',
    'status': state[2],
    'category':cat[4],
    'priority':prio[0],
    'subtasks':[],
    'dueDate':'',
    'assignedTo':[contacts[2],contacts[3],contacts[4]]
}]


// Generate Greeting according to daytime after 1.2 seconds
setInterval(function () {
    let date = new Date();
    let hours = date.getHours();
    let greeting;
    if (hours < 12) {
        greeting = 'Good morning,';
    } else if (hours >= 12 && hours < 17) {
        timeOfDay = 'Good afternoon,';
    } else {
        greeting = 'Good evening, ';
    }
    document.getElementById('greeting').innerHTML = timeOfDay, ',';
}, 1200);