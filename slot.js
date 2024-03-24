// 1. Deposit some money
// 2. Determine number of lines to bet on
// 3. Collect a bet amount
// 4. Spin the slot machine
// 5. Check if the user won
// 6. give the user their winnings 
// 7. Play again

/**
   The basic structure javascript is 
   1. input library on the to
   2. global variables
   3. Class and function 
   4. main thing that the we want to do 
 **/

// For taking the user input we using the prompt-sync
// Here first we install npm i prompt-sync
// () in for the parameter call
const prompt = require("prompt-sync")();
// global variables written in caps in const
const ROWS = 3;
const COLS = 3;

const SYMBOLS_COUNT = {
    "A" : 2,
    "B" : 4,
    "C" : 6,
    "D" : 8,
 };

 const SYMBOL_VALUES = {
    "A" : 5,
    "B" : 4,
    "C" : 3,
    "D" : 2,
 };




// function deposit(){

// } // this is  Old fashion 
// so below is the another syntax for declare a function 
const deposit = () => {
  // while loop is for take input till we get a valid value 
    while(true){
        const depositAmount = prompt("Enter a deposit amount: ");  // Here this string in prompt will display and we enter the number 
     // the value added will be in string  
  const numberDepositAmount = parseFloat(depositAmount); // for convert string to no. and check whether the amount is correct or not
// if input is "Hello" or neg it is invalid isNaN used for Not a number 
  if(isNaN(numberDepositAmount)|| numberDepositAmount <= 0){
    console.log("Invalid deposit amount , try again.")
  }else{
    return numberDepositAmount;
  }
    }

};
const getNumberOfLines = () => {
    while(true){
        const Lines = prompt("Enter the number of lines to bet on(1-3): ");  
  const NumberOfLines = parseFloat(Lines); 
  if(isNaN(NumberOfLines)|| NumberOfLines <= 0 || NumberOfLines > 3){
    console.log("Invalid number of lines, try again.")
  }else{
    return NumberOfLines;
  }
    }
};
const getBet = (balance , Lines) => {
    while(true){
        const bet = prompt("Enter the total bet per line : ");  
  const NumberBet = parseFloat(bet);  
  if(isNaN(NumberBet)|| NumberBet <= 0 || NumberBet > balance/Lines){
    console.log("Invalid bet try again.")
  }else{
    return NumberBet;
  }
    }
};
// generate the wheel 
const spin = () => {
  const symbols = []; // array is reference datatype we using const but we can add or remove the without change the orignal
  for(const [symbol , count] of Object.entries(SYMBOLS_COUNT)){
         // Object.entries is like int i its gonna loop through all diff key in symbols count
         for(let i =0; i<count;i++){
            symbols.push(symbol);
         }
        }


//const reels = [[],[],[]]; manually generate 
const reels = [];
for(let i =0;i< COLS;i++){
    reels.push([]);
    // generate the symbols in the reel
    const reelSymbols = [...symbols];
  for(let j =0; j<ROWS;j++){
    // array is like [ A , B, C] with index 0 1 2 so we want to randomly select it 
    // generate the random index to put in the reel 

    // from math random we can get no like 1.9 etc so for valid index we use floor fxn which 
    const randomIndex = Math.floor(Math.random() * reelSymbols.length); // * for the max possible no of symbols  we have 
     const selectedSymbol = reelSymbols[randomIndex];
     reels[i].push(selectedSymbol);
     reelSymbols.splice(randomIndex , 1); // splice to remove the symbol, 1-> for the only one element remove  
  }

}
return reels;
}
const transpose = (reels) => {
    const rows = [];

    for(let i=0;i<ROWS;i++){
        rows.push([]);
        for(let j=0; j<COLS; j++){
            rows[i].push(reels[j][i])
        }
    }
    return rows 
}
const printRows =(rows)=> {
    for(const row of rows){
        let rowString = "";
        for(const [i,symbol]of row.entries()){
            // [i,symbol] => [0,A], [1,B] etc
            rowString += symbol
            if(i != row.length -1){
                rowString += " | "
            }
        }
        console.log(rowString)
    }
}

 const getWinnings = (rows, bet, Lines) =>{
        let winnings =0;
        for(let row =0; row <Lines ; row++){
            const symbols = rows[row];
            let allSame = true;

           for(const symbol of symbols){
            if(symbol != symbols[0]){
                allSame = false;
                break;
            }
           }

        if(allSame){
            winnings += bet * SYMBOL_VALUES[symbols[0]]
        }

        }
        return winnings;
 }

 const game = () => {
    // const depositAmount = deposit(); 
let balance = deposit(); // We can change the deposit value for add sub 
while(true){
    console.log("You have a balance of $" + balance);
    const NumberOfLines =  getNumberOfLines();
const bet = getBet(balance , NumberOfLines);
balance -= bet* NumberOfLines;
const reels = spin();
// [[A,B,C] ,[A,D,D] , [A,A,A]] this is our actual reel 
// to win this game we want this rows in col so we can easily identify the wining
// we want like this (transpose of the array )
// [A,A,A] this is win 
// [B,D,A]
// [C,D,A]
const rows = transpose(reels);
printRows(rows);
const winnings = getWinnings(rows , bet , NumberOfLines);
balance += winnings;
console.log("You Won , $" + winnings.toString());

  if(balance <= 0){
     console.log("You ran out of  money!");
    break;
  }
   const playAgain = prompt("Do you want to play again (y/n)?  " );

   if(playAgain !="y") break;
    
}
 };

 game();

