let boxes=document.querySelectorAll(".box");
let resetBtn= document.querySelector("#reset-button");
let newGameBtn= document.querySelector("#new-btn");
let msgContainer= document.querySelector(".msg-container");
let msg = document.querySelector("#msg");
let currentPlayerDisplay = document.querySelector("#current-player");
let winnerLabel = document.querySelector(".winner-label");

let turnX= true; //playerX, playerO
let moveCount=0;

const winPatterns =[
    [0,1,2],
    [0,3,6],
    [0,4,8],
    [1,4,7],
    [2,5,8],
    [2,4,6],
    [3,4,5],
    [6,7,8],
]

const resetGame= ()=>{
    turnX=true;
    moveCount= 0;
    enableBoxes();
    msgContainer.classList.add("hide");
    updateTurnIndicator();
}

const updateTurnIndicator = () => {
    currentPlayerDisplay.textContent = turnX ? "X" : "O";
    currentPlayerDisplay.style.color = turnX ? "var(--cyan)" : "var(--pink)";
    currentPlayerDisplay.style.textShadow = turnX
        ? "var(--glow-cyan)"
        : "var(--glow-pink)";
};

boxes.forEach((box) => {
    box.addEventListener("click",() =>{
        if(turnX){//player1
            box.innerText ="X";
            box.style.color="var(--cyan)";
            box.style.textShadow= "var(--glow-cyan)";
            turnX=false;
        }
        else{//player2
            box.innerText ="O"
            box.style.color="var(--pink)";
            box.style.textShadow= "var(--glow-pink)";
            turnX= true;
        }
        box.disabled = true;
        moveCount++;
        updateTurnIndicator();
        checkWinner();
    });
});

const disablBoxes = () =>{
    for(let box of boxes){
        box.disabled = true;
    }
}

const enableBoxes = () =>{
    for(let box of boxes){
        box.disabled = false;
        box.innerText="";
        box.style.color = "";
        box.style.textShadow = "";
    }
}

const showWinner = (winner) => {
    winnerLabel.textContent = "WINNER";
    msg.innerText = `Congratulations, Player ${winner} wins!`;
    msgContainer.classList.remove("hide");
    disableBoxes();
}

const showDraw = () => {
    winnerLabel.textContent = "DRAW";
    msg.innerText = "It's a tie! Well played.";
    msgContainer.classList.remove("hide");
}

const checkWinner= () =>{
    for(let pattern of winPatterns){
        let pos1Val=boxes[pattern[0]].innerText;
        let pos2Val=boxes[pattern[1]].innerText;
        let pos3Val=boxes[pattern[2]].innerText;

        if(pos1Val != "" && pos2Val != "" && pos3Val != ""){
            if(pos1Val === pos2Val && pos2Val === pos3Val ){
                showWinner(pos1Val);
                return;
            }
        }
    }
    
    if (moveCount === 9) {
        showDraw();
    }
}

newGameBtn.addEventListener("click",resetGame);
resetBtn.addEventListener("click",resetGame);
