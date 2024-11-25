import Laser from './Laser.js';

export default class Gun extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y, direction, tileSize) {
        super(scene, x, y, 'DisparadorTablero');
        
        this.displayWidth = tileSize;
        this.displayHeight = tileSize;
        this.direction = direction;

        scene.add.existing(this);

        scene.physics.add.existing(this);
        this.body.setImmovable(true);
        this.body.allowGravity = false;
    }

    shootLaser(scene) {
        const laser = new Laser(scene, this.x, this.y, this.direction);
        scene.add.existing(laser);
        return laser;
    }
}