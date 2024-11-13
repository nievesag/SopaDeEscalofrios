export default class Laser extends Phaser.GameObjects.Rectangle {
    constructor(scene, x, y, direction) {
        super(scene, x, y, 20, 10, 0xff0000); // Crea un rectángulo rojo para representar el láser
        this.direction = direction;
        this.speed = 10;

        scene.add.existing(this);
        scene.physics.add.existing(this);

        this.body.allowGravity = false;
    }

    update() {
        switch (this.direction) {
            case 'right':
                this.x += this.speed;
                break;
            case 'left':
                this.x -= this.speed;
                break;
            case 'up':
                this.y -= this.speed;
                break;
            case 'down':
                this.y += this.speed;
                break;
        }
    }
}
