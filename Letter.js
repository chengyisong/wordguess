let letter = function (character) {
    this.character = character,
    this.isGuessed = false,
    this.display = function() {
        if(this.character === " ") {
            this.isGuessed = true;
        }
        if (this.isGuessed === false) {
            return "_";
        }
        else {
            return this.character;
        }
    }
    this.checkLetter = function(userGuess) {
        if (userGuess.toLowerCase() === this.character) {
            this.isGuessed = true;
        }
    }
}


module.exports = letter