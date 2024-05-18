let boxes = document.querySelectorAll(".box");
let resetbtn = document.querySelector("#resetbtn");
let newbtn = document.querySelector("#new_btn");
let msgcontainer = document.querySelector(".msg_container");
let msg = document.querySelector("#winmsg")

let turno = true;//playerx, playery
let count = 0

const winPatterns = [
        [0,1,2],
        [3,4,5],
        [6,7,8],
        [0,3,6],
        [1,4,7],
        [2,5,8],
        [0,4,8],
        [2,4,6]];

const resetgame = () => {
    turno = true;
    enableBoxs();
    msgcontainer.classList.add("hide");

}

boxes.forEach((box)=>{
    
    box.addEventListener("click",()=>{
        
        if (turno){
            box.style.color = "green"
            box.innerText = "0";
            turno = false;
        }else{
            box.style.color = "red"
            box.innerText = "X";
            turno = true;

        }
        box.disabled = true ;
        count++;
        let iswinner = checkWinner();

        if (count === 9 && !iswinner) {
            gameDraw();
          }

    })
    
});

const gameDraw = () => {
    count = 0
    msg.innerText = `Game was a Draw.`;
    msgcontainer.classList.remove("hide");
    disableBoxs();
  };

const disableBoxs = () =>{
    for (let box of boxes){
        box.disabled = true;
    }
}

const enableBoxs = () =>{
    for (let box of boxes){
        box.disabled = false;
        box.innerText = "";
    }
}

const showWinner = (winner) => {
    msg.innerText = `Congrats, winner is ${winner}`;
    msgcontainer.classList.remove("hide");
}


const checkWinner = () =>{
    for (let pattern of winPatterns){
        
        let posVal1= boxes[pattern[0]].innerText;
        let posVal2= boxes[pattern[1]].innerText;
        let posVal3= boxes[pattern[2]].innerText;

        if (posVal1 != "" && posVal1 != "" && posVal1 != ""){
            if (posVal1 === posVal2 &&  posVal2 === posVal3){
                showWinner(posVal1);
                disableBoxs();
                count = 0;
            }
        }

    }
}

newbtn.addEventListener("click",resetgame);
resetbtn.addEventListener("click",resetgame);
