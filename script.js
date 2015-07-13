$(function(){

	// STORES TILE VALUES AND FLIPPED TILE LOCATIONS
	var tileValueArr = ['A', 'A', 'B', 'B', 'C', 'C', 'D', 'D', 'E', 'E', 'F', 'F', 'G', 'G', 'H', 'H'];
	var tileLocArr = []; //collects location of click#1 & click#2 tiles
	var totalTilesFlipped = 0; // counts total tiles clicked per game;
	var playerTurn = 0

	// Stores Player One Score and Misses
	var playerOneScore = 0;
	var playerOneMisses = 0;
	var playerOneMatch = 0;

	// Stores Player Two Score and Misses
	var playerTwoScore = 0;
	var playerTwoMisses = 0;
	var playerTwoMatch = 0;


	// START BUTTON - LISTENS FOR CLICK
	$('#Start-button').on('click', function(e){
		e.preventDefault();
		console.log('player 1 turn');
		playerTurnNotice('Player 1');
		newGame('pOne');
	}); 



	// STARTS NEW GAME
	var newGame = function (taco) {
		newBoard(tileValueArr, taco);
	}


	// SHUFFLES TILE VALUES ARRAY
	var shuffle = function(taco) {
		var currentIndex = taco.length; //stores # of elements in tileValueArr []
		var tempVal; // temp stores index value from array
		var randomIndex; // stores random number generated

		while (0 !== currentIndex) { //#loops not to exceed # elements in tileValueArr []
			//generates random number
			randomIndex = Math.floor(Math.random() * currentIndex);
			currentIndex -= 1; //counts # loops
			//swap random number with current element
			tempVal = taco[currentIndex];
			taco[currentIndex] = taco[randomIndex];
			taco[randomIndex] = tempVal;
		}; 

		return taco; //returns shuffled array
	}; // end shuffle function


 	// STARTS NEW BOARD 
	var newBoard = function (tileArray, player) {
		shuffle(tileArray); // Shuffles Tile Val Array
		createTiles(tileArray); // Creates Tiles on Screen
		listenTileClicks (tileArray, player); // Listens for tile clicks
	}; //end newBoard function ()


	// PLAYER - CHOOSE TWO TILES 
	var listenTileClicks = function (taco, player) {
		var flippedTileArr = []; //collects data attribute for each tile clicked
		var tilesFlipped = 0; // counts tiles clicked per player turn;


		//LISTENS FOR TILE CLICKS - FLIPS TILE
		$('.cell').on('click', function(e){
			e.preventDefault();

			//Stores data attribute + location: Click#1 / Click#2
			var tileVal = $(this).data('tile-value'); //stores data attribute for each tile clicked
			var tileLoc = $(this); //stores jquery object of clicked tile div
			
			this.innerHTML = '<h2>'+tileVal+'</h2>'; //displays clicked tile's data attribute on HTML page

			flippedTileArr.push(tileVal); // pushes clicked tile data attribute into flippedTileArr
			tileLocArr.push(tileLoc); // pushes clicked '.cell' obj into tileLocArr

			tilesFlipped++; // flip counter per turn

			// 2 tiles must be clicked + not all tiles flipped		
			if ((tilesFlipped === 2) && (totalTilesFlipped < tileValueArr.length)) {
				
				compareTile(flippedTileArr, tileLocArr, player); //compares click#1 tile / click#2 tile
				
				flippedTileArr = [];
				tilesFlipped = 0;
			}; //end if statement

			// IF ALL TILES ON SCREEN CLICKED:
			if (totalTilesFlipped === tileValueArr.length) {
				gameDone(); // Game Complete - updates comment box:
				playerTurn++ // Increments playerTurn counter - determines Player 1 turn, Player 2 turn, comparePlayerScore function

				if (playerTurn === 1){ //enables Player 2 game 
					setTimeout(function(){ 
					clearTiles(); // clear tiles
					totalTilesFlipped = 0; // resets Player 1's previous total tiles flipped

					playerTurnNotice('Player 2'); // comment board - Player 2's Turn!

					newGame('pTwo'); // Starts Player 2 Game
					}, 2000); //end setTimeout function
				};

				if (playerTurn === 2) { //
					setTimeout(function() {
					comparePlayerScore(); //compares Player 1 score + Player 2 score
					}, 1750); //end setTimeout function
				};
			}; // end if statement
		}); // end ('.cell') event listener			
	}; //ends listenTileClicks function

	// COMPARES PLAYER 1 SCORE VS PLAYER 2 SCORE
	var comparePlayerScore = function(){
		if (playerOneScore > playerTwoScore) {
			$('.commentBox').html('<h4>Player 1 WINS!</h4>')
		} else {
		 	$('.commentBox').html('<h4>Player 2 WINS!</h4>');
		}
	} //end comparePlayerScore function


	// CREATE TILE DIV - display Tiles on Screen
	var createTiles = function (taco) {
			var createTileDiv = ''; //creates empty string variable

			//for loop creates tiles <div> and appends to html .gameboard container
			for (var i=0; i < taco.length; i++){
				createTileDiv += '<div id="cell_'+ i +'" data-tile-value=" '+tileValueArr[i]+' " class="col-xs-1 cell tile"></div>';
			} $('#gameBoardRow').append(createTileDiv); 
	} //end createTile function


	// ClEARS TILE VALUES FROM BOARD
	var clearTiles = function () {
		$('.cell').remove();
	} //end clearTiles function


	// COMPARE SELECTED TILES - MATCH? NO MATCH?
	var compareTile = function (taco, taco2, player){
		if (taco[0] === taco[1]) { //if Tile#1 matches Tile#2 
				if (player === 'pOne') {
					commentMissMatch('Match');
					playerOne('Match');
				} 
				else if (player === 'pTwo') {
				 	commentMissMatch('Match');
				 	playerTwo('Match');
				};

				tileLocArr = []; //empties click#1 & click#2 array
				totalTilesFlipped +=2;  //increments total tile flipped counter

		} else { //if no match occurs
				if (player === 'pOne') {
					commentMissMatch('Miss');
					playerOne('Miss');
				} 
				else if (player === 'pTwo') {
					commentMissMatch('Miss');	
					playerTwo('Miss');
				}; 

				setTimeout(function(){
					resetTile(taco2); //calls function to clear tile value if no match occurs
				}, 700); //sets timer before function fires
				
				tileLocArr = []; //empties click#1 & click#2 array
		}; //end if else statement

	}; //end compareTile function


	//UPDATES - PLAYER ONE SCORES
	var playerOne = function(taco) {
		if (taco === 'Match') {
			playerOneScore += 150; //counter adds +150 points for every match
			playerOneMatch += 1; //counter adds +1 for every
		} 
		else if (taco === 'Miss') {
			playerOneScore -= 25;
			playerOneMisses += 1;	
		};
			pScoreUpdates('pOneScore', 'pOne'); //calls function to update Score box
			pScoreUpdates('pOneMatch', 'pOne'); //calls function to update Match box
			pScoreUpdates('pOneMiss', 'pOne'); //calls function to update Miss box
	}; //end PlayerOne function


	//UPDATES - PLAYER TWO SCORES
	var playerTwo = function(taco) {
		if (taco === 'Match') {
			playerTwoScore += 150; //counter adds +150 points for every match
			playerTwoMatch += 1; //counter adds +1 for every
		} 
		else if (taco === 'Miss') {
			playerTwoScore -= 25;
			playerTwoMisses += 1;	
		}; //end else if statement
			pScoreUpdates('pTwoScore', 'pTwo'); //calls function to update Score box
			pScoreUpdates('pTwoMatch', 'pTwo'); //calls function to update Match box
			pScoreUpdates('pTwoMiss', 'pTwo'); //calls function to update Miss box
	}; //end playerTwo function



	// RESET TILE IF NO MATCH
	var resetTile = function(taco) {
			taco[0][0].innerHTML = ""; //inserts empty string to clear tile
			taco[1][0].innerHTML = ""; //inserts empty string to clear tile
	}; //end resetTile function


	// COMMENTS - MATCH! or NO MATCH!
	var commentMissMatch = function (taco) {
		if (taco === 'Match') {
			$('.commentBox').html('<h4>Match +150 points</h4>');
		} else if (taco === 'Miss') {
			$('.commentBox').html('<h4>No Match<br/> -25 points</h4>');
		};

		setTimeout(function(){
			$('.commentBox').html("")
		}, 1500); //Clears comment board after timed delay
	}; //end of commentMissMatch
	

	// COMMENTS - GAME DONE!
	var gameDone = function() {
		$('.commentBox').html('<h4>Nice Job! Game Complete!!</h4>');
	}; //End gameDone function


	// COMMENTS - PLAYER'S TURN TO GO!
	var playerTurnNotice = function(taco) {
		$('.commentBox').html('<h4 id="playerStartComment">'+ taco + ' START!</h4>');

		setTimeout(function(){
			$('.commentBox').html("")
		}, 5000);
	}; //End playerTurnNotice function


	// PLAYER SCORE UPDATES - ScoreBoard and CommentBox
	var pScoreUpdates = function(taco, taco2) {
		if (taco2 === 'pOne') {
			if (taco==='pOneScore') {
				$('.pOneScore').html('<h5>Score<br/>'+ playerOneScore +'</h5>');
			} else if (taco==='pOneMiss') {
				$('.pOneMiss').html('<h5>Miss<br/>' + playerOneMisses +'</h5>'); 
			} else if (taco==='pOneMatch') {
				$('.pOneMatch').html('<h5>Match<br/>' + playerOneMatch +'</h5>'); 
			}  //ends nested if statement

		} else if (taco2 === 'pTwo') {
			if (taco==='pTwoScore') {
				$('.pTwoScore').html('<h5>Score<br/>'+ playerTwoScore +'</h5>');
			} else if (taco==='pTwoMiss') {
				$('.pTwoMiss').html('<h5>Miss<br/>' + playerTwoMisses +'</h5>'); 
			} else if (taco==='pTwoMatch') {
				$('.pTwoMatch').html('<h5>Match<br/>' + playerTwoMatch +'<h/5>'); 
			}  //ends nested if statement
		}; //ends orig if statement
	}; //end of pScoreUpdates function

}); //end of main jquery function


	