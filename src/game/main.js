// Quick link to docs:
// https://photonstorm.github.io/phaser3-docs/

// game configuration
var config = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 350 }
        }
    },
    scene: {
        preload: preload,
        create: create,
        update: update
    }
};

// base game
var game = new Phaser.Game(config);

// My own class instances
var player1;
var player2;
var controller1;
var controller2;
var statustext;
var GlobalAttackHandler;

// IN CONTEXT OF preload, create and update, "this" IS A SCENE OBJECT. ALSO FOUND IN game.scene.scenes[0]
// docs: https://photonstorm.github.io/phaser3-docs/Phaser.Scene.html
function preload ()
{
    this.load.setBaseURL('http://127.0.0.1/javascript/game/');

    // initializing some stuffs idk any collective name
    controller1 = new PlayerOneInput();
    controller2 = new PlayerTwoInput();

    // loading stage
    this.load.image("achterground", "sprites/backgrond.png");
    this.load.image("stage", "sprites/stage.png");
    // loading characters
    player1 = new Monke(this, 300, 50);
    player2 = new Orang(this, 500, 50);

    var players = new Array();
    players.push(player1);
    players.push(player2);
    
    // need references to players.
    GlobalAttackHandler = new AttackHandler(players);
}

function create ()
{
    // adding a background to the scene
    this.add.image(0, 0, "achterground").setOrigin(0, 0);

    // adding a static physics group to the scene with a platform.
    var stage = this.physics.add.staticGroup();
    stage.create(400, 400, 'stage');

    // Creating players and adding colliders
    player1.create();
    player1.addCollider(stage);

    // Player 2
    player2.create();
    player2.addCollider(stage);

    statustext = this.add.text(15, 15, "Me and the boys testing text");

    game.scale.pageAlignHorizontally = true;
    game.scale.pageAlignVertically = true;
    game.scale.refresh();
}

function update ()
{
    // Update controllers
    controller1.update(this);
    controller2.update(this);

    // Update players with input
    player1.update(controller1);
    player2.update(controller2);

    GlobalAttackHandler.update();

    statustext.text = "Player 1: lives[" + player1.lives + "] health[" + player1.health + "]\n"
                    + "Player 2: lives[" + player2.lives + "] health[" + player2.health + "]\n";
}