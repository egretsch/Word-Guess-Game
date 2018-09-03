//Gives a value for wins and losses and maximum value errors
var wins = 0;
var losses = 0;
var maxErrors = 12;
//Print information to that page from the game logic
var wordDisplayLettersElement = document.getElementById("word-display-letters");
var guessedLettersElement = document.getElementById("guessed-letters");
var errorCountElement = document.getElementById("error-count");
var winCountElement = document.getElementById("win-count");
var lossCountElement = document.getElementById("loss-count");
var blinkElements = document.getElementsByClassName("blinking");
var alertLineElements = document.getElementsByClassName("alert-line");
//Valid letters that can be guessed
var validGuesses = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'];

var pressAnyKeyToStart = [
];
var pressAnyKeyToReset = [
];

var youWin = [
];
var youLose = [
];
var emptyAlert = [
];

var game = new Hangman();
//Tracks letters guessed by user and incorrect letters if they already exist
document.onkeyup = function (event) {
    var userGuess = event.key;

    if (!game.gameOver) {
        if (validGuesses.includes(userGuess) && !game.guessedLetters.includes(userGuess)) {
            game.checkGuess(userGuess);
        }
    } else {
        game = new Hangman();
        game.updatePageData();
    }
}
//Errors left or game over criteria are met game is ended
window.setInterval(function () {
    if (blinkElements.length > 0) {
        if (game.guessedLetters.length === 0 || game.gameOver) {
            if (blinkElements[0].style.opacity === "1") {
                for (var i = 0; i < blinkElements.length; i++) {
                    blinkElements[i].style.opacity = "0";
                }
            } else {
                for (var i = 0; i < blinkElements.length; i++) {
                    blinkElements[i].style.opacity = "1";
                }
            }
        } else {
            for (var i = 0; i < blinkElements.length; i++) {
                blinkElements[i].style.opacity = "0";
            }
        }
    }
}, 750);
//Controls the word bank
function Hangman() {
    this.wordList = [
        'batman',
        'superman',
        'ironman',
        'goku',
        'alucard',
        'greenlatern',
        'wolverine',
        'captainamerica',
        'spiderman',
        'wonderwoman',
        'blackpanther',
        'hellboy',
        'batwoman',
        'jonnyblaze',
        'martianmanhunter',
        'zantanna',
        'silversurfer',
        'astroboy',
        'onepunchman',
        'hawkgril',
        'vagita',
        'gon',
        'guts',
        'kenshiro'
    ]
    //Randomly selects word from word list
    this.word = this.wordList[Math.floor(Math.random() * this.wordList.length)];
    //Hooray for guest letters
    this.guessedLetters = [];
   //Gives the number of errors that have been made
    this.errors = 0;
    //Turns letters into an array so they are visible on the page
    this.visibleLetters = [];
    this.gameOver = false;
    this.alertLines = emptyAlert;
    for (var i = 0; i < this.word.length; i++) {
        this.visibleLetters[i] = (false);
    }
}
//Increases losses versus wins as well as when you lose or win
Hangman.prototype.checkGuess = function (char) {
    this.guessedLetters.push(char);

    var isInWord = false;
    for (var i = 0; i < this.word.length; i++) {
        if (this.word.charAt(i) === char) {
            isInWord = true;
            this.visibleLetters[i] = true;
        }
    }
    if (!isInWord) {
        this.errors++;
    }

    if (this.errors >= maxErrors) {
        losses++;
        this.alertLines = youLose;
        this.gameOver = true;
    }

    if (!this.visibleLetters.includes(false)) {
        wins++;
        this.alertLines = youWin;
        this.gameOver = true;
    }

    game.updatePageData();
};
//Main controller for game logic
Hangman.prototype.updatePageData = function () {
    var tempString = "";
    //Turns all letters into underscores
    for (var i = 0; i < this.visibleLetters.length; i++) {
        tempString += ((this.visibleLetters[i] || this.gameOver) ? this.word.charAt(i).toUpperCase() : "_");
        if (i < (this.visibleLetters.length - 1)) tempString += " ";
    }
    wordDisplayLettersElement.textContent = tempString;
    
    tempString = "";
    for (var i = 0; i < this.guessedLetters.length; i++) {
        tempString += (this.guessedLetters[i].toUpperCase());
        if (i < (this.guessedLetters.length - 1)) tempString += " ";
    }
    for (var i = tempString.length; i < 51; i++) {
        tempString += " ";
    }
    guessedLettersElement.textContent = tempString;
    
    tempString = this.errors + " / " + maxErrors;
    for (var i = tempString.length; i < 32; i++) {
        tempString += " ";
    }
    errorCountElement.textContent = tempString;

    tempString = wins + "";
    for (var i = tempString.length; i < 45; i++) {
        tempString += " ";
    }
    winCountElement.textContent = tempString;

    tempString = losses + "";
    for (var i = tempString.length; i < 43; i++) {
        tempString += " ";
    }
    lossCountElement.textContent = tempString;

    for (var i = 0; i < blinkElements.length; i++) {
        blinkElements[i].textContent = (this.gameOver ? pressAnyKeyToReset[i] : pressAnyKeyToStart[i]);
    }
    
    for (var i = 0; i < alertLineElements.length; i++) {
        alertLineElements[i].textContent = (this.alertLines[i]);
    }
}
//Starts the entire game to call the controller logic
game.updatePageData();
