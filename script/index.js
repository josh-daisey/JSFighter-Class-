const START_HP = 20;
const START_SP = 10;
const DEFAULT_ATK = 5;
const DEFAULT_DEF = 5;
const DEFAULT_TEK = 5;

//sets constants names
const P0NAME = 'Crash'
const P0CHARA = 'crashr'
const P1NAME = 'Sam'
const P1CHARA = 'saml'

let playerTurn = false;
let logging = true;

let Player0;
let Player1;

// declared variables for the boxes
let gameBox;
let headerBox;
let graphicsBox;
let barsBox;
let controlsBox;
let outputBox;

class Fighter {
    constructor(name, charaName) {
        //'contructor' is in all JS classes
        // It gets run immediately when a new object is created from a class

        // Set all of our default values for this new fighter here
        this.name = name;
        this.hp = START_HP;
        this.sp = START_SP;
        this.atk = DEFAULT_ATK;
        this.def = DEFAULT_DEF;
        this.tek = DEFAULT_TEK;
        this.charaName = charaName;
    }

    //this logs who attacked who
    attack(target) {
        let damage = this.atk;
        console.log(`${damage} damage dealt to ${target.name}`)
        if (koCheck(target, damage)) {
            console.log(`${target.name} has died`)
        } else {
            console.log(`${target.name} has ${target.hp} health left`)
        }
        endTurn();

    }

    single(target) {
        this.attack(target);
    }

    double(target) {
        this.attack(target);
        this.attack(target);
    }
    //this logs that they recovered
    recover() {
        console.log('Recovered!');
    }
}

function startup() {
    Player0 = new Fighter(P0NAME, P0CHARA);
    Player1 = new Fighter(P1NAME, P1CHARA);

    //this makes a shortcut for 'document.getElementById'
    gameBox = document.getElementById('gameBox');
    headerBox = document.getElementById('headerBox');
    graphicsBox = document.getElementById('graphicsBox');
    barsBox = document.getElementById('barsBox');
    controlsBox = document.getElementById('controlsBox');
    outputBox = document.getElementById('outputBox');


    //this shows the fighter images in the graphics box
    graphicsBox.innerHTML ='<img id ="' + Player0.charaName + '" src="img/' + Player0.charaName + '_idle.png" alt="' + Player0.name + '" class="fighterIMG">'
    graphicsBox.innerHTML += '<img id ="' + Player1.charaName + '" src="img/' + Player1.charaName + '_idle.png" alt="' + Player1.name + '" class="fighterIMG">'


    console.log("My name is " + Player0.name + " and my ATK is " + Player0.atk)
    console.log("My name is " + Player1.name + " and my ATK is " + Player1.atk)

    showControls() //runs the showControls() function

    //generates hp and sp bar for both players
    barsBox.innerHTML = `<div id = "${Player0.charaName}hpBar" class="hpBar"><div style="width: 100%" class="hpFill">${Player0.hp}</div></div>`
    barsBox.innerHTML += `<div id = "${Player0.charaName}spBar" class="spBar"><div style="width: 100%" class="spFill">${Player0.hp}</div></div>`

    barsBox.innerHTML += `<div id = "${Player1.charaName}hpBar" class="hpBar"><div style="width: 100%" class="hpFill">${Player1.hp}</div></div>`
    barsBox.innerHTML += `<div id = "${Player1.charaName}spBar" class="spBar"><div style="width: 100%" class="spFill">${Player1.hp}</div></div>`

}

//checks the target's HP is less than or equal to 0, Then retuns true or false.
function koCheck(target, amount) {
    target.hp = target.hp - amount;
    if (target.hp <= 0) {
        return true;
    } else {
        return false;
    }
}

// EndTurn code
function endTurn() {
    playerTurn = !playerTurn
    if (kocheck(Player0, 0) || kocheck(Player1, 0)) {
        hideControls();
    }
}

function hideContols() {
    controlsBox.innerHTML = "";
}

//  Checks if player hp is 0 or less if it is ends the game,
//  also flips the players turns
function endTurn() {
    if (koCheck(Player0, 0) || koCheck(Player1, 0)) {
        hideControls();
    } else {
        playerTurn = !playerTurn;
        showControls();
    }
    updateBars(Player0, "hp", Player0.hp, START_HP)
    updateBars(Player1, "hp", Player1.hp, START_HP)
    updateBars(Player0, "sp", Player1.sp, START_SP)
    updateBars(Player1, "sp", Player1.sp, START_SP)
}

function updateBars(target, type, current, max) {
    let percent = (current / max * 100)
    if (current <= 0) {
        barFillPercent = 0;
    }
    if (current >= max) {
        barFillPercent = 100;
    }
    document.getElementById(`${target.charaName}${type}Bar`).innerHTML = `<div style="width: ${percent}%" class="${type}Fill">${current}</div>`

}

function showControls() {
    //checks to see which players turn it is and show the apropriate controls
    if (playerTurn) {
        //show buttons for player1 and overwrites player0's controls
        controlsBox.innerHTML = '<button type="button" name="attack" onclick="Player1.single(Player0)">Single Attack!</button>'
    } else {
        //show buttons for player0 and overwrites player1's controls
        controlsBox.innerHTML = '<button type="button" name="attack" onclick="Player0.single(Player1)">Single Attack!</button>'
    }
}

function hideControls() {
    controlsBox.remove();
}
