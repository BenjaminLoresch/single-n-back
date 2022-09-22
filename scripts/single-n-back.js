
//Set up 9 squares in table.
var table = document.getElementById("mainTable");
console.log("Have table: "+table);
//Squares are true when on, and false when off.
var squareStates = [false, false, false,
		false, false, false,
		false, false, false];
		

//Place squares in table.
for(var i=0; i<3; i++)
{
	var row = table.insertRow(i);
	for(var k=0; k<3; k++)
	{
	  	var cell= row.insertCell(k);
	  	cell.innerHTML='<img src="images/square.png" width="150" height="150" id="square'+i+k+'">';
	}		
}
