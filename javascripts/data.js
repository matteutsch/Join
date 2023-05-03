let contacts = [{
    'name':'Anton Mayer',
    'initials':'AM',
    'email':'antom@gmail.com',
},{
    'name':'Anton Mayer',
    'initials':'AM',
    'email':'antom@gmail.com',
}]

let tasks = [{
    'titel':'',
    'description':'',
    'status':['To Do','In Progress','Awaiting Feedback','Done'],
    'category':['Design','Sales','Backoffice','Marketing','Media'],
    'subtasks':[],
    'dueDate':'',
    'priority':['urgent','medium','low'],
    'assignedTo':[],
},{
    'titel':'',
    'description':'',
    'status':['To Do','In Progress','Awaiting Feedback','Done'],
    'category':['Design','Sales','Backoffice','Marketing','Media'],
    'subtasks':[],
    'dueDate':'',
    'priority':['urgent','medium','low'],
    'assignedTo':[],
}]


// Generate Greeting according to daytime
setInterval(function () {
    let date = new Date();
    let hours = date.getHours();
    let greeting;
    if (hours < 12) {
        greeting = 'Good Morning,';
    } else if (hours >= 12 && hours < 17) {
        timeOfDay = 'Good afternoon,';
    } else {
        greeting = 'Good evening, ';
    }
    document.getElementById('greeting').innerHTML = timeOfDay, ',';
}, 1000);