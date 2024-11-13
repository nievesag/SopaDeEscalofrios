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
        if (laser.direction == this.entryDirection1) {
            laser.setDirection(this.exitDirection2);
        } else if (laser.direction == this.entryDirection2) {
            laser.setDirection(this.exitDirection1);
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
}
