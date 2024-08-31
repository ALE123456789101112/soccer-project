//howItWorksText uses AI to make the explanation of the program more readable and structured
//Background image comes from microsoft copilot AI
var index = 0;//determines the poisition of the items in the list
var teams = [];//empty list that the user has to fill out
var winRate = [];//empty list that the user has to fill out
var tempTeam = "";//temporary variable to determine if the user has filled in the newTeamInput
var tempWin=0;//temporary variable to determine if the user has filled in the win%Input
var teamPoints=[];//empty list that is calculated and filled out once the league table has been simulated
var teamString = "";//string element that adds all the items of the team list on new lines
var pointString = "";//string element that adds all the items of the teamPoints list on new lines
var logString = "";//string element that compiles all of the match results and returns the result each fixture

onEvent("confirm", "click", function( ) {
  tempTeam = getText("newTeamInput");
  tempWin = getText("win%Input");
  if (tempTeam == ""||tempWin==""||tempWin>100||tempWin<0) {//making sure that the user inputs are valid
    setText("teamList", "Please enter a name for your team");
    setText("win%List", "Please enter a number from 0 to 100");
    //if the user's input is invalid, then they will be forced to re-enter the team and win %
  } else {
    appendItem(teams, getText("newTeamInput"));
    //adds the new team based on the user input
    appendItem(winRate, getText("win%Input"));
    //adds the new win rate based on the user input
    appendItem(teamPoints, 0);
    //adds a 0 to the team points list for the future when the league table will be simulated
    updateScreen();
  }
});


onEvent("previousTeam", "click", function( ) {
  if (index > 0) {
    index = index - 1;
    updateScreen();
  } //when the left button is clicked and the index is greater than 0, then its value decreases by one, 
  //therefore the position of the list goes one back
});

onEvent("nextTeam", "click", function( ) {
  if (index < teams.length - 1) {
    index = index + 1;
    updateScreen();
  } //when the right button is clicked and the index is less than 1 subtracted from the length of the list,
  //then its value increases by one, therefore the position of the list goes one forward
});

onEvent("table", "click", function( ) {//making each team face each other twice
  for (var k = 0; k < teams.length; k++) {//home team
    for (var i = 0; i < teams.length; i++) {//away team
      if (k != i) {//the same team can't play itself
        var matchResult = playGame(k, i);
        console.log(matchResult);
        logString = logString+matchResult+"\n\n";
      }
    }
  }
  setScreen("Table");
  for (var t = 0; t < teams.length; t++) {
    teamString = teamString+teams[t]+"\n";//displaying the teams for the table screen
    pointString = pointString+teamPoints[t]+"\n";//displaying the points for the table screen
  }
  setProperty("teamDisplay", "text", teamString);
  setProperty("pointsDisplay", "text", pointString);
  setText("leagueWinner", determineLeagueWinner(teamPoints, teams));
  //determining the league winner using the function determineLeagueWinner
});

onEvent("viewLogs", "click", function( ) {
  setScreen("logScreen");
  setProperty("logs", "text", logString);
});

onEvent("backButton", "click", function( ) {
  setScreen("Table");
});
onEvent("howItWorks", "click", function( ) {
  setScreen("howItWorksScreen");
});
onEvent("backButton2", "click", function( ) {
  setScreen("homeScreen");
});

function updateScreen() {//fucntion to update the screen whenver the user moves back and forth between the pages
    setProperty("teamList", "text", teams[index]);
    setProperty("page", "text", index+1);
    setProperty("win%List", "text", winRate[index]+"% win rate");
    setProperty("newTeamInput", "text", "");
    setProperty("win%Input", "text", "");
}

function playGame(team1Index, team2Index) {//function that simulates a game between 2 teams by comparing their win rates
  winRate[team2Index] = winRate[team2Index] - randomNumber(1, 10);
  //subtracting a random number between 1 and 10 from the win% of the away team because home teams have an advantage
  if (winRate[team1Index] > winRate[team2Index]) {
    teamPoints[team1Index] = teamPoints[team1Index] + 3;//adding 3 points to the winning team
    return (teams[team1Index] + " wins against "+teams[team2Index]+" at home!");
  } else if (winRate[team1Index] < winRate[team2Index]) {
    teamPoints[team2Index] = teamPoints[team2Index] + 3;//adding 3 points to the winning team
    return ((teams[team1Index] + " loses against ")+teams[team2Index]+" at home!");
  } else if ((winRate[team1Index] == winRate[team2Index] )) {
    teamPoints[team1Index] = teamPoints[team1Index] + 1;
    teamPoints[team2Index] = teamPoints[team2Index] + 1;//adding 1 point to each team if they draw
    return ((teams[team1Index] + " draws to ")+teams[team2Index]+" at home!");
  }
}

function determineLeagueWinner(points, teams) { // Function to determine the winner of the league
    var maxNumber = points[0];//Initialising the max no. of points to the first team's points
    var correspondingTeam = teams[0];//Initialising the corresponding team to the first team
    for (var i = 1; i < points.length; i++) {//looping until all the teams have been accounted for
        if (points[i] > maxNumber) { // If the current team's points are greater than the maxNumber
            maxNumber = points[i];// Updates maxNumber to the current team's points
            correspondingTeam = teams[i];// Updates correspondingTeam to the curren team
        }
    }
    return (correspondingTeam + (" wins the league with " + (maxNumber + " points")));
     // Returning the winning team and their points in a string format to be displayed
}
