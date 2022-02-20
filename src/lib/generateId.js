const idsList = [];

function generateId() {
  const ALPHABETS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  const DIGITS = "0123456789";
  let id = "";

  while (id.length < 2) {
    id += ALPHABETS[Math.floor(Math.random() * ALPHABETS.length)];
  }
  while (id.length < 6) {
    id += DIGITS[Math.floor(Math.random() * DIGITS.length)];
  }

  return id;
}

function getId() {
  let id = generateId();
  while (idsList.includes(id)) {
    id = generateId();
  }
  idsList.push(id);
  return id;
}

export default getId;
