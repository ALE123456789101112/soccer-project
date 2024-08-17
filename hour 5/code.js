var index = 0;
var teams = [];
var winRate = [];
var tempTeam = "";
var tempWin = 0;
var teamPoints=[];
var teamString = "";
var pointString = "";

onEvent("confirm", "click", function( ) {
  tempTeam = getText("newTeamInput");
  tempWin = getText("win%Input");
  if (tempTeam == ""||tempWin==undefined||tempWin>100||tempWin<0) {
    setText("teamList", "Please enter a name for your team");
    setText("win%List", "Please enter a number from 0 to 100");
  } else {
    appendItem(teams, getText("newTeamInput"));
    appendItem(winRate, getText("win%Input"));
    appendItem(teamPoints, 0);
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

onEvent("table", "click", function( ) {
  for (var k = 0; k < teams.length; k++) {
    for (var i = 0; i < teams.length; i++) {
      if (k != i) {
        var matchResult = playGame(k, i);
        console.log(matchResult);
      }
    }
  }
  setScreen("Table");
  for (var t = 0; t < teams.length; t++) {
    teamString = teamString+teams[t]+"\n";
    pointString = pointString+teamPoints[t]+"\n";
  }
  setProperty("teamDisplay", "text", teamString);
  setProperty("pointsDisplay", "text", pointString);
});



function updateScreen() {
    setProperty("teamList", "text", teams[index]);
    setProperty("page", "text", index+1);
    setProperty("win%List", "text", winRate[index]+"% win rate");
    setProperty("newTeamInput", "text", "");
    setProperty("win%Input", "text", "");
}

function playGame(team1Index, team2Index) {
  winRate[team2Index] = winRate[team2Index] - randomNumber(1, 10);
  //subtracting a random number between 1 and 10 from the win% of the away team because home teams have an advantage
  if (winRate[team1Index] > winRate[team2Index]) {
    teamPoints[team1Index] = teamPoints[team1Index] + 3;
    return (teams[team1Index] + " wins against "+teams[team2Index]+" at home!");
  } else if (winRate[team1Index] < winRate[team2Index]) {
    teamPoints[team2Index] = teamPoints[team2Index] + 3;
    return ((teams[team1Index] + " loses against ")+teams[team2Index]+" at home!");
  } else if ((winRate[team1Index] == winRate[team2Index] )) {
    teamPoints[team1Index] = teamPoints[team1Index] + 1;
    teamPoints[team2Index] = teamPoints[team2Index] + 1;
    return ((teams[team1Index] + " draws to ")+teams[team2Index]+" at home!");
  }
}
