export default class Obstaculo extends Phaser.GameObjects.Sprite{
    constructor(scene, x, y, width, height, color = 0x8B4513, orientation = 'horizontal') {
        super(scene, x, y, 'obstacle'); 

        this.scene = scene;
        this.scene.add.existing(this);
        this.scene.physics.world.enable(this);

        if (orientation === 'vertical') [width, height] = [height, width];

        this.setDisplaySize(width, height);
        this.body.setCollideWorldBounds(true);
        this.body.setBounce(0);
        this.body.setAllowGravity(true);
        this.body.setImmovable(false);
        this.body.setMass(10);

        this.health = 1;
    }

    // Método para reducir la salud cuando es golpeado
    takeDamage() {
        this.health -= 1;
        if (this.health <= 0) {
            this.destroy();
        }
    }

    // Método para destruir el bloque cuando su salud llega a cero
    destroy() {
        this.destroy();
    }
}
