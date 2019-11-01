var overlap; 

class AttackHandler
{
    constructor(players) // players has to be an array with BaseCharacters.
    {
        this.attacks = Array();
        this.players = players;
    }

    add(attack)
    {
        this.attacks.push(attack);
    }

    update()
    {
        var remove = new Array();

        this.attacks.forEach(attack => {
            attack.update();

            this.players.forEach(player =>{
                if(attack.parent != player){
                    // physics.overlap seems not to work properly, but this seems more accurate..
                    var overlap = player.scene.physics.overlapRect(attack.gameobject.x, attack.gameobject.y, 25, 25);
                    var overlaps = false;
                    overlap.forEach(e =>{
                        if(!overlaps) // making sure we don't override an overlap with a non-matching object
                        {
                            overlaps = e.gameObject == player.gameObject;
                        }
                    });
                    if(overlap.length > 1){
                        console.log(overlap);
                    }
                    if(overlaps && !attack.despawned)
                    {
                        console.log("overlaps");
                        attack.despawn(); // despawn attack BEFORE hitting players, it seems to bug lol
                        // if attack X is smaller than player X the knockback is to the right
                        player.hit(attack.gameobject.x < player.gameObject.x);
                    }
                }
            });

            if(attack.alivetime > attack.alivefor)
            {
                // alive is over
                remove.push(attack);
                attack.despawn();
            }
        });

        remove.forEach(attack =>{
            this.attacks.pop(attack);
        });
    }
}

class AttackType{
    constructor(scene, imagename, image, soundname, sound, yvelocity, xvelocity, frozen, projectile, parent){
        this.scene = scene;
        this.imagename = imagename;
        this.soundname = soundname;
        this.scene.load.image(imagename, image);
        this.scene.load.audio(soundname, sound);
        this.parent = parent;
        if(!projectile) // non-projectiles despawn way faster
        {
            this.aliveseconds = 1; // this attack will despawn after this amount of seconds.
        }
        else
        {
            this.aliveseconds = 5;
        }
        this.yvelocity = yvelocity;
        this.xvelocity = xvelocity;

        this.frozen = frozen;

        this.attacks = new Array();
    }

    spawn(x, y){
        var gameobject = this.scene.physics.add.image(x, y, this.imagename);
        gameobject.setVelocityX(this.xvelocity);
        gameobject.setVelocityY(this.yvelocity);

        this.scene.sound.add(this.soundname).play();

        gameobject.setDisplaySize(25, 25);
        GlobalAttackHandler.add(new AttackData(this.aliveseconds, gameobject, this.frozen, this.parent));
    }
}

class AttackData
{
    constructor(alivefor, gameobject, frozen, parent){
        this.alivefor = alivefor;
        this.alivetime = 0;
        this.gameobject = gameobject;
        this.previoustime = new Date().getTime() / 1000;
        this.frozen = frozen;
        this.parent = parent;
        this.despawned = false;
    }

    despawn()
    {
        console.log("despawning object");
        this.gameobject.destroy();
        this.despawned = true;
    }

    update()
    {
        var secs = new Date().getTime() / 1000;
        this.alivetime += secs - this.previoustime;
        this.previoustime = secs;

        if(this.frozen){
            this.gameobject.setVelocityX(0);
            this.gameobject.setVelocityY(0);
        }
    }
}