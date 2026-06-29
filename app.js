let userScore = 0;
let compScore = 0;
let drawTime = 0;

const choices = document.querySelectorAll(".choice");
const msg = document.querySelector("#msg");
const userScorePara = document.querySelector("#user-score");
const compScorePara = document.querySelector("#comp-score");
const scoreBoard = document.querySelector(".score-board");
const img = document.querySelector(".choices");
const msgcont = document.querySelector(".msg-container");
const winmsg = document.querySelector(".win-msg");
const newbtn = document.querySelector(".new");

newbtn.addEventListener("click" , () => {
    userScore = 0;
    compScore = 0;
    drawTime = 0;
    scoreBoard.classList.remove("hide");
    img.classList.remove("hide");
    msgcont.classList.remove("hide");
    newbtn.classList.add("hide");
    winmsg.innerText = "";
    userScorePara.innerText = 0;
    compScorePara.innerText = 0;
    msg.style.backgroundColor = "#131515"
    msg.innerText = "Play your move"
    cleargen();
});

const genCompChoice = () => {
    const options = ["rock", "paper", "scissors"];
    const randIdx = Math.floor(Math.random() * 3);

    if(options[randIdx] === "rock"){
            document.querySelector("#rock1").classList.add("highlight");
        } else if (options[randIdx] === "paper"){
            document.querySelector("#paper1").classList.add("highlight");
        } else {
            document.querySelector("#scissors1").classList.add("highlight");
        }
    
    return options[randIdx];
}

const cleargen = () => {
    document.querySelector("#rock1").classList.remove("highlight");
    document.querySelector("#paper1").classList.remove("highlight");
    document.querySelector("#scissors1").classList.remove("highlight");
}

const drawGame = () => {
    msg.style.backgroundColor = "";
    msg.innerText = "Game was Draw! Play again"
    drawTime++;
}

const showWinner = (userWin , userChoice , compChoice) => {
    if(userWin){
        userScore++;
        userScorePara.innerText = userScore;
        msg.innerText = `You win! Your ${userChoice} beats ${compChoice}`
        msg.style.backgroundColor = "green";
    } else {
        compScore++;
        compScorePara.innerText = compScore;
        msg.innerText = `You lose. ${compChoice} beats your ${userChoice} `;
        msg.style.backgroundColor = "red";
    }
    hideScore();
}

const hideScore = () => {
    if(userScore === 10 || compScore === 10){
        scoreBoard.classList.add("hide");
        img.classList.add("hide");
        msgcont.classList.add("hide");
        winMsgDisplay();
    }
}

const winMsgDisplay = () => {
    if(userScore === 10){
        winmsg.innerText = `hurray! You won the game \n You won ${userScore} times and computer won ${compScore} and you got draw ${drawTime} times`;
    } else if (compScore === 10){
        winmsg.innerText = `Ohho computer won! please try next time`;
    };
    newbtn.classList.remove("hide");
};

const playGame = (userChoice) => {
    cleargen();
    const compChoice = genCompChoice();

    if(userChoice === compChoice){
        drawGame();

    } else {
        let userWin = true;
        if(userChoice === "rock"){
            userWin = compChoice === "paper" ? false : true;
        } else if (userChoice === "paper"){
            userWin = compChoice === "scissors" ? false : true;
        } else {
            userWin = compChoice === "rock" ? false : true;
        };
        showWinner(userWin , userChoice , compChoice);
        
    };
};

choices.forEach((choice) => {
    choice.addEventListener("click", () => {
        const userChoice = choice.getAttribute("id");
        playGame(userChoice);
        
    });
});