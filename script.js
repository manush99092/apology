
const pages = document.querySelectorAll(".page");

// Move between the five pages.
document.querySelectorAll("[data-next]").forEach((button) => {
  button.addEventListener("click", () => {
    const targetId = button.dataset.next;
    const targetPage = document.getElementById(targetId);

    if (!targetPage) return;

    pages.forEach((page) => page.classList.remove("active"));
    targetPage.classList.add("active");
    window.scrollTo({ top: 0, behavior: "smooth" });
  });
});

// Reveal the selected apology messages on page 3.
const reveal = document.getElementById("message-reveal");

document.querySelectorAll(".message-card").forEach((button) => {
  button.addEventListener("click", () => {
    reveal.textContent = button.dataset.message;
  });
});

// Open and close the letter on page 4.
const openLetter = document.getElementById("open-letter");
const letterContent = document.getElementById("letter-content");
const letterInstruction = document.getElementById("letter-instruction");

openLetter.addEventListener("click", () => {
  const willOpen = letterContent.hidden;
  letterContent.hidden = !willOpen;
  openLetter.setAttribute("aria-expanded", String(willOpen));

  letterInstruction.textContent = willOpen
    ? "↑ Your message is open ↑"
    : "↓ Tap to see message ↓";
});

// Make the NO button move away on the final page.
const noButton = document.getElementById("no-btn");
const yesButton = document.getElementById("yes-btn");
const hint = document.getElementById("hint");
const answerArea = document.querySelector(".answer-buttons");

let noAttempts = 0;

function moveNoButton() {
  if (noButton.hidden) return;

  noAttempts++;

  // After the first attempt, position the button within the answer area.
  noButton.style.position = "absolute";

  const area = answerArea.getBoundingClientRect();
  const button = noButton.getBoundingClientRect();

  const maxX = Math.max(0, area.width - button.width);
  const maxY = Math.max(0, area.height - button.height);

  const x = Math.random() * maxX;
  const y = Math.random() * maxY;

  noButton.style.left = `${x}px`;
  noButton.style.top = `${y}px`;
  noButton.style.transform = "rotate(-5deg)";

  hint.textContent = noAttempts > 2
    ? "Hehe, only YES is accepted today! 🥺❤️"
    : "Are you sure? Try again 🙈";
}

// Desktop mouse and keyboard/touch interactions.
noButton.addEventListener("pointerenter", moveNoButton);
noButton.addEventListener("click", (event) => {
  event.preventDefault();
  moveNoButton();
});

// YES opens the final celebration.
yesButton.addEventListener("click", () => {
  document.getElementById("celebration").hidden = false;
  hint.hidden = true;
  noButton.hidden = true;
  yesButton.hidden = true;

  launchConfetti();
});

// Simple festive heart/confetti effect.
function launchConfetti() {
  const symbols = ["❤️", "🌸", "✨", "🪔", "💗", "🌼"];

  for (let i = 0; i < 35; i++) {
    const piece = document.createElement("span");
    piece.textContent = symbols[Math.floor(Math.random() * symbols.length)];

    piece.style.position = "fixed";
    piece.style.left = `${Math.random() * 100}vw`;
    piece.style.top = "-30px";
    piece.style.zIndex = "9999";
    piece.style.pointerEvents = "none";
    piece.style.fontSize = `${18 + Math.random() * 16}px`;
    piece.style.transition = `top ${2 + Math.random() * 2}s linear, transform 3s linear`;

    document.body.appendChild(piece);

    requestAnimationFrame(() => {
      piece.style.top = "105vh";
      piece.style.transform = `rotate(${Math.random() * 700 - 350}deg)`;
    });

    setTimeout(() => piece.remove(), 4500);
  }
}
