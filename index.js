const funFacts = [
    {id:1 , text: "Bananas are berries, but strawberries are not!"},
    {id:2 , text: "Honey never spoils."},
    {id:3, text: "A day on Venus is longer than a year on Venus."}
];

function idGenerator(){
  let currentId = 1;

  return function getNextId(){
    return currentId++;
  };
}

function createFactCounter(){
  let count = 0;

  return {
    increment: function(){
      return count++;
    },
    getCount: function(){
      return count
    }
  }
}

const getId = idGenerator();
const factCounter = createFactCounter();
const factInput = document.getElementById('factInput');
const addButton = document.getElementById('addBtn');
const factsContainer = document.getElementById('factsContainer');
renderFacts();

addButton.addEventListener('click', addFact);

function updateFactCount(){
  const displayCount = document.getElementById('factCountDisplay');
  displayCount.textContent = `You’ve added ${factCounter.getCount()} fun facts!`;
}

function addFact() {
  const newFactText = factInput.value.trim();
  
  if (newFactText === "") {
    alert("Please enter a fun fact!");
    return;
  }

  funFacts.push({ id: getId, text: newFactText });
  factCounter.increment();
  renderFacts();
  updateFactCount();
  factInput.value = "";
}

function renderFacts() {
  factsContainer.innerHTML = "";

  funFacts.forEach(fact => {
    const factDiv = document.createElement('div');
    factDiv.className = 'fact';
    factDiv.innerHTML = `
      <span>${fact.text}</span>
      <button class="delete-btn" data-id="${fact.id}">Delete</button>
    `;
    factsContainer.appendChild(factDiv);
  });
}

factsContainer.addEventListener('click', (e) => {
  if (e.target.classList.contains('delete-btn')) {
    const idToDelete = Number(e.target.dataset.id);
    const index = funFacts.findIndex(f => f.id === idToDelete);
    if (index !== -1) {
      funFacts.splice(index, 1);
      renderFacts();
    }
  }
});


