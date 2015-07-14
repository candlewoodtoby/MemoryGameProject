# MemoryGameProject

Technologies Used:
This program consists of HTML, CSS, Javascript, Jquery. I primarily focused on Javascript.

GamePlay: 
Press Start button. A grid of tiles appear on screen. Player 1 must select two matching tiles. For each Match, player 1 is awarded 150 points. For each Miss, player 1 is penalized -25 points. After all tiles are matched, the tile grid clears and Player 2's round begin. At the end of Player 2's turn, a winner is determined by the highest score. 

Approach Taken:
All components of the game are arranged in functions. 
jQuery listens for the start button click, and then proceeds down the chain of functions: player 1 notice to start, shuffling the array of tile values, creating a grid of tiles on screen, and then prompting player 1 to click two tiles. jQuery listens for two clicks, records tile + value in an array, initiates a function to compare the two values and determines a Match or Miss. If Match, player 1 scores and tiles remain displayed. If Miss, player 1 penalized and tiles flip back to hidden. After Player 1 and Player 2 complete each tile grid Matches, a function compares each respective Player Score and determines a winner. 

Unsolved Problems:
1. clicking on same tile results in double recording of same tile as a Match.

2. cliking on start button more than 1 time results in multiple tile grids being generated on screen.

3. enabling a toggle btwn one player game and two player game

