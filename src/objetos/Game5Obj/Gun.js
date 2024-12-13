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

        this.rotatesprite(this.direction);
    }

    rotatesprite(direction) {
        this.direction = direction;

        switch (direction) {
            case 'left':
                this.angle = 0; // 180 grados
                break;
            case 'right':
                this.angle = 180; // 0 grados
                break;
            case 'up':
                this.angle = 90; // -90 grados
                break;
            case 'down':
                this.angle = -90; // 90 grados
                break;
            default:
                this.angle = 0;
                break;
        }
    }

    shootLaser(scene) {
        const laser = new Laser(scene, this.x, this.y, this.direction);
        scene.add.existing(laser);
        return laser;
    }
}