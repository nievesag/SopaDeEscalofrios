export default class Destiny extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y, offsprite, onsprite) {
        super(scene, x, y, offsprite);

        scene.add.existing(this);
        scene.physics.add.existing(this);

        this.offsprite = offsprite
        this.onsprite = onsprite;
        this.active = false;

        this.setImmovable(true);
        this.body.allowGravity = false;
    }

    laserColision(laser) {
        if (this.scene.physics.overlap(this, laser)) {
            if (!this.active) {
                this.active = true;
                this.setTexture(this.onsprite);
                this.scene.startEndGame();
            }
        }
    }
}