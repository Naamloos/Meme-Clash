class Sandbag extends BaseCharacter{
    constructor(scene, x, y){
        super(scene, x, y);
        this.scene.load.image("sandbag", "sprites/sandbag.png");
    }

    // initialization methods
    create()
    {
        this.gameObject = this.scene.physics.add.image(this.spawnx, this.spawny,  "sandbag");
        this.gameObject.setDisplaySize(60, 120);
        this.gameObject.setBounce(0.6);
    }

    // update methods
    update(controller){
        // Sandbag can't move so no updateBase(cursors);

        // maybe a little hop/struggle if someone manages to play as sandbag somehow
        if((controller.left || controller.right || controller.up || controller.down) && this.gameObject.body.touching.down)
        {
            this.gameObject.setVelocityY(-50);
        }
    }
}