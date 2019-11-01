class MemeMan extends BaseCharacter{
    constructor(scene, x, y){
        super(scene, x, y);
        this.scene.load.image("mememan", "sprites/mememan.png");
        this.jumpcount = 20;
    }

    // initialization methods
    create()
    {
        this.gameObject = this.scene.physics.add.image(this.spawnx, this.spawny,  "mememan");
        this.gameObject.setDisplaySize(120, 120);
    }

    // update methods
    update(controller){
        this.updateBase(controller);
    }
}