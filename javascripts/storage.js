let contacts = [
  {
    name: "Anton Mayer",
    color: "#0223CF",
    email: "antom@gmail.com",
  },
  {
    name: "Anja Schulz",
    color: "#CB02CF",
    email: "schulz@hotmail",
  },
  {
    name: "Benedikt Ziegler",
    color: "#FFA800",
    email: "benedikt@gmail",
  },
  {
    name: "David Eisenberg",
    color: "#9327FF",
    email: "davidberg@gmail",
  },
  {
    name: "Elena Schmidt",
    color: "#02CF2F",
    email: "elena.schmidt@gmail.com",
  },
  {
    name: "Fabian Fischer",
    color: "#EE00D6",
    email: "fabian.fischer@hotmail.com",
  },
  {
    name: "Gabriele Wagner",
    color: "#0190E0",
    email: "gabriele.wagner@gmail.com",
  },
  {
    name: "Hans Müller",
    color: "#FF5C00",
    email: "hans.mueller@hotmail.com",
  },
  {
    name: "Ines Bauer",
    color: "#4E963D",
    email: "ines.bauer@gmail.com",
  },
  {
    name: "Johannes Mayer",
    color: "#32DAFF",
    email: "johannes.mayer@hotmail.com",
  },
  {
    name: "Katrin Schuster",
    color: "#9327FF",
    email: "katrin.schuster@gmail.com",
  },
  {
    name: "Lena Wagner",
    color: "#EE00D6",
    email: "lena.wagner@hotmail.com",
  },
];

let tasks = [
  {
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
    description:
      "Review and organize financial records, including invoices, receipts, and expense reports, to ensure accurate bookkeeping and easy retrieval for auditing purposes",
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
  },
  {
    title: "Prepare quarterly report",
    description: "",
    status: "done",
    category: "backoffice",
    priority: "urgent",
    subtasks: [],
    dueDate: "2022-04-30",
    assignedTo: [contacts[7], contacts[8], contacts[9]],
  },
];

let category = ["Sales", "Backoffice", "Design", "Marketing", "Media"];

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
