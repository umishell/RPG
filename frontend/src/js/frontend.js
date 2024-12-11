const baseUrl = "http://localhost:3000";

// Populate tables on load
document.addEventListener("DOMContentLoaded", () => {
  fetchCharacters();
  fetchPowers();
});

// Characters CRUD
async function fetchCharacters() {
  const response = await fetch(`${baseUrl}/characters`);
  const data = await response.json();
  const table = document.getElementById("characters-table").querySelector("tbody");
  table.innerHTML = "";
  data.forEach(char => {
    const row = document.createElement("tr");
    row.innerHTML = `
      <td>${char.name}</td>
      <td>${char.class}</td>
      <td>${char.weapon}</td>
      <td>
        <button class="edit-char" data-id="${char.id}">Edit</button>
        <button class="delete-char" data-id="${char.id}">Delete</button>
      </td>
    `;
    table.appendChild(row);
  });

  // Attach event listeners to buttons for each row
  document.querySelectorAll(".edit-char").forEach(button => {
    button.addEventListener("click", editCharacter);
  });

  document.querySelectorAll(".delete-char").forEach(button => {
    button.addEventListener("click", deleteCharacter);
  });
}



// Create a character
document.getElementById("create-char").addEventListener("click", async () => {
  const name = document.getElementById("char-name").value;
  const charClass = document.getElementById("char-class").value;
  const weapon = document.getElementById("char-weapon").value;
  await fetch(`${baseUrl}/characters`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ name, class: charClass, weapon }),
  });
  fetchCharacters();
});

// Edit character
function editCharacter(event) {
  const id = event.target.getAttribute("data-id");
  const row = event.target.closest("tr");
  const name = row.querySelector("td:nth-child(1)").textContent;
  const charClass = row.querySelector("td:nth-child(2)").textContent;
  const weapon = row.querySelector("td:nth-child(3)").textContent;

  document.getElementById("char-name").value = name;
  document.getElementById("char-class").value = charClass;
  document.getElementById("char-weapon").value = weapon;

  document.getElementById("update-char").onclick = async () => {
    const updatedName = document.getElementById("char-name").value;
    const updatedClass = document.getElementById("char-class").value;
    const updatedWeapon = document.getElementById("char-weapon").value;

    await fetch(`${baseUrl}/characters/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name: updatedName, class: updatedClass, weapon: updatedWeapon }),
    });
    fetchCharacters();
  };
}

// Delete character
async function deleteCharacter(event) {
  const id = event.target.getAttribute("data-id");
  await fetch(`${baseUrl}/characters/${id}`, {
    method: "DELETE",
  });
  fetchCharacters();
}

// Powers CRUD
async function fetchPowers() {
  const response = await fetch(`${baseUrl}/powers`);
  const data = await response.json();
  const table = document.getElementById("powers-table").querySelector("tbody");
  table.innerHTML = "";
  data.forEach(power => {
    const row = document.createElement("tr");
    row.innerHTML = `
      <td>${power.name}</td>
      <td>${power.type}</td>
      <td>${power.damage}</td>
      <td>
        <button class="edit-power" data-id="${power.id}">Edit</button>
        <button class="delete-power" data-id="${power.id}">Delete</button>
      </td>
    `;
    table.appendChild(row);
  });

  // Attach event listeners to buttons for each row
  document.querySelectorAll(".edit-power").forEach(button => {
    button.addEventListener("click", editPower);
  });

  document.querySelectorAll(".delete-power").forEach(button => {
    button.addEventListener("click", deletePower);
  });
}


// Create a power
document.getElementById("create-power").addEventListener("click", async () => {
  const name = document.getElementById("power-name").value;
  const type = document.getElementById("power-type").value;
  const damage = document.getElementById("power-damage").value;
  await fetch(`${baseUrl}/powers`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ name, type, damage }),
  });
  fetchPowers();
});

// Edit power
function editPower(event) {
  const id = event.target.getAttribute("data-id");
  const row = event.target.closest("tr");
  const name = row.querySelector("td:nth-child(1)").textContent;
  const type = row.querySelector("td:nth-child(2)").textContent;
  const damage = row.querySelector("td:nth-child(3)").textContent;

  document.getElementById("power-name").value = name;
  document.getElementById("power-type").value = type;
  document.getElementById("power-damage").value = damage;

  document.getElementById("update-power").onclick = async () => {
    const updatedName = document.getElementById("power-name").value;
    const updatedType = document.getElementById("power-type").value;
    const updatedDamage = document.getElementById("power-damage").value;

    await fetch(`${baseUrl}/powers/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name: updatedName, type: updatedType, damage: updatedDamage }),
    });
    fetchPowers();
  };
}

// Delete power
async function deletePower(event) {
  const id = event.target.getAttribute("data-id");
  await fetch(`${baseUrl}/powers/${id}`, {
    method: "DELETE",
  });
  fetchPowers();
}
