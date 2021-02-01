window.onload = function(){
    const alphabet = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h',
    'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's',
    't', 'u', 'v', 'w', 'x', 'y', 'z'];
    const words = ["test"];
    const randomWord = words[Math.floor(Math.random() * words.length)];
    var guesses = [];
    var letters = document.getElementById('letters');

    function startup(){
        // create blank letter placeholders for word
        for(let i = 0; i < randomWord.length; i++){
            letter = document.createElement("li");
            letter.setAttribute('class', 'letter');
            letter.innerHTML = "_";
            letters.appendChild(letter);
        }
    }
    
    startup();

    function writeGuess(char){
        let children = letters.children;
        for(let i = 0; i < randomWord.length; i++){
            if(randomWord[i] === char){
                children[i].innerHTML = char;
            }
        }
    }

    function isValidGuess(char){
        
    }

    document.getElementById('hangman').onsubmit = function(){
        let guessInput = document.getElementById("letter");
        let guess = guessInput.value;
        writeGuess(guess);
        return false;
    }

    document.getElementById("restart").onclick = function(){
        letters.parentNode.removeChild(letters);
        startup();
    };
}
