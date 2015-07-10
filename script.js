$(function(){

//STORES TILE VALUES AND FLIPPED TILE LOCATIONS
var tileValueArr = ['A', 'A', 'B', 'B', 'C', 'C', 'D', 'D', 'E', 'E', 'F', 'F', 'G', 'G', 'H', 'H'];
var tileLocArr = []; //collects location of flipped tiles


//LISTENS FOR START GAME BUTTON
	$('#game-button').on('click', function(e){
	e.preventDefault();
	newBoard(tileValueArr);
	}); //end #game-button event listener


//STARTS NEW BOARD 
	var newBoard = function (taco) {
		var createTileDiv = '';

		for (var i=0; i < taco.length; i++){
			createTileDiv += '<div id="cell_'+ i +'" data-tile-value=" '+tileValueArr[i]+' " class="col-xs-1 cell"></div>';
		} $('.gameBoard').append(createTileDiv); // creates tiles and displays to screen

		var flippedTileArr = []; //collects data attribute for each tile clicked
		var tilesFlipped = 0; // counts how man tiles flipped

		$('.cell').on('click', function(e){
			e.preventDefault();
			var tileVal = $(this).data('tile-value'); //stores data attribute for each tile clicked
			var tileLoc = $(this);
			this.innerHTML = '<h1>'+tileVal+'</h1>'; //displays clicked tile's data attribute on HTML page

			flippedTileArr.push(tileVal); // pushes clicked tile data attribute into flippedTileArr
			tileLocArr.push(tileLoc); // pushes clicked tile data obj into tileLocArr

			tilesFlipped++; // flip counter
		
			console.log(tileLocArr);

			if (tilesFlipped === 2) {
				compareTile(flippedTileArr, tileLocArr);
				flippedTileArr = [];
				tilesFlipped = 0;
			}
		}) // end ('.cell') event listener
	}; //end newBoard function ()


//COMPARE SELECTED TILES - MATCH? NO MATCH?
	var compareTile = function (taco, taco2){
		if (taco[0] === taco[1]) {
			console.log('you have a match');
			tileLocArr = [];
			yesMatch();
		} else {
			noMatch();
			setTimeout(function(){
				resetTile(taco2);
			}, 2000);
			tileLocArr=[];
		};
	}; //end of compareTile

//RESET TILE IF NO MATCH
	var resetTile = function(taco) {
			taco[0][0].innerHTML = "";
			taco[1][0].innerHTML = "";
		}; //end of resetTile function


// COMMENT BOX RESPONSES
	var yesMatch = function() {
		$('.commentBox').html('<h4>Match!</h4>');
		setTimeout(function(){
			$('.commentBox').html("")
		}, 2000);
	}; //end of yesMatch function

	var noMatch = function() {
		$('.commentBox').html('<h4>No Match. Please Choose Again</h4>');
		setTimeout(function(){
			$('.commentBox').html("")
		}, 2500);
	}; //end of noMatch Function

}); //end of document


	