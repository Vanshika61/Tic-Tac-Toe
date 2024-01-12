// Accessing the boxes and reset button 
let boxes = document.querySelectorAll(".box");
let resetBtn = document.querySelector("#reset-btn");
let msgContainer = document.querySelector(".msg-container");
let newGameBtn = document.querySelector("#new-btn");
let msg = document.querySelector("#msg");

// storing the turn of 0 as true  
let turn0 = true;  // playerX  // player0
let count = 0;

// storing the winning patterns in 2d array 
const winPatterns = [
    [0,1,2],
    [0,3,6],
    [0,4,8],
    [1,4,7],
    [2,4,6],
    [2,5,8],
    [3,4,5],
    [6,7,8]
];

const resetGame = () =>{
    count = 0;
    let turn0 = true;
    enableBoxes();
    msgContainer.classList.add("hide");
}

// add a event listener for each box alternate turn 
boxes.forEach( (box) =>{
    box.addEventListener("click", () =>{
        // console.log("button was clicked");
        count++;
        console.log(count);
        if(turn0){  //player0
            box.innerText = "0";
            turn0 = false;
            box.classList.add("color0");
            box.classList.remove("colorX");
        }
        else{  // playerX
            box.innerText = "X";
            turn0 = true;
            box.classList.add("colorX");
            box.classList.remove("color0");
        }
        box.disabled = true;

        checkWinner();
    })
})

const showWinner = (winner) =>{
    msg.innerText = `Congratulations, Winner is ${winner}`;
    msgContainer.classList.remove("hide");
    disableBoxes();
};

const drawMsg = () =>{
    msg.innerText = `Draw, Please try again`
    msgContainer.classList.remove("hide");
}

const checkWinner = () =>{
    for(let pattern of winPatterns){
        // console.log(pattern[0], pattern[1], pattern[2]);
        // console.log(boxes[pattern[0]].innerText, boxes[pattern[1]].innerText, boxes[pattern[2]].innerText);
        let Position1Val = boxes[pattern[0]].innerText;
        let Position2Val = boxes[pattern[1]].innerText;
        let Position3Val = boxes[pattern[2]].innerText;
        
        if(Position1Val != "" && Position2Val != "" && Position3Val != ""){
            if(Position1Val === Position2Val && Position2Val === Position3Val){
                // console.log("winner", Position1Val);
                showWinner(Position1Val);
            }
            else if(count >= 9){
                drawMsg();
            }
        }
    }
}

const disableBoxes = () =>{
    for(let box of boxes){
        box.disabled = true;
    }
};

const enableBoxes = () =>{
    for(let box of boxes){
        box.disabled = false;
        box.innerText = "";
    }
};


newGameBtn.addEventListener("click", resetGame);
resetBtn.addEventListener("click", resetGame);