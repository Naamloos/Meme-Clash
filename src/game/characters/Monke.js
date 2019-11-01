class Monke extends BaseCharacter{
    constructor(scene, x, y){
        super(scene, x, y);
        this.scene.load.image("monke", "sprites/monke.png");
        this.scene.load.audio('uhoh', 'sounds/uhoh.ogg');
        this.jumpcount = 2;
        this.speed = 160;
        this.jumpheight = 300;
    }

    // initialization methods
    create()
    {
        this.gameObject = this.scene.physics.add.image(this.spawnx, this.spawny, "monke");
        this.jumpSound = this.scene.sound.add('uhoh');
    }

    // update methods
    update(controller){
        this.updateBase(controller);
    }
}