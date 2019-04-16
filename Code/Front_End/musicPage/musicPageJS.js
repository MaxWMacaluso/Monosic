/*
[IMPORTANT]
You are free to create any number of helper function you want.
We know the problem could be seached online, and we are aware of those solutions. 
So please sight sources if you took help from any online resource.
*/

//When HtML is ran, it reads JS file and executes this code.

//IDs for all the table elements. You get the cell element just by using document.getElementById("A1")
var table_ids = ["A1", "A2", "A3", "B1", "B2", "B3", "C1", "C2", "C3"]

/*
An integer array of length 9. 
Usaged: This is to store the state to the tictactoe board.
When a move is made 
(Example player 1 (who is X) move at Cell 'A1' --- The board_state[0] will be made 1 )
Similarly, A move by player 2(who is O) at Cell 'A3' --- The board_state[2] will be made 0 )
We store the move of player 1 as '1' and player 2 as '0'. So after the above two moves the state should look like
[1, -1, 0, -1, -1, -1, -1, -1, -1]
*/
var board_state = [-1,-1,-1,-1,-1,-1,-1,-1,-1]


// A flag to keep track of the status of the game, false means the game is not started. The default value is set to false
var started = false

/* 
A variable to keep track of each players turn. Since the game always starts with player 1 - The default value is set to '1'
1 means player_1
0 means player_0
*/
var turn = 1 

/*
 @Return boolean
 @Param _str - A string variable - Note the type is not checked in the implementation
 The methods @Returns true is the _str is null or it has a length of 0, otherwise, the methods returns false
*/
function isEmpty(_str) 
{
	return (!_str || 0 === _str.length)
}

/*
@Return int This return the turn variable. Please note that 
turn = 1 is for player_1 and 
turn = 0 is for player_2
@Param - No param
*/
function whose_move(){
	return this.turn
}

/*
@Return void
@Param 
This methods toggles the 'turn' variable.
if the turn is set to 1 it will make it 0
if the turn is set to 0 it will make it 1
*/
function toggle_move() {
	this.turn = !this.turn
}

/*
@Return boolean
@Param 
The method returns the value of the 'started' flag.
true means the game has started
false means the game has not started
When the game has not started the flag is set to false. As soon as the game starts the flag must be set to true.
Once the game has finished or user has clicked on reset_play the flag must be set to false.
*/
function game_started(){
	return this.started
}


/*
TODO - Rule 1 (Done)
This is the first method you'll implement. This method is called when the Begin Play button is clicked.
The method should do all the validations as stated in rule 1.
1. Verify if the player names are empty or not. Raise an alert if they are empty. (Done)
2. If the field are empty don't start the game. This just means the function will return and do nothing. The 'started' flag will not be modified. (Done)
3. If all verification is successful, disable the name fields and update the player moves as shown in the image. (Done)
4. If all verification is successful, update the turn information on the page. (See the source code and image). And set the started flag to true.(this will help you track at any instant if the game is in start state or not.) (Done)
5. Once game has started, Handle multiple clicks on begin play.
*/

var counter = 0; //Global variable I created to ensure "Begin Play" can only be clicked once.

function begin_play()
{
 	if (isEmpty(document.getElementById("player1_id").value) == true)
 	{
		alert("Player One name is empty!"); //Makes a pop up window in safari.
		return;
 	}
 	if (isEmpty(document.getElementById("player2_id").value) == true)
 	{
		alert("Player Two name is empty!");
		return;
	}
 	started = true;
	 
	document.getElementById("player1_id").disabled = true;
	document.getElementById("player2_id").disabled = true;
	if (counter == 0) //Will only do it once.
	{
		document.getElementById("player1_id").value += " (X)";
		document.getElementById("player2_id").value += " (O)";
	}
	document.getElementById("turn_info").innerHTML = "Turn for: " + whichPlayerConverter();
	//document.getElementById("turn_info").innerHTML = "Turn for: " + whose_move();
	if (counter >= 1)
	{
		document.getElementById("beginPlay").onclick = alert("Already started. Please press Reset Play to start again.");
	}

	counter++;
}

/*
TODO - Rule 2 (Done)
This is the second method you'll implement. This method is called when the Reset Play button is clicked.
The method should do all the things as stated in rule 2.
1. The reset play button should reset the whole game.(At any time when reset is clicked - All the three text boxes should be cleared and Turn should be set to the default message.) (Done)
2. The text boxes for entering name should be enablled back. (Done)
3. The Tic Tac Toe Grid should be set to its default entries. (Done)
4. Clicking reset play again and again shall have the same effect (or no effect when clicked multiple times). Remember to set the strated flag as false (Done)

*/

//Turn set to defualt message ???
function reset_play()
{

	counter = 0; //Resets counter for the begin play button
	started = false;
	turn = 1; //0 is for player 2

	//Enables the boxes
	document.getElementById("player1_id").disabled = false; //Returns the element that has the ID attribute with the specified value.
	document.getElementById("player2_id").disabled = false;
	
	//Resets board_state
	for (var i = 0; i < 9; i++)
	{
		board_state[i] = -1;
	}
	//Resets table
	for (var x = 0; x < 9; x++)
	{
		document.getElementById(table_ids[x]).innerHTML = table_ids[x];
	}

	//Clears text boxes
	document.getElementById("player1_id").value = "";
	document.getElementById("player2_id").value = "";
	document.getElementById("move_text_id").value= "";
}

/*
TODO - Rule 3
This is the last method you'll implement. This method is called everytime a move has been player( Play button was clicked).
The method should do all the things as stated in rule 2.
1. The moves should be validated can only be these ["A1", "A2", "A3", "B1", "B2", "B3", "C1", "C2", "C3"] (Done)
2. Invalid moves should be reported by an alert message.(You are encorraged to use Modal which you learned in HW1 - Usage is not mandatory.) (Done)
3. If the move is a valid move, the grid should be updated with the correct move (Player 1 is always - 'X', and Player 2 is always 'O' (This is not zero!)) - The turn information should also be updated
	Hint: Use the turn variable to figure out who is currently playing. Use to toggle method to change moves.
4. A move should always be a valid move. (Example: If say a move was made in already filled cell, it should be invalidated with an alert.)
5. If the game has not started, clicking on <b>Play</b> should give an alert "The game has not started."<br/>
6. After any move, the state of the table should be validated.(see the document attached in the homework) 
   If the there is winner - Show it in an alert message - (Ex - Winner is X or O) - Displaying name is not important. <br/>
7. The game should reset itself once a winner is determined.<br/>
8. After all the moves have exhausted, you're not required to display any message. (It should be obvious to Reset play.)<br/>

*/

//Helper function to determine who's turn it is
function whichPlayerConverter()
{
	if (whose_move() == true)
	{
		return "X";
	}
	else
	{
		return "O";
	}
}

//When play function is clicked, this function executes
function play() 
{
	var inTable = false;

	//Checks to see if move is valid
	for (var x = 0; x < 9; x++)
	{
		if (document.getElementById("move_text_id").value == table_ids[x]) //Will only be set to true if it is in table
		{
			inTable = true;
		}
	}

	//If invalid move
	if (inTable == false && game_started() == true)
	{
		alert("You have entered an invalid move!");
	}

	//Will go through and find element in array that user input is equal to.
	var index = -1;
	for (var x = 0; x < 9; x++)
	{
		if (table_ids[x] == document.getElementById("move_text_id").value)
		{
			index = x;
			break;
		} 
	}

	//Will only go into conditional if someone has entered a valid value
	//After will check if there is a winner and act accordingly
	if (document.getElementById("move_text_id").value != "" && inTable == true)
	{
		//Will set the position on the board equal to who's turn it is.
		//Will only let you move there if someone hasnt already.
		var rightTurn = false;
		if (whose_move() == 1) //If player 1
		{
			if (board_state[index] == -1) //If no one has moved there
			{
				//alert("Here");
				board_state[index] = 1;
				document.getElementById(document.getElementById("move_text_id").value).innerHTML = "X";
				rightTurn = true;
			}
			else
			{
				alert("Someone already moved there!");
			}
		}
		if (whose_move() == 0)
		{
			if (board_state[index] == -1)
			{
				board_state[index] = 0;
				document.getElementById(document.getElementById("move_text_id").value).innerHTML = "O";
				rightTurn = true;
			}
			else
			{
				alert("Someone already moved there!");
			}
		}

		var gameOver = false; //Handles case where game would end and "Game has not started" warning would both go.
		
		//Here I am checking if there has been a winner
		if ((board_state[0] == 1 && board_state[1] == 1 && board_state[2] == 1) || (board_state[3] == 1 && board_state[4] == 1 && board_state[5] == 1) || (board_state[6] == 1 && board_state[7] == 1 && board_state[8] == 1) || (board_state[0] == 1 && board_state[3] == 1 && board_state[6] == 1) || (board_state[1] == 1 && board_state[4] == 1 && board_state[7] == 1) || (board_state[2] == 1 && board_state[5] == 1 && board_state[8] == 1) || (board_state[0] == 1 && board_state[4] == 1 && board_state[8] == 1) || (board_state[2] == 1 && board_state[4] == 1 && board_state[6] == 1))
		{
			alert("Winner is X");
			gameOver = true;
			reset_play();
		}
		if ((board_state[0] == 0 && board_state[1] == 0 && board_state[2] == 0) || (board_state[3] == 0 && board_state[4] == 0 && board_state[5] == 0) || (board_state[6] == 0 && board_state[7] == 0 && board_state[8] == 0) || (board_state[0] == 0 && board_state[3] == 0 && board_state[6] == 0) || (board_state[1] == 0 && board_state[4] == 0 && board_state[7] == 0) || (board_state[2] == 0 && board_state[5] == 0 && board_state[8] == 0) || (board_state[0] == 0 && board_state[4] == 0 && board_state[8] == 0) || (board_state[2] == 0 && board_state[4] == 0 && board_state[6] == 0))
		{
			alert("Winner is O");
			gameOver = true;
			reset_play();
		}
		if (rightTurn)
		{
			toggle_move(); //Switches who's turn it is.
		}
	}
	document.getElementById("turn_info").innerHTML = "Turn for: " + whichPlayerConverter();

	if ((game_started() == false) && (document.getElementById("playButton").onclick) && gameOver == false)
	{
		alert("The game has not started");
	}
}

/*
Do not change this method.
*/
function moveEnter(event) {		
	if(event.keyCode == 13) {
		event.preventDefault()
		play()
	}

}
