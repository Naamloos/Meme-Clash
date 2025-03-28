class Monke extends BaseCharacter{
    constructor(scene, x, y){
        super(scene, x, y);
        this.scene.load.image("monke", "sprites/monke.png");
        this.scene.load.audio('monke-jump', 'sounds/monke-jump.ogg');
        this.scene.load.audio('monke-attack', 'sounds/monke-attack.ogg');
        this.scene.load.audio('monke-pain', 'sounds/monke-pain.ogg');
        this.scene.load.audio('monke-die', 'sounds/monke-die.ogg');
        this.jumpcount = 2;
        this.speed = 160;
        this.jumpheight = 300;
    }

    // initialization methods
    create()
    {
        this.gameObject = this.scene.physics.add.image(this.spawnx, this.spawny, "monke");
        this.jumpSound = this.scene.sound.add('monke-jump');
        this.attackSound = this.scene.sound.add('monke-attack');
        this.painSound = this.scene.sound.add('monke-pain');
        this.dieSound = this.scene.sound.add('monke-die');
    }

    // update methods
    update(controller){
        this.updateBase(controller);
    }
}