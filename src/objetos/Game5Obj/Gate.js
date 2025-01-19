export default class Gate extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y, eje, offsprite, onsprite) {
        super(scene, x, y, offsprite);

        scene.add.existing(this);
        scene.physics.add.existing(this);

        this.entryDirection1;
        this.entryDirection2;
        this.setEntrances(eje);

        this.offsprite = offsprite
        this.onsprite = onsprite;
        this.active = false;

        this.setImmovable(true);
        this.body.allowGravity = false;
    }

    setEntrances(eje) {
        if (eje === 'vertical') {
            this.entryDirection1 = 'up';
            this.entryDirection2 = 'down';
            this.angle += 90;
        }
        else {
            this.entryDirection1 = 'left';
            this.entryDirection2 = 'right';
        }
    }

    Reset() {
        this.active = false;
        this.setTexture(this.offsprite);
    }

    laserColision(laser) {
        if (laser.direction == this.entryDirection1 || laser.direction == this.entryDirection2){
            if (!this.active) {
                this.active = true;
                this.setTexture(this.onsprite);
            }
            return true;
        }
        else {
            return false;
        }
    }
}