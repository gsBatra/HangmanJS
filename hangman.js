window.onload = function(){
    // get random word to guess from list of words
    const alphabet = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h',
    'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's',
    't', 'u', 'v', 'w', 'x', 'y', 'z'];
    const words = ["java", "javascript", "react", "vue", "angular",
                "python", "ruby", "swift", "typescript"];
    const randomWord = words[Math.floor(Math.random() * words.length)];

    // error/win messages
    const messages = {
        win: 'You Win!',
        lose: 'You Lose!',
        guessed: ' has already been guessed, please enter a different letter...',
        validLetter: 'Invalid Input! Please enter a letter from A-Z'
    };

    // images for man with key of lives used
    const images = {
        0:"images\\0.jpg", 1:"images\\1.jpg",
        2:"images\\2.jpg", 3:"images\\3.jpg",
        4:"images\\4.jpg", 5:"images\\5.jpg",
        6:"images\\6.jpg", 7:"images\\7.jpg",
        8:"images\\8.jpg", 9:"images\\9.jpg",
        10:"images\\10.jpg"
    }
    
    // Get Elements
    const letters = document.getElementById('letters');
    const message = document.getElementById('message');
    const guesses = document.getElementById('guesses');
    const lives = document.getElementById('lives');
    const guessInput = document.getElementById('letter');
    const guessButton = document.getElementById('guess')

    // Lives remaining and List of guessed letters
    var currentLives = 10;
    var alreadyGuessed = [];
    
    function startup(){
        // create blank letter placeholders for word
        for(let i = 0; i < randomWord.length; i++){
            let blank = document.createElement("li");
            blank.setAttribute('class', 'letter');
            blank.innerHTML = "_";
            letters.appendChild(blank);
        }

        // clear contents of lives, message, and guesses at start
        lives.innerHTML = 'Lives: ' + currentLives;
        message.innerHTML = '';
        guesses.innerHTML = 'Guessed Letters: ';        
    }

    // Replace placeholder with guessed letter
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

    // Display the list of guessed letters
    function displayGuessedLetters(char){
        alreadyGuessed.push(char);
        let guessed = 'Guessed Letters: ';
        for(let i = 0; i < alreadyGuessed.length; i++){
            guessed += alreadyGuessed[i].toUpperCase() + ', ';
        }
        guesses.innerHTML = guessed;
        message.innerHTML = '';
    }

    // Check if user has won, lost, or neither 
    function gameOver(){
        // Game is lost if lives = 0
        if(currentLives === 0){
            message.classList.add('error');
            message.innerHTML = messages.lose.fontcolor("red");
            guessInput.style.display = guessButton.style.display = 'none';
            guessInput.value = '';
            let children = letters.children;
            for(let i = 0; i < randomWord.length; i++){
                if(children[i].innerHTML != randomWord[i].toUpperCase())
                    children[i].innerHTML = randomWord[i].toUpperCase().fontcolor("red");
            }
            return;
        }

        // Word hasn't been guessed. Neither won or lost
        for(let i = 0; i < randomWord.length; i++){
            if(alreadyGuessed.indexOf(randomWord[i]) == -1){
                return;
            }
        }

        // Game is won
        message.classList.add('win');
        message.innerHTML = messages.win.fontcolor("lightgreen");
        guessInput.style.display = guessButton.style.display = 'none';
        guessInput.value = '';
        return;
    }

    // User submits a letter
    document.getElementById('hangman').onsubmit = function(){
        let guess = guessInput.value.toLowerCase();
        
        // not a letter
        if(alphabet.indexOf(guess) == -1){
            message.classList.add('error');
            message.innerHTML = messages.validLetter.fontcolor("red");
            return false;
        }

        // already guessed letter
        if(alreadyGuessed.indexOf(guess) != -1){
            message.classList.add('error');
            message.innerHTML = guess.toUpperCase().fontcolor("red") + messages.guessed.fontcolor("red");
            return false;
        }

        // not in word, decrease lives and display new hangman image
        if(randomWord.indexOf(guess) == -1){
            currentLives--;
            document.getElementById("man").src = images[10-currentLives];
            lives.innerHTML = 'Lives: ' + currentLives;
            displayGuessedLetters(guess);
            gameOver();
            return false;
        }

        // correct guess
        writeGuess(guess)

        // check if game is won/lost
        gameOver();
        return false;
    }

    // clear input
    guessInput.onclick = function() { this.value = ''; }

    startup();
}
