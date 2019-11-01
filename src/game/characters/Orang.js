class Orang extends BaseCharacter{
    constructor(scene, x, y){
        super(scene, x, y);
        this.scene.load.image("orang", "sprites/orang.png");
        this.jumpcount = 2;
        this.speed = 160;
        this.jumpheight = 300;
    }

    // initialization methods
    create()
    {
        this.gameObject = this.scene.physics.add.image(this.spawnx, this.spawny,  "orang");
        this.gameObject.setDisplaySize(120, 120);
        this.gameObject.setBounce(0.4);
    }

    // update methods
    update(controller){
        this.updateBase(controller);
        if(controller.down){
            this.gameObject.setVelocityY(300);
        }
    }
}