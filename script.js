const clickSound = new Audio("https://www.soundjay.com/buttons/sounds/button-16.mp3");

const cards = [
  { id: 1, img: "q1.jpg", q: "How many legs does an elephant have?", a: "Four legs", mastered: false },
  { id: 2, img: "q2.jpg", q: "What do lions eat?", a: "Meat", mastered: false },
  { id: 3, img: "q3.jpg", q: "What animal jumps high?", a: "A frog", mastered: false },
  { id: 4, img: "q4.webp", q: "What helps birds fly?", a: "Wings", mastered: false },
  { id: 5, img: "q5.jpg", q: "How many planets orbit the sun?", a: "Eight", mastered: false },
  { id: 6, img: "q6.jpg", q: "What is H2O?", a: "Water", mastered: false },
  { id: 7, img: "q7.jpg", q: "What do plants need?", a: "Sunlight, water, air", mastered: false },
  { id: 8, img: "q8.jpg", q: "What shape has 3 sides?", a: "Triangle", mastered: false },
  { id: 9, img: "q9.png", q: "Which is the Red Planet?", a: "Mars", mastered: false },
  { id: 10, img: "q10.jpg", q: "What pulls us to Earth?", a: "Gravity", mastered: false }
];

// HTML elements
const startBtn = document.getElementById("start-btn");
const intro = document.getElementById("intro-screen");
const app = document.getElementById("app");
const container = document.getElementById("flashcard-container");
const filterBtns = document.querySelectorAll(".filter-btn");

startBtn.onclick = () => {
  clickSound.play();  
  intro.classList.add("hidden");
  app.classList.remove("hidden");
  renderCards();
};

filterBtns.forEach(btn => {
  btn.onclick = () => {
    document.querySelector(".active").classList.remove("active");
    btn.classList.add("active");
    renderCards(btn.dataset.filter);
  };
});

function renderCards(filter = "all") {
  container.innerHTML = "";

  cards
    .filter(c => filter === "all" ? true : filter === "mastered" ? c.mastered : !c.mastered)
    .forEach(card => container.appendChild(createCard(card)));
}

function createCard(card) {
  const wrapper = document.createElement("div");
  wrapper.className = "flashcard";

  const inner = document.createElement("div");
  inner.className = "inner-card";

  // FRONT
  const front = document.createElement("div");
  front.className = "side front";
  front.innerHTML = `
      <img src="${card.img}">
      <p>${card.q}</p>
    `;

  // BACK
  const back = document.createElement("div");
  back.className = "side back";
  back.innerHTML = `
      <img src="${card.img}">
      <p>${card.a}</p>
    `;

  inner.appendChild(front);
  inner.appendChild(back);
  wrapper.appendChild(inner);

  wrapper.onclick = () => {
    clickSound.play();
    inner.classList.toggle("flip");
  };

  // Master Button
  const masterBtn = document.createElement("button");
  masterBtn.className = `master-btn ${card.mastered ? "mastered" : "unmastered"}`;
  masterBtn.textContent = card.mastered ? "Mastered ✔" : "Mark as Mastered";

  masterBtn.onclick = (e) => {
    e.stopPropagation();
    card.mastered = !card.mastered;
    renderCards(document.querySelector(".active").dataset.filter);
  };

  wrapper.appendChild(masterBtn);

  return wrapper;
}
