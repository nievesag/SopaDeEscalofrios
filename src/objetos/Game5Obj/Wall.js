export default class Wall extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y, size) {
        super(scene, x, y, 'MuroTablero');

        this.setDisplaySize(size, size);

        scene.add.existing(this);
        scene.physics.add.existing(this);

        this.body.setImmovable(true);
        this.body.allowGravity = false;
    }
}