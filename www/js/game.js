var Game = {};      // Main game object

var player;
var dropStream;
var scoreField;
var leftHeld;
var rightHeld;

var KEYCODE_LEFT = 37;      // Key code for left direction
var KEYCODE_RIGHT = 39;     // Key code for right direction

var canvas;                 // Main game canvas
var stage;                  // Main game stage

var menuStartField;         // Main menu message field

Game.init = function() {
    // register key functions
    document.onkeydown = Game.handleKeyDown;
    document.onkeyup = Game.handleKeyUp;

    canvas = document.getElementById("canvas");
    stage = new createjs.Stage("canvas");

    // Set the full screen canvas
    stage.canvas.width = window.innerWidth;
    stage.canvas.height = window.innerHeight;

    // Here we should do all the assets loading and inicialization
    player = new createjs.Shape();
    player.graphics.beginFill("DeepSkyBlue").drawCircle(0, 0, 50);
    player.x = (canvas.width / 2);
    player.y = 150;

    scoreField = new createjs.Text("0", "bold 18px Arial", "#000000");
    scoreField.textAlign = "right";
    scoreField.x = canvas.width - 20;
    scoreField.y = 20;
    scoreField.maxWidth = 1000;

    Game.mainMenu();
};

Game.mainMenu = function() {
    menuStartField = new createjs.Text("Click to start", "bold 24px Arial", "#000000");
    menuStartField.maxWidth = 1000;
    menuStartField.textAlign = "center";
    menuStartField.textBaseline = "middle";
    menuStartField.x = canvas.width / 2;
    menuStartField.y = canvas.height / 2;

    stage.addChild(menuStartField);

    Game.draw();
    canvas.onclick = Game.start;
};

Game.start = function() {
    canvas.onclick = null;
    stage.removeAllChildren();

    scoreField.text = (0).toString();

    stage.addChild(player);
    stage.addChild(scoreField);

    Game.draw();

    if (!createjs.Ticker.hasEventListener("tick")) {
        createjs.Ticker.addEventListener("tick", Game.tick);
    }
};

Game.tick = function(event) {
    if (leftHeld) {
        player.x -= 5;
    } else if (rightHeld) {
        player.x += 5;
    }

    stage.update(event);
};

Game.draw = function() {
    stage.update();
};

Game.handleKeyDown = function(e) {
    if (!e) {
        var e = window.event;
    }
    switch (e.keyCode) {
        case KEYCODE_LEFT:
            leftHeld = true;
            return false;
        case KEYCODE_RIGHT:
            rightHeld = true;
            return false;
    }
};

Game.handleKeyUp = function(e) {
    if (!e) {
        var e = window.event;
    }
    switch (e.keyCode) {
        case KEYCODE_LEFT:
            leftHeld = false;
            break;
        case KEYCODE_RIGHT:
            rightHeld = false;
            break;
    }
};

//
// Game.init = function() {
//     this.drops = [];
//     this.context = document.getElementById("canvas").getContext("2d");
// };
//
// Game.draw = function() {
//     this.context.clearRect(0, 0, window.innerWidth, window.innerHeight);
//
//     for(var i = 0; i < this.drops.length; i++) {
//         this.drops[i].draw(this.context);
//     };
// };
//
// Game.update = function() {
//     for(var i = 0; i < this.drops.length; i++) {
//         // if(this.drops[i].y < -10) {
//         //     this.drops.splice(1, 1);
//         // } else {
//             this.drops[i].update();
//             console.log(this.drops.length);
//         // }
//     };
// };
//
// Game.addDrop = function() {
//     this.drops.push(new Drop());
// };
