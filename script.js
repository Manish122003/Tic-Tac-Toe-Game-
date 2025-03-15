let boxes = document.querySelectorAll(".box");
let resetbtn = document.querySelector("#resetbtn");
let newbtn = document.querySelector("#new_btn");
let msgcontainer = document.querySelector(".msg_container");
let msg = document.querySelector("#winmsg");

let turno = true; // true => Player "O", false => Player "X"
let count = 0; // Track moves to detect a draw

const winPatterns = [
    [0,1,2], [3,4,5], [6,7,8], 
    [0,3,6], [1,4,7], [2,5,8], 
    [0,4,8], [2,4,6]
];

// Reset Game Function
const resetGame = () => {
    turno = true;
    count = 0;
    enableBoxes();
    msgcontainer.classList.add("hide");
};

// Game Draw Function
const gameDraw = () => {
    msg.innerText = "Game was a Draw.";
    msgcontainer.classList.remove("hide");
    disableBoxes();
};

// Disable All Boxes
const disableBoxes = () => {
    boxes.forEach(box => box.disabled = true);
};

// Enable All Boxes
const enableBoxes = () => {
    boxes.forEach(box => {
        box.disabled = false;
        box.innerText = "";
    });
};

// Show Winner Message
const showWinner = (winner) => {
    msg.innerText = `Congrats! Winner is ${winner}`;
    msgcontainer.classList.remove("hide");
};

// Check for a Winner
const checkWinner = () => {
    for (let pattern of winPatterns) {
        let pos1 = boxes[pattern[0]].innerText;
        let pos2 = boxes[pattern[1]].innerText;
        let pos3 = boxes[pattern[2]].innerText;

        if (pos1 !== "" && pos1 === pos2 && pos2 === pos3) {
            showWinner(pos1);
            disableBoxes();
            return true; // Stop further moves
        }
    }
    return false;
};

// Handle Player Moves
boxes.forEach((box) => {
    box.addEventListener("click", () => {
        box.innerText = turno ? "O" : "X";
        box.style.color = turno ? "green" : "red";
        box.disabled = true;
        count++;

        // Check for Winner
        let isWinner = checkWinner();

        // Check for Draw
        if (count === 9 && !isWinner) {
            gameDraw();
        }

        // Switch Turn
        turno = !turno;
    });
});

// Event Listeners for Reset & New Game Buttons
newbtn.addEventListener("click", resetGame);
resetbtn.addEventListener("click", resetGame);
