// This is a class that holds a handful of control methods, which can be overloaded for different controls (eg network stuff, or a gamepad etc etc)
class BaseController{
    constructor(){
        this.left = false;
        this.right = false;
        this.up = false;
        this.down = false;
        this.attack = false;

        this.previousleft = false;
        this.previousright = false;
        this.previousup = false;
        this.previousdown = false;
        this.previousattack = false;

        this.lefttick = false;
        this.righttick = false;
        this.uptick = false;
        this.downtick = false;
        this.attacktick = false;

        this.leftreleased = false;
        this.rightreleased = false;
        this.upreleased = false;
        this.downreleased = false;
        this.attackreleased = false;
    }

    updateBase(scene){

        if(this.lefttick){
        console.log("yes");}

        this.lefttick = this.left && !this.previousleft;
        this.righttick = this.right && !this.previousright;
        this.uptick = this.up && !this.previousup;
        this.downtick = this.down && !this.previousdown;
        this.attacktick = this.attack && !this.previousattack;

        this.leftreleased = !this.left && this.previousleft;
        this.rightreleased = !this.right && this.previousright;
        this.upreleased = !this.up && this.previousup;
        this.downreleased = !this.down && this.previousdown;
        this.attackreleased = !this.attack && this.previousattack;

        this.previousleft = this.left;
        this.previousright = this.right;
        this.previousup = this.up;
        this.previousdown = this.down;
        this.previousattack = this.attack;
    }
}