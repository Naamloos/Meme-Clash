class BaseCharacter{
    constructor(scene, x, y){
        this.scene = scene;
        this.jumpcount = 1;
        this.speed = 160;
        this.jumpheight = 150;
        this.lives = 3;
        this.health = 100;
        this.attackdir = false;
        this.attacktype = new AttackType(this.scene, "poop", "sprites/poop.png", 150, 0, false, true, this);

        this.jumpSound = null;
        this.attackSound = null;
        this.painSound = null;
        this.dieSound = null;

        this.spawnx = x;
        this.spawny = y;

        this.lastdirection = false; // last direction true == right
    }

    // initialization methods
    create()
    {
    }

    addCollider(gameObject)
    {
        this.scene.physics.add.collider(this.gameObject, gameObject);
    }

    setCameraFollow()
    {
        this.scene.cameras.main.setSize(800, 600);
        this.scene.cameras.main.startFollow(this.gameObject, true, 0.05, 0.05);
        this.scene.cameras.main.setBounds(-400, -400, 1600, 1400)
    }

    respawn()
    {
        this.gameObject.setVelocityY(0);
        this.gameObject.setVelocityX(0);
        this.gameObject.setPosition(this.spawnx, this.spawny);
        this.lives--;
        this.health = 100;
        if(this.dieSound != null)
        {
            this.dieSound.play();
        }
    }

    attack()
    {
        // THIS FUNCTION SHOULD BE OVERRIDDEN IN AN EXTENDED CLASS FOR CUSTOMIZED ATTACKS!!!112213123 ONE
        this.attacktype.spawn(this.gameObject.x, this.gameObject.y, this.attackSound, this.lastdirection);
        //this.attackdir = !this.attackdir;
        //this.gameObject.setVelocityX(0);
        //this.gameObject.setVelocityY(0);
        // attack = test hit

        //this.hit(this.attackdir);
    }

    hit(direction)
    {
        this.health -= 10;
        var healthbonus = (100 - this.health);

        // direction is a boolean where true = right
        this.gameObject.setY(this.gameObject.y - 10);
        this.gameObject.setVelocityY(-100 - (healthbonus * 2));
        // making sure object isn't grounded when hit
        if(direction)
        {
            this.gameObject.setVelocityX(150 + healthbonus);
        }
        else
        {
            this.gameObject.setVelocityX(-150 + healthbonus);
        }

        if(this.health < 0)
        {
            if(this.dieSound != null)
            {
                this.dieSound.play();
            }
            this.respawn();
        }
        else if(this.painSound != null)
        {
            this.painSound.play();
        }
    }

    // update methods
    updateBase(controller){
        this.gameObject.setBounce(0.2);
        if(this.gameObject.body.touching.down){
            this.currentjump = this.jumpcount;
            this.gameObject.setVelocityX(0);
        }
        
        if (controller.left)
        {
            this.lastdirection = false;
            this.gameObject.setVelocityX(this.speed * -1);
        }
        else if (controller.right)
        {
            this.lastdirection = true;
            this.gameObject.setVelocityX(this.speed);
        }
        else if(controller.leftreleased || controller.rightreleaded)
        {
            this.gameObject.setVelocityX(0);
        }

        if(controller.attacktick)
        {
            if(this.attackSound != null)
            {
                this.attackSound.play();
            }
            this.attack();
        }

        if (controller.uptick && this.currentjump > 0)
        {
            this.gameObject.setVelocityY(this.jumpheight * -1);
            this.currentjump--;
            if(this.jumpSound != null)
            {
                this.jumpSound.play();
            }
        }

        if(controller.down)
        {
            this.gameObject.setOrigin(0.5, 0);
            this.gameObject.setDisplaySize(80, 40);
            this.gameObject.setVelocityX(0);
        }
        else
        {
            this.gameObject.setOrigin(0.5, 0.5);
            this.gameObject.setDisplaySize(80, 80);
        }

        if(this.gameObject.y > 900){
            this.respawn();
        }
    }
}