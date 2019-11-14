const START_HP = 20;
const START_SP = 10;
const DEFAULT_ATK = 5;
const DEFAULT_DEF = 5;
const DEFAULT_TEK = 5;

const P0NAME = 'Crash'
const P0CHARA = 'crashr'
const P1NAME = 'Sam'
const P1CHARA = 'saml'

let playerTurn = false;
let logging = true;

let Player0;
let Player1;

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
    attack(target) {
        console.log(this.name + ' attacked ' + target.name)
    }
    single(target) {
        this.attack(target);
    }
    double(target) {
        this.attack(target);
        this.attack(target);
    }
    recover() {
        console.log('Recovered!')
    }
}


function showControls() {
    controlsBox.innerHTML = '<button onclick="' + ((playerTurn) ? 'Player1' : 'Player0') + '.single('+ ((!playerTurn) ? 'Player1' : 'Player0') +')">Single Attack</button>'
}


function startup() {
    Player0 = new Fighter(P0NAME, P0CHARA);
    Player1 = new Fighter(P1NAME, P1CHARA);

    gameBox = document.getElementById('gameBox');
    headerBox = document.getElementById('headerBox');
    graphicsBox = document.getElementById('graphicsBox');
    barsBox = document.getElementById('barsBox');
    controlsBox = document.getElementById('controlsBox');
    outputBox = document.getElementById('outputBox');

    graphicsBox.innerHTML = '<img id ="' + Player0.charaName + '" src="img/' + Player0.charaName + '_idle.png" alt="' + Player0.name + '" class="fighterIMG">'
    graphicsBox.innerHTML += '<img id ="' + Player1.charaName + '" src="img/' + Player1.charaName + '_idle.png" alt="' + Player1.name + '" class="fighterIMG">'

    showControls();

    console.log("My name is " + Player0.name + " and my ATK is " + Player0.atk)
    console.log("My name is " + Player1.name + " and my ATK is " + Player1.atk)
}
