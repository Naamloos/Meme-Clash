class DoItToEm extends BaseCharacter{
    constructor(scene, x, y){
        super(scene, x, y);
        this.scene.load.image("doittoem", "sprites/bruh.png");
        this.jumpcount = 1;
        this.jumpheight = 200;
    }

    // initialization methods
    create()
    {
        this.gameObject = this.scene.physics.add.image(this.spawnx, this.spawny,  "doittoem");
        this.gameObject.setDisplaySize(65, 65);
    }

    // update methods
    update(controller){
        this.updateBase(controller);
    }
}