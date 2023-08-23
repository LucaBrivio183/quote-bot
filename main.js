/*-----------
    VARIABILI 
------------*/
const API_URL = "https://api.openai.com/v1/chat/completions";
const MODEL = "gpt-3.5-turbo";
// Inserisci qui la tua chiave API
const API_KEY = "";

const characters = document.querySelectorAll(".character");
const characterNames = [];

characters.forEach((character) => {
  const characterName = character.getAttribute("data-character");
  characterNames.push(characterName);
});

const quote = document.querySelector("h3");
const loader = document.querySelector(".loading");
const modal = document.querySelector(".modal");
const modalContent = document.querySelector(".modal-content");
const modalClose = document.querySelector(".modal-close");

/*-----------
    FUNCTIONS 
------------*/
async function getQuote(nameCharacter) {
  // call API
  const action = getRandomAction();
  const temperature = 0.3;
  // 3. Recuperare la risposta
  const response = await fetch(API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${API_KEY}`,
    },
    body: JSON.stringify({
      model: MODEL,
      messages: [
        {
          role: "user",
          content: `You are ${nameCharacter}: ${action} with max 100 words and never exit from your character`,
        },
      ],
      temperature: temperature,
    }),
  });
  //get data from JSON
  const data = await response.json();
  // print quote on screen
  const message = data.choices[0].message.content;
  quote.innerText = message;
}

function getRandomAction() {
  const actions = [
    "Say hello in a personal iconic way",
    "Tell one of your iconic quote",
    "Share some insight in one of your adventure",
    "Told me about your dream",
    "Tell me who are your friends",
  ];

  const indexRandom = Math.floor(Math.random() * actions.length); // da 0 a 5

  return actions[indexRandom];
}

/*-----------
    INIT & EVENTS
------------*/
document.addEventListener("DOMContentLoaded", function () {
  const randomCharacter =
    characterNames[Math.floor(Math.random() * characters.length)];
  getQuote(randomCharacter);
  //add click to all element
  characters.forEach(function (element) {
    element.addEventListener("click", function () {
      modal.classList.remove("hidden");
      modalContent.innerHTML =
        element.dataset.character == randomCharacter //check if u clicked the random char chosen at start
          ? "Good Job!"
          : "Try Again!";
    });
  });
});

modalClose.addEventListener("click", function () {
  modal.classList.add("hidden");
});
