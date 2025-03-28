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
    this.load.setBaseURL('http://127.0.0.1/game/');

    // initializing some stuffs idk any collective name
    controller1 = new PlayerOneInput();
    controller2 = new PlayerTwoInput();

    // loading stage
    this.load.image("achterground", "sprites/backgrond.png");
    this.load.image("stage", "sprites/stage.png");

    // loading characters
    // url params will be used here to load data that was sent by the character select page.
    var params = new URLSearchParams(window.location.search);

    switch(params.get('player1'))
    {
        default:
        case 'monke':
            player1 = new Monke(this, 300, 50);
        break;

        case 'doittoem':
            player1 = new DoItToEm(this, 300, 50);
        break;
        case 'mememan':
            player1 = new MemeMan(this, 300, 50);
        break;
        case 'orang':
            player1 = new Orang(this, 300, 50);
        break;
        case 'sandbag':
            player1 = new Sandbag(this, 300, 50);
        break;
    }

    switch(params.get('player2'))
    {
        default:
        case 'monke':
            player2 = new Monke(this, 500, 50);
        break;

        case 'doittoem':
            player2 = new DoItToEm(this, 500, 50);
        break;
        case 'mememan':
            player2 = new MemeMan(this, 500, 50);
        break;
        case 'orang':
            player2 = new Orang(this, 500, 50);
        break;
        case 'sandbag':
            player2 = new Sandbag(this, 500, 50);
        break;
    }

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

    if(player1.lives < 0)
    {
        alert("congratulations! player 2 won!");
        window.location.href = "/index.html";
    }
    else if(player2.lives < 0)
    {
        alert("congratulations! player 1 won!");
        window.location.href = "/index.html";
    }
    // ran out of time
}