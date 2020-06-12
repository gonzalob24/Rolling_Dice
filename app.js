/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result gets added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLOBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game.

*/


var scores, roundScore, activePlayer, dice, gamePlaying, rollSix;

// initialize the game
newGame();

// roll the dice event listener
document.querySelector('.btn-roll').addEventListener('click', function() {
    // check if game is playing
    if (gamePlaying) {
        // 1. random number
        var dice1 = Math.floor(Math.random() * 6) + 1;
        
        // dice2 is used if I add another dice to the game
        // var dice2 = Math.floor(Math.random() * 6) + 1;

        // 2. Display the results
        // var diceDOM = document.querySelector('.dice');
        
        document.getElementById('dice-1').style.display = 'block';
        
        // display the second dice as a block if added to the game
        //document.getElementById('dice-2').style.display = 'block';
        
        // show the image according to dice1 roll
        document.getElementById('dice-1').src = 'dice-' + dice1 + '.png';
        
        // show the image according to dice2 roll
        //document.getElementById('dice-2').src = 'dice-' + dice2 + '.png';


        // diceDOM.style.display = 'block';
        //diceDOM.src = 'dice-' + dice + '.png';
        
        // If the dice is a 6 add the second dice if you want
        // increase rollSix by 1
        if ( (dice1 === 6)) { //|| (dice2 === 6) )  {
            rollSix += 1;
        }
        
        // 3. update the round score if the rolled number was not a 1
        // if rollSix = 2  and dice1 = 1 its the next players turn
        if ( (dice1 !== 1)  && (rollSix !== 2) ) {  //recall !== does not perform type coercion
            // Add the score
            roundScore += (dice1);
            document.querySelector('#current-' + activePlayer).textContent = roundScore;
            
        } else {
            //Its the next players turn
            nextPlayer();
        }
    }
});

// button hold event listener
document.querySelector('.btn-hold').addEventListener('click', function() {
    // check if gamePlaying is true
    if (gamePlaying) {
        // Add current score to gloabl score
        scores[activePlayer] += roundScore;

        // upadate the UI
        document.querySelector('#score-' + activePlayer).textContent = scores[activePlayer];
        var inputScore = document.querySelector('.final-score').value;
        
        // check if the value inputScore is not empty,  undefined, 0, null or "" are COERCED
        // players can decide yo to what score they want to play
        if (inputScore) {
            var winningScore = inputScore;
        } else {
            winningScore = 100;
        }
        
        // check if player won the game
        if (scores[activePlayer] >= winningScore) {
            // display Winner on the active player box
            document.querySelector('#name-' + activePlayer).textContent = 'Winner!';
            // document.querySelector('.dice').style.display = 'none';
            // hide the dice
            document.getElementById('dice-1').style.display = 'none';
            // hide dice two if added to game
            //document.getElementById('dice-2').style.display = 'none';
            // add the winner class to the player that won
            document.querySelector('.player-' + activePlayer + '-panel').classList.add('winner');
            // remove the active class from the active player
            document.querySelector('.player-' + activePlayer + '-panel').classList.remove('active');
            
            // change gamePlaying to false since a player won
            gamePlaying = false;

        } else { // game continues
            // Next Player
            nextPlayer();
        }
    }
});


// function declaration to change players. 
function nextPlayer() {
    
    // toggle between players
    activePlayer === 0 ? activePlayer = 1 : activePlayer = 0;
    // reset roundScore to 0
    roundScore = 0;
    
    // display current scores on both sided to 0
    document.getElementById('current-0').textContent = '0';
    document.getElementById('current-1').textContent = '0';
    
    // togle between active players. 
    document.querySelector('.player-0-panel').classList.toggle('active');
    document.querySelector('.player-1-panel').classList.toggle('active');
    // document.querySelector('.player-0-panel').classList.remove('active');
    // document.querySelector('.player-1-panel').classList.add('active');

    // document.querySelector('.dice').style.display = 'none'; 
    // hide the dice
    document.getElementById('dice-1').style.display = 'none';
    //document.getElementById('dice-2').style.display = 'none';
};

// new game button, add the newGame function to event listener
document.querySelector('.btn-new').addEventListener('click', newGame);

// new game function declaration to start the game
function newGame() {
    // set globla variables to 0
    scores = [0, 0];
    activePlayer = 0;
    roundScore = 0;
    rollSix = 0
    
    // gamePlating is true then changes when a player wins to stop the game
    gamePlaying = true;
    
    // document.querySelector('.dice').style.display = 'none';
    // hide the dice
    document.getElementById('dice-1').style.display = 'none';
    
    // hide dice two if needed
    //document.getElementById('dice-2').style.display = 'none';
    
    // set scores and panels to 0
    document.getElementById('score-0').textContent = '0';
    document.getElementById('score-1').textContent = '0';
    document.getElementById('current-0').textContent = '0';
    document.getElementById('current-1').textContent = '0';
    
    // Players can enter their name 
    var name1 = prompt('Enter player 1 name: ');
    var name2 = prompt('Enter player 2 name: ');
    document.getElementById('name-0').textContent = name1;
    document.getElementById('name-1').textContent = name2;
    
    // on new game or when someone wins remove the winner class and active class
    // The let player 0 have the active class since player 0 starts the game.
    document.querySelector('.player-0-panel').classList.remove('winner');
    document.querySelector('.player-1-panel').classList.remove('winner');
    document.querySelector('.player-0-panel').classList.remove('active');
    document.querySelector('.player-1-panel').classList.remove('active');
    document.querySelector('.player-0-panel').classList.add('active');

};





