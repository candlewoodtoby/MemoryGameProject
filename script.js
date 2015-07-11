$(function(){

//STORES TILE VALUES AND FLIPPED TILE LOCATIONS
var tileValueArr = ['A', 'A', 'B', 'B', 'C', 'C', 'D', 'D', 'E', 'E', 'F', 'F'];
var tileLocArr = []; //collects location of click#1 & click#2 tiles
var totalTilesFlipped = 0; // counts total tiles clicked per game;
var playerOneScore = 0;
var playerOneMisses = 0;
var playerTwoScore = 0;
var playerTwoTurns = 0;

//LISTENS FOR START GAME BUTTON
	$('#game-button').on('click', function(e){
	e.preventDefault();
	newBoard(tileValueArr);
	}); //end #game-button event listener


//SHUFFLES ARRAY OF TILE VALUES
var shuffle = function(taco) {
	var currentIndex = taco.length;
	var tempVal;
	var randomIndex;

	while (0 !== currentIndex) {
		//generates random number
		randomIndex = Math.floor(Math.random() * currentIndex);
		currentIndex -= 1;
		//swap random number with current element
		tempVal = taco[currentIndex];
		taco[currentIndex] = taco[randomIndex];
		taco[randomIndex] = tempVal;
	} // end while loop

	return taco; //returns shuffled array

}; // end shuffle function


//STARTS NEW BOARD 
	var newBoard = function (taco) {
		var createTileDiv = '';

		shuffle(tileValueArr); // Shuffles Tile Val Array

		//for loop creates tiles and displays to screen
		for (var i=0; i < taco.length; i++){
			createTileDiv += '<div id="cell_'+ i +'" data-tile-value=" '+tileValueArr[i]+' " class="col-xs-1 cell"></div>';
		} $('.gameBoard').append(createTileDiv); 

		var flippedTileArr = []; //collects data attribute for each tile clicked
		var tilesFlipped = 0; // counts tiles clicked per player turn;
		// var totalTilesFlipped = 0; // counts total tiles clicked per game;

		//LISTENS FOR TILE CLICKS - FLIPS TILE
		$('.cell').on('click', function(e){
			e.preventDefault();
			var tileVal = $(this).data('tile-value'); //stores data attribute for each tile clicked
			var tileLoc = $(this);
			this.innerHTML = '<h1>'+tileVal+'</h1>'; //displays clicked tile's data attribute on HTML page

			flippedTileArr.push(tileVal); // pushes clicked tile data attribute into flippedTileArr
			tileLocArr.push(tileLoc); // pushes clicked '.cell' obj into tileLocArr

			tilesFlipped++; // flip counter per turn

					
			if ((tilesFlipped === 2) && (totalTilesFlipped < tileValueArr.length)) {
				compareTile(flippedTileArr, tileLocArr);
				flippedTileArr = [];
				tilesFlipped = 0;
			}; 

			if (totalTilesFlipped === tileValueArr.length) {
				console.log('Game Done!');
				gameDone();
			};

		}) // end ('.cell') event listener

	}; //end newBoard function ()


//COMPARE SELECTED TILES - MATCH? NO MATCH?
	var compareTile = function (taco, taco2){
		if (taco[0] === taco[1]) {
			
			yesMatch();//displays Match! on screen

			playerOneScore += 150;

			pOneScoreUpdate();

			pOneMissesUpdate();

			tileLocArr = []; //empties click#1 & click#2 array
			
			totalTilesFlipped +=2;  //increments counter

		} else {
			
			noMatch(); //displays No Match! on screen
			
			playerOneMisses += 1;

			playerOneScore -= 25;

			pOneScoreUpdate();

			pOneMissesUpdate();

			setTimeout(function(){
				resetTile(taco2);
			}, 700); //blanks the non-matching Tiles on Screen
			
			tileLocArr = []; //empties click#1 & click#2 array
		};
	}; //end compareTile function

//RESET TILE IF NO MATCH
	var resetTile = function(taco) {
			taco[0][0].innerHTML = ""; //inserts empty string to clear tile
			taco[1][0].innerHTML = ""; //inserts empty string to clear tile
		}; //end resetTile function


// COMMENT BOX RESPONSES
	var yesMatch = function() {
		$('.commentBox').html('<h4>Match!</h4>'); //Displays Match! on Comment Board

		setTimeout(function(){
			$('.commentBox').html("")
		}, 700); //Clears comment board after timed delay

	}; //end yesMatch function

	var noMatch = function() {
		$('.commentBox').html('<h4>No Match. Please Choose Again</h4>'); //Displays No Match! on Comment Board
		
		setTimeout(function(){
			$('.commentBox').html("")
		}, 700); //Clears comment board after timed delay

	}; //end noMatch Function

	var gameDone = function() {

		$('.commentBox').html('<h4>Nice Job! Game Complete!!</h4>');
		
	}; //End gameDone function

// Player Score Displays

	var pOneScoreUpdate = function() {
		$('.pOneScore').html('<h5>Player 1 Score: ' + '<h3>' + playerOneScore + '</h3></h5>');
	};

	var pOneMissesUpdate = function() {
		$('.pOneMisses').html('<h5>Player 1 Misses: ' + '<h3>' + playerOneMisses + '</h3></h5>');
		$('.commentBox').html('<h5>MISSED!! Lose 25 points!</h5>');
	}

}); //end of main jquery function


	