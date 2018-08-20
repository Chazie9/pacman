Overview
Simple pacman game that collects coins and returns final x and y position and amount of coins collected

Inputs
The program will take as an input the name of a text file (ie. "input.txt") residing in the same directory and that contains the following inputs:
board_dimension is defined by X and Y coordinates, identifying the top right corner of the room rectangle. This board is divided up in a grid based on these dimensions; a board that has dimensions X: 5 and Y: 5 has 5 columns and 5 rows, so 25 possible positions. The bottom left corner is defined by X: 0 and Y: 0.
initial_position is the initial position (in X/Y coordinates) of the PAC-MAN.
movements are instructions in cardinal directions where e.g. N and E mean "go north" and "go east", respectively)
walls are the X/Y positions of walls that are in the board, the PAC-MAN cannot move through walls.

Output
The final location of the PAC-MAN (x,y) - using Cartesian coordinate system
The number of coins that have been collected across all movements

Testing
node pacman.js
change examples by altering input.txt file
