$(function(){

//STORES TILE VALUES AND FLIPPED TILE LOCATIONS
var tileValueArr = ['A', 'A', 'B', 'B', 'C', 'C', 'D', 'D', 'E', 'E', 'F', 'F'];
var tileLocArr = []; //collects location of click#1 & click#2 tiles
var totalTilesFlipped = 0; // counts total tiles clicked per game;

//Stores Player One Score and Misses
var playerOneScore = 0;
var playerOneMisses = 0;
var playerOneMatch = 0;

//Stores Player Two Score and Misses
var playerTwoScore = 0;
var playerTwoTurns = 0;

//LISTENS FOR START GAME BUTTON
	$('#game-button').on('click', function(e){
	e.preventDefault();
	newBoard(tileValueArr);
	}); //end #game-button event listener


//SHUFFLES ARRAY OF TILE VALUES
var shuffle = function(taco) {
	var currentIndex = taco.length; //stores # of elements in tileValueArr []
	var tempVal; // temp stores index value #1 from array
	var randomIndex; // stores random number generated

	while (0 !== currentIndex) { //#loops not to exceed # elements in tileValueArr []
		//generates random number
		randomIndex = Math.floor(Math.random() * currentIndex);
		currentIndex -= 1; //counts # loops
		//swap random number with current element
		tempVal = taco[currentIndex];
		taco[currentIndex] = taco[randomIndex];
		taco[randomIndex] = tempVal;
	} // end while loop

	return taco; //returns shuffled array

}; // end shuffle function


//STARTS NEW BOARD 
	var newBoard = function (taco) {
		var createTileDiv = ''; //creates empty string variable

		shuffle(tileValueArr); // Shuffles Tile Val Array

		//for loop creates tiles <div> and appends to html .gameboard container
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

			// 2 tiles must be clicked + not all tiles flipped		
			if ((tilesFlipped === 2) && (totalTilesFlipped < tileValueArr.length)) {
				compareTile(flippedTileArr, tileLocArr); //com
				flippedTileArr = [];
				tilesFlipped = 0;
			}; 

			// if all tiles clicked, ends game
			if (totalTilesFlipped === tileValueArr.length) {
				gameDone(); //updates comment Box: Game is complete
			};

		}) // end ('.cell') event listener

	}; //end newBoard function ()


//COMPARE SELECTED TILES - MATCH? NO MATCH?
	var compareTile = function (taco, taco2){
		if (taco[0] === taco[1]) {
			
			yesMatch();//updates commentBox + displays Match! on screen

			playerOneScore += 150; //counter adds +150 points for every match

			playerOneMatch += 1; //counter adds +1 for every

			pOneScoreUpdate(); //calls function to update Score box

			pOneMatchUpdate(); //calls function to update Match box

			tileLocArr = []; //empties click#1 & click#2 array
			
			totalTilesFlipped +=2;  //increments total tile flipped counter

		} else { //if no match occurs
			
			noMatch(); //displays No Match! on screen
			
			playerOneMisses += 1; //counter increments Miss 

			playerOneScore -= 25; //dudects -25 penalty for each Miss

			pOneScoreUpdate(); //calls function to update Score Box

			pOneMissesUpdate(); //calls function to update Miss Box

			setTimeout(function(){
				resetTile(taco2); //calls function to clear tile value if no match occurs
			}, 700); //sets timer before function fires
			
			tileLocArr = []; //empties click#1 & click#2 array
		};
	}; //end compareTile function

//RESET TILE IF NO MATCH
	var resetTile = function(taco) {
			taco[0][0].innerHTML = ""; //inserts empty string to clear tile
			taco[1][0].innerHTML = ""; //inserts empty string to clear tile
		}; //end resetTile function


// COMMENT BOX RESPONSES
	
	// updates Comment Box - Match!
	var yesMatch = function() {
		$('.commentBox').html('Match +150 points'); //Displays Match! on Comment Board

		setTimeout(function(){
			$('.commentBox').html("")
		}, 1500); //Clears comment board after timed delay

	}; //end yesMatch function

	// updates Comment Box - Miss!
	var noMatch = function() {
		$('.commentBox').html('No Match<br/>-25 points'); //Displays No Match! on Comment Board
	
		setTimeout(function(){
			$('.commentBox').html("")
		}, 1500); //Clears comment board after timed delay

	}; //end noMatch Function

	// updates Comment Box - Game Done!
	var gameDone = function() {

		$('.commentBox').html('Nice Job! Game Complete!!');
		
	}; //End gameDone function


// Player Score Displays

	// updates P1 Score Counter
	var pOneScoreUpdate = function() {
		$('.pOneScore').html('Score: <br/>'+ playerOneScore);
	};

	// updates P1 Miss Counter
	var pOneMissesUpdate = function() {
		$('.pOneMiss').html('Miss: <br/>' + playerOneMisses); 
		//displays playerOneMisses counter current reading
	};

	// updates P1 Match Counter
	var pOneMatchUpdate = function() {
		$('.pOneMatch').html('Match: <br/>' + playerOneMatch); 
	}; //displays playerOneMatch counter current reading


}); //end of main jquery function


	