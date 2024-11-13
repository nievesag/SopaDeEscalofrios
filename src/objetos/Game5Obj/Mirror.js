export default class Mirror extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y, entryDirection1, entryDirection2) {
        super(scene, x, y, 'EspejoTablero');
        scene.add.existing(this);
        scene.physics.add.existing(this);

        this.entryDirection1 = entryDirection1;
        this.entryDirection2 = entryDirection2;
        this.exitDirection1 = this.getContraryDirection(entryDirection1);
        this.exitDirection2 = this.getContraryDirection(entryDirection2);

        this.setImmovable(true);
        this.body.allowGravity = false;
    }

    changeLaserDirection(laser) {
        if (laser.direction == this.entryDirection1 && this.canChange(laser)) {
            laser.setDirection(this.exitDirection2);
            laser.setPosition(this.x, this.y);
        } else if (laser.direction == this.entryDirection2 && this.canChange(laser)) {
            laser.setDirection(this.exitDirection1);
            laser.setPosition(this.x, this.y);
        }
    }

    getContraryDirection(dir) {
        switch (dir) {
            case 'up':
                return 'down';
            case 'down':
                return 'up';
            case 'left':
                return 'right';
            case 'right':
                return 'left';
            default:
                return null;
        }
    }

    canChange(laser){
        if (laser.direction == 'up'){
            if(laser.y <= this.y){
                return true;
            }
            else {
                return false;
            }
        }
        else if (laser.direction == 'down'){
            if(laser.y >= this.y){
                return true;
            }
            else {
                return false;
            }
        }
        else if (laser.direction == 'right'){
            if(laser.x >= this.x){
                return true;
            }
            else {
                return false;
            }
        }
        else if (laser.direction == 'left'){
            if(laser.x <= this.x){
                return true;
            }
            else {
                return false;
            }
        }
        else{
            return false;
        }
    }
}
