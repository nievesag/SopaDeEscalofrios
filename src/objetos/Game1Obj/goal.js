export default class Goal extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y, key) {
        super(scene, x, y, key);
        this.scene = scene;
        this.x = x;
        this.y = y;
        this.key = key;
        this.setScale(0.5,.5);

        this.scene.physics.add.existing(this);

        this.body.setBounce(1,1);
        this.body.setAllowGravity(false);
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
}