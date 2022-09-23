var n= 2; //Number of squares back to check for match.
var displayTime = 2000; //Time to display each square.
var currentIndex; //To hold the currently selected square index.
var matchGuessed=false; //Whether user recently guessed a match.

//Set up 9 squares in table.
var table = document.getElementById("mainTable");

//Squares are true when on, and false when off.
var squareStates = [false, false, false,
		false, false, false,
		false, false, false];
		

//Place squares in table.
var squareNumber=1;
for(let i=0; i<3; i++)
{
	var row = table.insertRow(i);
	for(let k=0; k<3; k++)
	{
	  	var cell= row.insertCell(k);
	  	cell.innerHTML='<img src="images/square.png" width="150" height="150" id="square'+squareNumber+'">';
	  	squareNumber++;
	}		
}

var lastTime=Date.now();

var numberList=[]; //Square index list. (For guesses.)

//Recursive function acting as game loop. 
function gameLoop()
{
	//If it has been 3 seconds, switch active square. 
	if(Date.now() - lastTime >= displayTime)
	{
		lastTime=Date.now(); //Update time.
		
		//Check if match was not guessed when it should have been.
		if(!matchGuessed && numberList.length>(n+1) && currentIndex==numberList[(numberList.length-1-n)]) 
		{
			console.log("Wrong.");
			flashBorderColor("#AA5555");
		}
		
		//Select random square.
		currentIndex = Math.trunc(Math.random()*9);
		for(let i=0; i<9; i++)
		{
			if(i==currentIndex)
			{
				squareStates[i]=true;
				
			}
			else
			{
				squareStates[i]=false;
			}
		}
		numberList.push(currentIndex);
		matchGuessed=false;
		clearAndUpdate(); 
	}
	setTimeout(gameLoop, 250);
}

//Updates squares to match squareStates array.
function updateSquares()
{
	for(let i=0; i<9; i++)
	{
		var squareImage;
		if(squareStates[i]==false)
		{
			squareImage="images/square.png";
		}
		else
		{
			squareImage="images/filled.png";
		}
		var squareName = "square"+(i+1);
		document.getElementById(squareName).src=squareImage;
	}
}

function startGame()
{
	console.log("Starting game.");
	//Make game visible and start loop.
	document.getElementById("startGameButton").style.display="none";
	document.getElementById("game").style.display="block"; 
	gameLoop();
}

//Check if match for n-back.
function clickedMatch()
{
	var back = numberList[(numberList.length-1-n)]; //Previous index for comparison.
	var table = document.getElementById("mainTable");
	if(numberList.length > (n+1) &&currentIndex==back)
	{
		console.log("Correct");
		flashBorderColor("#55FF55");
		
	}
	else
	{
		console.log("Wrong");
		flashBorderColor("#AA5555");
	}
	matchGuessed=true;
}

function changeBorderColor(color)
{
	document.getElementById("mainTable").style.borderColor=color;
}

function flashBorderColor(color)
{
  	changeBorderColor(color);
  	setTimeout(function(){changeBorderColor("#555555")}, 1000);
}

//Clear all squares for a short time, then update squares.
function clearAndUpdate()
{
	for(let i=0; i<9; i++)
	{
		document.getElementById("square"+(i+1)).src="images/square.png";
	}
	setTimeout(updateSquares, 500);
}
