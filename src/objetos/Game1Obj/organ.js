export default class Organ extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y, key) {
        super(scene, x, y, key);
        this.setScale(0.5,.5);

        this.scene.physics.add.existing(this);

        //this.body.setColliderWorldBounds();
        this.body.setBounce(1,1);

        this.body.setAllowGravity(false);

        this.isDead = false;
    }

    preUpdate(t, dt) {
        super.preUpdate(t, dt);

		// En el motor arcade no hay rozamiento, lo simulamos ->
		if(this.body.velocity.x > 5) {
			this.body.velocity.x -= 5;
		} 
        else if(this.body.velocity.x < -5) {
			this.body.velocity.x += 5;
		}

		if(this.body.velocity.x <= 5 && this.body.velocity.x > 0 || this.body.velocity.x >= -5 && this.body.velocity.x < 0) {
			this.body.velocity.x = 0;
		}
    }

    checkCollisionWithGoal(scene, goal)
    {
        // si ya esta muerto no hay colision
        if(this.isDead) {
            return false;
        }

        // comprueba colision
        const collision = this.scene.physics.world.overlap(this, goal);

        if(collision) {
            this.scene.time.delayedCall(400,() => 
                {
                    this.destroy();
                    this.isDead = true;
                    scene.handleOrganGoal();
                    scene.decreaseOrganCount();
                }, [], this);
        }

        return collision;
    }
}