let contacts = [{
        "name": "Anton Mayer",
        "color": "#0223CF",
        "email": "antom@gmail.com",
        "phone": "+49 2812830213",
    },
    {
        "name": "Anja Schulz",
        "color": "#CB02CF",
        "email": "schulz@hotmail",
        "phone": "+49 2812830213",
    },
    {
        "name": "Benedikt Ziegler",
        "color": "#FFA800",
        "email": "benedikt@gmail",
        "phone": "+49 2812830213",
    },
    {
        "name": "David Eisenberg",
        "color": "#9327FF",
        "email": "davidberg@gmail",
        "phone": "+49 2812830213",
    },
    {
        "name": "Elena Schmidt",
        "color": "#02CF2F",
        "email": "elena.schmidt@gmail.com",
        "phone": "+49 2812830213",
    },
    {
        "name": "Fabian Fischer",
        "color": "#EE00D6",
        "email": "fabian.fischer@hotmail.com",
        "phone": "+49 2812830213",
    },
    {
        "name": "Gabriele Wagner",
        "color": "#0190E0",
        "email": "gabriele.wagner@gmail.com",
        "phone": "+49 2812830213",
    },
    {
        "name": "Hans Müller",
        "color": "#FF5C00",
        "email": "hans.mueller@hotmail.com",
        "phone": "+49 2812830213",
    },
    {
        "name": "Ines Bauer",
        "color": "#4E963D",
        "email": "ines.bauer@gmail.com",
        "phone": "+49 2812830213",
    },
    {
        "name": "Johannes Mayer",
        "color": "#32DAFF",
        "email": "johannes.mayer@hotmail.com",
        "phone": "+49 2812830213",
    },
    {
        "name": "Katrin Schuster",
        "color": "#9327FF",
        "email": "katrin.schuster@gmail.com",
        "phone": "+49 2812830213",
    },
    {
        "name": "Lena Wagner",
        "color": "#EE00D6",
        "email": "lena.wagner@hotmail.com",
        "phone": "+49 2812830213",
    }
];

let n = 1;
let aktiveContact = contacts[n];

let tasks = [{
        title: "Call potential clients",
        description: "Make the product presentation to prospective buyers",
        status: "todo",
        category: "sales",
        priority: "urgent",
        subtasks: [],
        dueDate: "2022-08-15",
        assignedTo: [contacts[0], contacts[2], contacts[3]],
    },
    {
        title: "Organize Financial Records",
        description: "Review and organize financial records, including invoices, receipts, and expense reports, to ensure accurate bookkeeping and easy retrieval for auditing purposes",
        status: "todo",
        category: "backoffice",
        priority: "urgent",
        subtasks: [],
        dueDate: "2022-08-16",
        assignedTo: [contacts[6], contacts[4], contacts[8]],
    },
    {
        title: "Update website design",
        description: "",
        status: "inProgress",
        category: "design",
        priority: "medium",
        subtasks: [],
        dueDate: "2022-06-30",
        assignedTo: [contacts[1], contacts[4], contacts[5]],
    },
    {
        title: "Review project proposal",
        description: "Review the project proposal and provide feedback",
        status: "awaitingFeedback",
        category: "marketing",
        priority: "low",
        subtasks: [],
        dueDate: "2022-07-15",
        assignedTo: [contacts[6], contacts[7], contacts[8]],
    }
];

let categories = [{
        name: "sales",
        color: "#FC71FF",
    },
    {
        name: "backoffice",
        color: "#1FD7C1",
    },
    {
        name: "marketing",
        color: "#0038FF",
    },
    {
        name: "design",
        color: "#FF7A00",
    },
    {
        name: "media",
        color: "#FF0000",
    },
];

/* ***************************************************************** */

function getInitials(name) {
    let initials = "";
    let splitted_name = name.split(" ");

    if (splitted_name.length > 0 && splitted_name[0].length > 0) {
        initials += splitted_name[0].charAt(0);
    }

    if (splitted_name.length > 1 && splitted_name[1].length > 0) {
        initials += splitted_name[1].charAt(0);
    }
    return initials;
}

/* ****************************************************************+ */

/* Token Generator: https://remote-storage.developerakademie.org/token-generator */

let test2;
let test3 = [34, 35];
let test4 = [];
let erg;
let testX = [];
let storageArray;


const STORAGE_TOKEN = "HT0S0N13Y0K6B2YIWFIVXQ2L8P2T85JJ2LNGCLH0";
const STORAGE_URL = "https://remote-storage.developerakademie.org/item";

async function setItem(key, value) { // ("contacts", contacts) or ("tasks", tasks)  or ("activeContact", activeContact)
    const payload = { key, value, token: STORAGE_TOKEN };
    return fetch(STORAGE_URL, { method: "POST", body: JSON.stringify(payload) })
        .then(res => res.json()); // response in converted in JSON 
}

async function getItem(key) { // ("contacts",contacts) or ("tasks", tasks)  or ("activeContact", aktiveContact)
    const url = `${STORAGE_URL}?key=${key}&token=${STORAGE_TOKEN}`;
    let res2 = await fetch(url).then(res => res.json()); // response in converted in JSON
    let dataString = await res2.data.value;
    let data = await dataString.replace(/'/g, '"');
    testX = await JSON.parse(data);
    storageArray = testX;

    console.log(storageArray);

    /* console.log(erg[0].name);
    console.log(erg[1]['color']);
    document.getElementById('dataString').innerHTML = dataString;
    document.getElementById('data').innerHTML = data; */


    document.getElementById('singleData').innerHTML = storageArray;
    /* document.getElementById('singleData').innerHTML = erg[0].name; */
}

/* ******************************************************************** */


async function change() {
    let n = document.getElementById('input').value;
    testX.push(n);
    /* setItem('test4', test4); */
}