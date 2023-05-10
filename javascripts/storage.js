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

let contacts = [
  {
    name: "Anton Mayer",
    initials: "AM",
    email: "antom@gmail.com",
    password: "xyz",
  },
  {
    name: "Anja Schulz",
    initials: "AS",
    email: "schulz@hotmail",
    password: "xyz",
  },
  {
    name: "Benedikt Ziegler",
    initials: "BZ",
    email: "benedikt@gmail",
    password: "xyz",
  },
  {
    name: "David Eisenberg",
    initials: "DE",
    email: "davidberg@gmail",
    password: "xyz",
  },
];

let state = ["To Do", "In Progress", "Awaiting Feedback", "Done"];
let cat = ["Design", "Sales", "Backoffice", "Marketing", "Media"];
let prio = ["urgent", "medium", "low"];

let tasks = [
  {
    title: "",
    description: "",
    status: state[0],
    category: cat[1],
    priority: prio[2],
    subtasks: [],
    dueDate: "",
    assignedTo: [contacts[0], contacts[2], contacts[3]],
  },
  {
    title: "",
    description: "",
    status: state[2],
    category: cat[4],
    priority: prio[0],
    subtasks: [],
    dueDate: "",
    assignedTo: [contacts[2], contacts[3], contacts[4]],
  },
];
