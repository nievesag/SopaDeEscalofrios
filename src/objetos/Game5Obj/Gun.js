export default class Gun extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y, size) {
        super(scene, x, y, 'FondoTablero');

        this.setDisplaySize(size, size);

        scene.add.existing(this);
        scene.physics.add.existing(this);

        this.body.setImmovable(true);
        this.body.setAllowGravity(false);
    }
}