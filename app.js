const holes = document.querySelectorAll(".hole");
const scoreBoard = document.querySelector(".score");
const cats = document.querySelectorAll(".cat");
const countdownBoard = document.querySelector(".countdown");
const startButton = document.querySelector(".startButton");

let lastHole;
let timeUp = false;
let limit = 60000;
let score = 0;
let countdown;
let miau = new Audio("miau.mp3");

function pickRandomHole(holes) {
  const randomHole = Math.floor(Math.random() * holes.length);
  const hole = holes[randomHole];

  if (hole === lastHole) {
    return pickRandomHole(holes);
  }

  lastHole = hole;
  return hole;
}

function popOut() {
  const time = Math.random() + 1200;
  const hole = pickRandomHole(holes);
  hole.classList.add("up");
  setTimeout(() => {
    hole.classList.remove("up");
    if (!timeUp) {
      popOut();
    }
  }, time);
}

function startGame() {
  countdown = limit / 1000;
  scoreBoard.textContent = 0;
  scoreBoard.style.display = "block";
  countdownBoard.textContent = countdown;
  timeUp = false;
  score = 0;
  startButton.disabled = true;
  popOut();

  let startCountdown = setInterval(() => {
    countdown -= 1;
    countdownBoard.textContent = countdown;
    if (countdown === 0) {
      countdown = 0;
      clearInterval(startCountdown);
      countdownBoard.textContent = `Tempo Esgotado!`;
    }
  }, 1000);

  setTimeout(() => {
    timeUp = true;
    startButton.disabled = false;
    if (score >= 40) {
      Swal.fire({
        title: "Parábens",
        text: "Você concluiu o desafio com sucesso, mande o código a seguir por e-mail para receber a recompensa",
        preConfirm: () => Swal.fire("Código: CLIQUE_NO_GATINHO"),
      });
    }
  }, limit);
}

startButton.addEventListener("click", startGame);

function clicked() {
  score++;
  this.style.pointerEvents = "none";
  this.style.backgroundImage = "url('images/cat-click.png')";
  miau.play();
  setTimeout(() => {
    this.style.pointerEvents = "all";
    this.style.backgroundImage = "url('images/cat.png')";
  }, 800);
  scoreBoard.textContent = score;
}

cats.forEach((cat) => {
  cat.addEventListener("click", clicked);
});
