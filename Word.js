let letter = require ("./Letter.js");

let word = function(targetWord){
    this.letterArr = [],
    this.allCharArr = [],    
    this.addLetter = function(){
        for (i=0; i<targetWord.length; i++){
            this.letterArr.push(new letter(targetWord.substring(i,i+1)));
        }
        for (i=0; i<this.letterArr.length; i++){
            this.allCharArr.push(this.letterArr[i].character);
        }
    },
    this.wordDisplay = function(){
        let wordDisplayArr = [];
        for (i=0; i<this.letterArr.length; i++) {
            wordDisplayArr.push(this.letterArr[i].display())
        }
        return wordDisplayArr.join(" ");
    },
    this.checkWord = function(userGuess) {
        for (i=0; i<this.letterArr.length; i++) {
            this.letterArr[i].checkLetter(userGuess)
        }
    },
    this.wordIsGuessed = function(){
        var check = true;
        for (i=0; i<this.letterArr.length; i++) {
            if(this.letterArr[i].isGuessed === false) {
                check = false;
            }
        }
        return check;
    }
}

module.exports = word


