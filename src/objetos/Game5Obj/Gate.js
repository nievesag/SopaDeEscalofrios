export default class Gate extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y, , offsprite, onsprite) {
        super(scene, x, y, offsprite);

        scene.add.existing(this);
        scene.physics.add.existing(this);

        this.entryDirection1;
        this.entryDirection2;
        setEntrances(eje);

        this.offsprite = offsprite
        this.onsprite = onsprite;
        this.active = false;

        this.setImmovable(true);
        this.body.allowGravity = false;
    }

    setEntrances(eje) {
        switch (eje) {
            case 'vertical':
                this.entryDirection1 = 'up';
                this.entryDirection2 = 'down';
            case 'horizontal':
                this.entryDirection1 = 'left';
                this.entryDirection2 = 'rigth';
            default:
                return null;
        }
    }

    laserColision(laser) {
        if (this.scene.physics.overlap(this, laser)) {
            if (!this.active) {
                this.active = true;
                this.setTexture(this.onsprite);
            }
        }
    }
}