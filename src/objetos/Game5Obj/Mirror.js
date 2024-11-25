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

        this.setInteractive();

        this.on('pointerdown', (pointer) => {
            if (pointer.leftButtonDown()) {
                this.rotateMirror();
            }
        });
    }

    rotateMirror(){
        this.angle += 90;
        this.entryDirection1 = this.rotateDir(this.entryDirection1);
        this.entryDirection2 = this.rotateDir(this.entryDirection2);
        this.exitDirection1 = this.getContraryDirection(this.entryDirection1);
        this.exitDirection2 = this.getContraryDirection(this.entryDirection2);
    }

    rotateDir(dir){
        switch (dir) {
            case 'up':
                return 'right';
            case 'down':
                return 'left';
            case 'left':
                return 'up';
            case 'right':
                return 'down';
            default:
                return null;
        }
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

    canChange(laser){ // es para saber si ha pasado el centro del espejo
        if (laser.direction == 'up'){
            return laser.y <= this.y;
        }
        else if (laser.direction == 'down'){
            return laser.y >= this.y;
        }
        else if (laser.direction == 'right'){
            return laser.x >= this.x;
        }
        else if (laser.direction == 'left'){
            return laser.x <= this.x;
        }
        else{
            return false;
        }
    }
}
