
let contacts = [
  {
    name: "Anton Mayer",
    initials: "AM",
    email: "antom@gmail.com",
  },
  {
    name: "Anja Schulz",
    initials: "AS",
    email: "schulz@hotmail",
  },
  {
    name: "Benedikt Ziegler",
    initials: "BZ",
    email: "benedikt@gmail",
  },
  {
    name: "David Eisenberg",
    initials: "DE",
    email: "davidberg@gmail",
  },
  {
    name: "Elena Schmidt",
    initials: "ES",
    email: "elena.schmidt@gmail.com",
  },
  {
    name: "Fabian Fischer",
    initials: "FF",
    email: "fabian.fischer@hotmail.com",
  },
  {
    name: "Gabriele Wagner",
    initials: "GW",
    email: "gabriele.wagner@gmail.com",
  },
  {
    name: "Hans Müller",
    initials: "HM",
    email: "hans.mueller@hotmail.com",
  },
  {
    name: "Ines Bauer",
    initials: "IB",
    email: "ines.bauer@gmail.com",
  },
  {
    name: "Johannes Mayer",
    initials: "JM",
    email: "johannes.mayer@hotmail.com",
  },
  {
    name: "Katrin Schuster",
    initials: "KS",
    email: "katrin.schuster@gmail.com",
  },
  {
    name: "Lena Wagner",
    initials: "LW",
    email: "lena.wagner@hotmail.com",
  },
];


let state = ["To Do", "In Progress", "Awaiting Feedback", "Done"];
let cat = ["Design", "Sales", "Backoffice", "Marketing", "Media"];
let prio = ["urgent", "medium", "low"];

const tasks = [
  {
    id: 1,
    title: "Call potential clients",
    description: "Make the product presentation to prospective buyers",
    status: "todo",
    category: "sales",
    priority: "urgent",
    subtasks: [],
    dueDate: "05-08-2022",
    assignedTo: [contacts[0]["name"], contacts[2]["name"], contacts[3]]["name"],
  },
  {
    id: 2,
    title: "Update website design",
    description: "",
    status: "in-progress",
    category: "design",
    priority: "medium",
    subtasks: [],
    dueDate: "06-30-2022",
    assignedTo: [contacts[1]["name"], contacts[4]["name"], contacts[5]]["name"],
  },
  {
    id: 3,
    title: "Review project proposal",
    description: "Review the project proposal and provide feedback",
    status: "awaiting-feedback",
    category: "marketing",
    priority: "low",
    subtasks: [],
    dueDate: "07-15-2022",
    assignedTo: [contacts[6]["name"], contacts[7]["name"], contacts[8]]["name"],
  },
  {
    id: 4,
    title: "Prepare quarterly report",
    description: "",
    status: "done",
    category: "backoffice",
    priority: "urgent",
    subtasks: [],
    dueDate: "04-30-2022",
    assignedTo: [contacts[7]["name"], contacts[8]["name"], contacts[9]]["name"],
  },
];

/* ***************************************************************** */

function getInitials(name) {
  let splitted_name = name.split(" ");
  let initials = splitted_name[0].charAt(0) + splitted_name[1].charAt(0);
  return initials;
}

/* ****************************************************************+ */

const STORAGE_TOKEN = "HT0S0N13Y0K6B2YIWFIVXQ2L8P2T85JJ2LNGCLH0";
const STORAGE_URL = "https://remote-storage.developerakademie.org/item";


async function setItem(key, value) {
  const payload = { key, value, token: STORAGE_TOKEN };
  return fetch(STORAGE_URL, {
    method: "POST",
    body: JSON.stringify(payload),
  }).then((res) => res.json());
}

async function getItem(key) {
  const url = `${STORAGE_URL}?key=${key}&token=${STORAGE_TOKEN}`;
  return fetch(url)
    .then((res) => res.json())
    .then((res) => res.data.value);
}


