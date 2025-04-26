const doors = document.querySelectorAll(".door");
const message = document.querySelector(".message");
const resetBtn = document.querySelector(".reset");

let carDoor = Math.floor(Math.random() * 3);
let playerChoice = null;
let revealed = false;

doors.forEach(door => {
  door.addEventListener("click", () => {
    if (revealed) return;

    playerChoice = parseInt(door.dataset.door);
    let hostDoor;

    // Find a goat door to open (not the car, not player's choice)
    do {
      hostDoor = Math.floor(Math.random() * 3);
    } while (hostDoor === carDoor || hostDoor === playerChoice);

    doors[hostDoor].textContent = "🐐 Goat!";
    doors[hostDoor].disabled = true;

    message.innerHTML = `
      Host opened a goat door!<br>
      Do you want to <strong>stick</strong> with Door ${playerChoice + 1} or <strong>switch</strong>?
    `;

    revealed = true;

    // Now allow player to make final choice
    doors.forEach(d => {
      if (!d.disabled) {
        d.addEventListener("click", finalChoice);
      }
    });
  });
});

function finalChoice(e) {
  const finalPick = parseInt(e.target.dataset.door);
  doors.forEach(d => (d.disabled = true));
  
  if (finalPick === carDoor) {
    e.target.textContent = "🏎️ Car!";
    message.textContent = "Congratulations! You won the car! 🎉";
  } else {
    e.target.textContent = "🐐 Goat!";
    message.textContent = "Oops! You got a goat. 🐐 Try again!";
    doors[carDoor].textContent = "🏎️ Car was here!";
  }

  resetBtn.style.display = "inline-block";
}

resetBtn.addEventListener("click", () => {
  // Reset the game
  carDoor = Math.floor(Math.random() * 3);
  playerChoice = null;
  revealed = false;
  message.textContent = "";
  resetBtn.style.display = "none";

  doors.forEach((door, index) => {
    door.textContent = `🚪 Door ${index + 1}`;
    door.disabled = false;
  });
});
