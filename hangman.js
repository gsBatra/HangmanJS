window.onload = function(){
    const alphabet = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h',
    'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's',
    't', 'u', 'v', 'w', 'x', 'y', 'z'];
    const words = ["asdfasdfdsaftest"];
    const randomWord = words[Math.floor(Math.random() * words.length)];
    const messages = {
        win: 'You Win!',
        lose: 'You Lose!',
        guessed: ' has already been guessed, please enter a different letter...',
        validLetter: 'Invalid Input! Please enter a letter from A-Z'
      };
    const images = {
        0:"images\\0.jpg", 1:"images\\1.jpg",
        2:"images\\2.jpg", 3:"images\\3.jpg",
        4:"images\\4.jpg", 5:"images\\5.jpg",
        6:"images\\6.jpg", 7:"images\\7.jpg",
        8:"images\\8.jpg", 9:"images\\9.jpg",
        10:"images\\10.jpg"
    }
    const letters = document.getElementById('letters');
    const message = document.getElementById('message');
    const guesses = document.getElementById('guesses');
    const lives = document.getElementById('lives');
    const guessInput = document.getElementById('letter');
    const guessButton = document.getElementById('guess')
    var currentLives, alreadyGuessed;
    
    function startup(){
        currentLives = 10;
        alreadyGuessed = [];
        // create blank letter placeholders for word
        for(let i = 0; i < randomWord.length; i++){
            let blank = document.createElement("li");
            blank.setAttribute('class', 'letter');
            blank.innerHTML = "_";
            letters.appendChild(blank);
        }

        // display amount of lives at start
        lives.innerHTML = 'Lives: ' + currentLives;
    }

    function writeGuess(char){
        let children = letters.children;
        for(let i = 0; i < randomWord.length; i++){
            if(randomWord[i] === char){
                children[i].innerHTML = char.toUpperCase();
            }
        }
        message.innerHTML = '';
        displayGuessedLetters(char);
    }

    function displayGuessedLetters(char){
        alreadyGuessed.push(char);
        let guessed = 'Guessed Letters: ';
        for(let i = 0; i < alreadyGuessed.length; i++){
            guessed += alreadyGuessed[i].toUpperCase() + ', ';
        }
        guesses.innerHTML = guessed;
        message.innerHTML = '';
    }

    function displayValidLetterError(){
        message.classList.add('error');
        message.innerHTML = messages.validLetter.fontcolor("red");
    }

    function displayAlreadyGuessedError(char){
        message.classList.add('error');
        message.innerHTML = char.toUpperCase().fontcolor("red") + 
            messages.guessed.fontcolor("red");
    }

    function wrongGuess(){
        currentLives--;
        document.getElementById("man").src = images[10-currentLives];
        lives.innerHTML = 'Lives: ' + currentLives;
    }

    function gameOver(){
        if(currentLives === 0){
            message.classList.add('error');
            message.innerHTML = messages.lose.fontcolor("red");
            guessInput.style.display = guessButton.style.display = 'none';
            guessInput.value = '';
            return;
        }

        for(let i = 0; i < randomWord.length; i++){
            if(alreadyGuessed.indexOf(randomWord[i]) == -1){
                return;
            }
        }

        message.classList.add('win');
        message.innerHTML = messages.win.fontcolor("green");
        guessInput.style.display = guessButton.style.display = 'none';
        guessInput.value = '';
        return;
    }

    document.getElementById('hangman').onsubmit = function(){
        let guess = guessInput.value.toLowerCase();
        
        if(alphabet.indexOf(guess) == -1){
            displayValidLetterError();
            return false;
        }

        if(alreadyGuessed.indexOf(guess) != -1){
            displayAlreadyGuessedError(guess);
            return false;
        }

        if(randomWord.indexOf(guess) == -1){
            wrongGuess();
            displayGuessedLetters(guess);
            gameOver();
            return false;
        }

        writeGuess(guess)
        gameOver();
        return false;
    }

    document.getElementById("restart").onclick = function(){
        letters.parentNode.removeChild(letters);
        startup();
    }

    guessInput.onclick = function() {
        this.value = '';
    }
    startup();
}
