// This is a class that holds a handful of control methods, which can be overloaded for different controls (eg network stuff, or a gamepad etc etc)
class PlayerTwoInput extends BaseController{
    constructor(){
        super();
        this.left = false;
        this.right = false;
        this.up = false;
        this.down = false;
        this.attack = false;
    }

    update(scene){
        var kup = scene.input.keyboard.addKey('I');
        var kdown = scene.input.keyboard.addKey('K');
        var kleft = scene.input.keyboard.addKey('J');
        var kright = scene.input.keyboard.addKey('L');
        var kattack = scene.input.keyboard.addKey('O');

        this.up = kup.isDown;
        this.down = kdown.isDown;
        this.left = kleft.isDown;
        this.right = kright.isDown;
        this.attack = kattack.isDown;

        this.updateBase(scene);
    }
}