let word = require("./Word.js");
let inquirer = require("inquirer");
let wordBank = ["game of thrones", "greys anatomy", "supernatural", "the big bang theory", "the office", "the walking dead", "stranger things", "house of cards", "modern family", "black mirror", "orange is the new black", "breaking bad"]
let life = 8;
let wordToGuess;
let letterGuessed = [];

function restart() {
    randomIndex = Math.floor(Math.random()*wordBank.length)
    wordToGuess = new word(wordBank[randomIndex]);
    wordToGuess.addLetter();
    life = 8;
    letterGuessed = [];
    console.log("\x1b[0m", "-------------------------------------------")
    console.log("\x1b[45m","A new TV show as been selected!")
    console.log("\x1b[0m", "(You have " + life + " life remaining)")
    console.log("\x1b[47m", "\x1b[30m", wordToGuess.wordDisplay());
    console.log("\x1b[0m", "-------------------------------------------")
    guessLoop();
}



function guessLoop(){
    if (life>0 && wordToGuess.wordIsGuessed() === false) {

        inquirer.prompt([
            {
                name: "userGuess",
                message: "Guess a letter!",
                validate: function validateNum(value){
                    let allLetters = /^[A-Za-z]+$/;
                    if (value.match(allLetters) && value.length === 1) {
                        return true;
                    } 
                    else {
                        return false;
                    }
                },
            }
        
        ]).then(function(answer){
            if (letterGuessed.indexOf(answer.userGuess.toLowerCase()) >= 0 ) {
                console.log("\x1b[33m", "You have guessed this letter! Try another letter!");
            }

            else if(wordToGuess.allCharArr.indexOf(answer.userGuess.toLowerCase()) >= 0 ) {
                letterGuessed.push(answer.userGuess.toLowerCase());
                console.log("\x1b[0m", "\x1b[32m", "<<<<- Correct!!! ->>>>");
                wordToGuess.checkWord(answer.userGuess);
                console.log("\x1b[47m", "\x1b[30m",wordToGuess.wordDisplay());
                console.log("\x1b[0m", "-------------------------------------------")
            }
        
            else {
                letterGuessed.push(answer.userGuess.toLowerCase());
                life -= 1;
                console.log("\x1b[0m", "\x1b[31m", "<<<<- Incorrect!!! ->>>>");
                console.log("\x1b[0m", "\x1b[0m", "(You have " + life + " life remaining)");
                console.log("\x1b[47m", "\x1b[30m", wordToGuess.wordDisplay());
                console.log("\x1b[0m", "-------------------------------------------")
            }

            guessLoop();
        })
    }
    else if (life === 0) {
        console.log("\x1b[41m", "You have no more life... Don't give up and play anther game!");
        restart();
    }
    else if (wordToGuess.wordIsGuessed() === true) {
        console.log("\x1b[42m", "Congratulations! You have guessed the TV show:   " + wordToGuess.wordDisplay() +"!!!");
        restart();
    }
}


console.log("=============================================================");
console.log("=============================================================");
console.log("========                                             ========")
console.log("========   Welcome to the game 'Guess That TV Show'  ========");
console.log("========                                             ========");
console.log("========   A random word will be selected, and you   ========");
console.log("========   will have to enter one letter a time to   ========");
console.log("========   guess.  You have 8 lifes for each word,   ========");
console.log("========   and you will lose 1 life when you guess   ========");
console.log("========   a wrong letter.                           ========");
console.log("========                                             ========");
console.log("========   Good Luck!!         =^_^=                 ========");
console.log("========                                             ========")
console.log("=============================================================");
console.log("=============================================================");

restart();
