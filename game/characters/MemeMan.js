class MemeMan extends BaseCharacter{
    constructor(scene, x, y){
        super(scene, x, y);
        this.scene.load.image("mememan", "sprites/mememan.png");
        this.scene.load.audio('mememan-jump', 'sounds/mememan-jump.ogg');
        this.scene.load.audio('mememan-attack', 'sounds/mememan-attack.ogg');
        this.scene.load.audio('mememan-pain', 'sounds/mememan-pain.ogg');
        this.scene.load.audio('mememan-die', 'sounds/mememan-die.ogg');
        this.jumpcount = 20;
        this.attacktype = new AttackType(this.scene, "lasers", "sprites/lasers.png", 0, 500, false, true, this);
    }

    // initialization methods
    create()
    {
        this.gameObject = this.scene.physics.add.image(this.spawnx, this.spawny,  "mememan");
        this.gameObject.setDisplaySize(120, 120);
        this.jumpSound = this.scene.sound.add('mememan-jump');
        this.attackSound = this.scene.sound.add('mememan-attack');
        this.painSound = this.scene.sound.add('mememan-pain');
        this.dieSound = this.scene.sound.add('mememan-die');
    }

    // update methods
    update(controller){
        this.updateBase(controller);
    }
}