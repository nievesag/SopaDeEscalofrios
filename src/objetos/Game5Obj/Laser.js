export default class Laser extends Phaser.GameObjects.Rectangle {
    constructor(scene, x, y, direction) {
        super(scene, x, y, 20, 20, 0xffff00); // crea un rectangulo rojo que representa el laser
        this.speed = 800;
        this.setOrigin(0.5, 0.5);
        scene.add.existing(this);
        scene.physics.add.existing(this);
        this.body.allowGravity = false;

        this.setDirection(direction);
    }

    setDirection(direction){
        this.direction = direction;
        this.body.setVelocityX(0);
        this.body.setVelocityY(0);
        if (direction === 'right') {
            this.body.setVelocityX(this.speed);
        } else if (direction === 'left') {
            this.body.setVelocityX(-this.speed);
        } else if (direction === 'up') {
            this.body.setVelocityY(-this.speed);
        } else if (direction === 'down') {
            this.body.setVelocityY(this.speed);
        }
    }
}
