var index = 0;
var teams = [];
var winRate = [];
var tempTeam = "";
var tempWin = 0;

onEvent("confirm", "click", function( ) {
  tempTeam = getText("newTeamInput");
  tempWin = getText("win%Input");
  if (tempTeam == ""||tempWin==undefined||tempWin>100||tempWin<0) {
    setText("teamList", "Please enter a name for your team");
    setText("win%List", "Please enter a number from 0 to 100");
  } else {
    appendItem(teams, getText("newTeamInput"));
    //updates the screen so that the index changes
    appendItem(winRate, getText("win%Input"));
    updateScreen();
  }
});


onEvent("previousTeam", "click", function( ) {
  if (index > 0) {
    index = index - 1;
  } //when the left button is clicked and the index is greater than 0, then its value decreases by one, 
  //therefore the position of the list goes one back
  updateScreen();
});

onEvent("nextTeam", "click", function( ) {
  if (index < teams.length - 1) {
    index = index + 1;
  } //when the right button is clicked and the index is less than 1 subtracted from the length of the list,
  //then its value increases by one, therefore the position of the list goes one forward
  updateScreen();
});

function updateScreen() {
    setProperty("teamList", "text", teams[index]);
    setProperty("page", "text", index+1);
    setProperty("win%List", "text", winRate[index]+"% win rate");
    setProperty("newTeamInput", "text", "");
    setProperty("win%Input", "text", "");
}

