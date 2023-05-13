var contacts = [
    { id: 1, name: "Anton", color: "#0223CF" },
    { id: 2, name: "Benedikt", color: "#CB02CF" },
    { id: 3, name: "Charlie", color: "#FFA800" },
    { id: 4, name: "David", color: "#9327FF" },
  ];
  
var contact = contacts.find((c) => {
    return c.name === "Anton";
  });
  
console.log(contact); // gibt das Objekt { id: 1, name: "Anton", color: "#0223CF" } aus
console.log(contact.color); // liefert die Color für den gesuchten Namen