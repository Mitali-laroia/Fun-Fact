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
const fetchCatFactBtn = document.getElementById('fetchCatFactBtn');
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

  funFacts.forEach(({id, text}) => {
    const factEl = document.createElement("div");
    factEl.classList.add("fact");
    factEl.dataset.id = id;
    factEl.innerHTML = `
      <p>${text}</p>
      <button class="delete-btn">Delete</button>
    `;
    factsContainer.appendChild(factEl);
  });
}

factsContainer.addEventListener('click', (e) => {
  if (e.target.classList.contains('delete-btn')) {
    const idToDelete = Number(e.target.closest('.fact').dataset.id);
    const index = funFacts.findIndex(f => f.id === idToDelete);
    if (index !== -1) {
      funFacts.splice(index, 1);
      renderFacts();
    }
  }
});

fetchCatFactBtn.addEventListener('click', () => {
    axios.get("https://catfact.ninja/fact")
    .then(response => {
      funFacts.push({id: getId(), text: response.data.fact});
      factCounter.increment();
      updateFactCount();
      renderFacts();
    })
    .catch (error => {
      console.error("Failed to fetch cat fact: ", error);
      alert("Oops! Couldn't fetch a cat fact 😿");
    })
})

