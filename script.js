"use strict";

/**
 * Globalt objekt som innehåller de attribut som ni skall använda.
 * Initieras genom anrop till funktionern initGlobalObject().
 */
let oGameData = {};

initGlobalObject();

/**
 * Initerar det globala objektet med de attribut som ni skall använda er av.
 * Funktionen tar inte emot några värden.
 * Funktionen returnerar inte något värde.
 */
function initGlobalObject() {

    //Datastruktur för vilka platser som är lediga respektive har brickor
    //Genom at fylla i här med antingen X eler O kan ni testa era rättningsfunktioner 
    oGameData.gameField = ['', '', '', '', '', '', '', ''];

    /* Testdata för att testa rättningslösning */
    // oGameData.gameField = ['X', 'X', 'X', '', '', '', '', '', ''];
    // oGameData.gameField = ['O', 'O', 'O', '', '', '', '', ''];
    // oGameData.gameField = ['X', '', '', '', 'X', '', '', '', 'X'];
    // oGameData.gameField = ['', '', 'X', '', 'X', '', 'X', '', ''];
    // oGameData.gameField = ['X', 'O', 'X', '0', 'X', 'O', 'O', 'X', 'O'];

    //Indikerar tecknet som skall användas för spelare ett.
    oGameData.playerOne = "X";

    //Indikerar tecknet som skall användas för spelare två.
    oGameData.playerTwo = "O";

    //Kan anta värdet X eller O och indikerar vilken spelare som för tillfället skall lägga sin "bricka".
    oGameData.currentPlayer = "";

    //Nickname för spelare ett som tilldelas från ett formulärelement,
    oGameData.nickNamePlayerOne = "";

    //Nickname för spelare två som tilldelas från ett formulärelement.
    oGameData.nickNamePlayerTwo = "";

    //Färg för spelare ett som tilldelas från ett formulärelement.
    oGameData.colorPlayerOne = "";

    //Färg för spelare två som tilldelas från ett formulärelement.
    oGameData.colorPlayerTwo = "";

    //Antalet sekunder för timerfunktionen
    oGameData.seconds = 5;

    //Timerns ID
    oGameData.timerId = null;

    //Från start är timern inaktiverad
    oGameData.timerEnabled = false;

    //Referens till element för felmeddelanden
    oGameData.timeRef = document.querySelector("#errorMsg");
}

/**
 * Kontrollerar för tre i rad.
 * Returnerar 0 om det inte är någon vinnare, 
 * returnerar 1 om spelaren med ett kryss (X) är vinnare,
 * returnerar 2 om spelaren med en cirkel (O) är vinnare eller
 * returnerar 3 om det är oavgjort.
 * Funktionen tar inte emot några värden.
 */

function checkForGameOver() {
    //Kontrollerar om "X" vunnit genom att köra rättningsfunktionerna, om så är fallet returneras 1
    if (checkWinner('X')) {
        return 1;
    }
    //Kontrollerar om "O" vunnit genom att köra rättningsfunktionerna, om så är fallet returneras 2
    if (checkWinner('O')) {
        return 2;
    }
    //Kontrollerar om spelet är oavgjort, returnerar isåfall 3
    if (checkForDraw()) {
        return 3;
    }
    //Annars returneras 0, och spelet fortlöper
    else {
        return 0;
    }
}

//Skapa en array av alla vinnande kombinationer.
//Skapa en flagga för isWinner.
//Loopa igenom alla winningCombos.
//I varje loop kontrollerar ni om alla platser i oGameData.GameField 
//som motsvarar nuvarande combo innehåller playerIn. Om sant, ändra värdet på flaggan.
//Returnera flaggan isWinner

function checkWinner(playerIn) {

    // Winning combos är en array med arrayer som innehåller index positioner av brädet. [0,1,2] är hela första raden osv.

    let winningCombos = [ 
        [0,1,2],
        [3,4,5],
        [6,7,8],
        [0,3,6],
        [1,4,7],
        [2,5,8],
        [0,4,8],
        [2,4,6]
     ];

    let isWinner = false; // en så kallad flagga. 

     for (let i = 0; i < winningCombos.length; i++) {
        let combo = winningCombos[i];
        let a = oGameData.gameField[combo[0]];
        let b = oGameData.gameField[combo[1]];
        let c = oGameData.gameField[combo[2]];

        if (a === playerIn && b === playerIn && c === playerIn) {
            isWinner = true;
            break;
        }
        }
        return isWinner;
    }



//Kontrollera om alla platser i oGameData.GameField är fyllda. Om sant returnera true, annars false.
function checkForDraw() {
    let isDraw = ``;
    if (oGameData.gameField.includes('')) {
        isDraw = false;
    }
    else {
        isDraw = true;
    }
    return isDraw;
}

//Funktion som förbereder spelet inför start

// Här skall ni lägga till klassen "d-none" på elementet i DOM-en med id:t "gameArea", samt lägga en lyssnare 
// på "Starta spelet!"-knappen som lyssnar efter ett klick. När den klickas skall ni anropa funktionen "initiateGame()".
prepGame()
function prepGame() {
const boardRef = document.querySelector(`#gameArea`);
boardRef.classList.add(`d-none`);

const startBtnRef = document.querySelector(`#newGame`);

startBtnRef.addEventListener(`click`,() => {
    initiateGame();
});
}

function validateForm() {

}
/* Göm formuläret genom att lägga till klassen "d-none".
Visa spelplanen genom att ta bort klassen "d-none" på elementet med id:t "gameArea".
Ta bort textInnehållet i elementet med id:t "errorMsg".
Spara information om båda spelarna i objektet "oGameData" (dvs. användarnamn och färgval för respektive spelare).
Töm spelplanen genom att läsa in alla td-element, loopa igenom dem, och ändra dess text till en tom sträng (inga mellanslag).
Deklarera de lokala variablerna "playerChar" och "playerName".
Bestäm vilken spelare som skall börja genom att slumpa fram ett tal mellan 0 och 1.
Om talet är mindre än 0.5 så tilldelar ni:
playeChar = oGameData.playerOne;
playerName = oGameData.nickNamePlayerOne;
oGameData.currentPlayer = oGameData.playerOne;
Om talet är större än, eller lika med, 0.5 gör ni samma sak som ovan, fast med spelare 2.
Ändra texten i h1-elementet som ligger i div-elementet med klassen "jumbotron" till "Aktuell spelare är XXX", 
där ni ersätter XXX med namnet på den aktuella spelaren.
Lägg till en klicklyssnare på tabellen som innehåller spelplanen. Vid klick skall funktionen "executeMove()" anropas.*/
function initiateGame() {
    
console.log(`Du är kung. Nu tar du semester.`)
}

function startGame() {

}

function changePlayer() {

}

function timer() {

}

function gameOver() {

}
