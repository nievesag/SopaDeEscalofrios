export default class PlayerG1 extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y) {
        super(secene, x, y, 'p');
        this.speed = 140;
        this.scene.add.existing(this);

        this.wKey = this.scene.input.keyboard.addKey('W'); // arriba
		this.aKey = this.scene.input.keyboard.addKey('A'); // izq
		this.aKey = this.scene.input.keyboard.addKey('S'); // abajo
		this.dKey = this.scene.input.keyboard.addKey('D'); // der
		this.spaceKey = this.scene.input.keyboard.addKey('SPACE'); // agarrar

        // para agarrar
        this.isGrabbing = false; // flag para comprobar que se esta agarrando algo

		// Agregamos al player a las físicas para que Phaser lo tenga en cuenta -> no se si hace falta
		scene.physics.add.existing(this);

        // player colisiona con los límites del mundo
		this.body.setCollideWorldBounds();

        // collider
		this.bodyOffset = this.body.width/4;
		this.bodyWidth = this.body.width/2;
		
		this.body.setOffset(this.bodyOffset, 0);
		this.body.width = this.bodyWidth;
    }

    // t -> tiempo total
    // dt -> tiempo entre frames
    preUpdate(t, dt) {
        super.preUpdate(t, dt); // llamar al preupdate del padre (sprite) para activar animación si la hubiera

        // ---- input ----
        // A -> mueve en el eje -X
		if(this.aKey.isDown) {
			this.setFlip(true, false) // para que gire el sprite creo
			
			//this.x -= this.speed*dt / 1000;
			this.body.setVelocityX(-this.speed);
		}

		// D -> mueve en el eje X
		if(this.dKey.isDown) {
			this.setFlip(false, false)
			this.body.setVelocityX(this.speed);
		}

		// dejar A o D -> para
		if(Phaser.Input.Keyboard.JustUp(this.aKey) || Phaser.Input.Keyboard.JustUp(this.dKey)) {
			this.body.setVelocityX(0);
		}

        // W -> mueve en el eje -Y
		if(this.wKey.isDown) {
			this.setFlip(false, false)
			this.body.setVelocityY(-this.speed);
		}
        
        // S -> mueve en el eje Y
		if(this.sKey.isDown) {
			this.setFlip(false, false)
			this.body.setVelocityY(-this.speed);
		}

        // dejar W o S -> para
        if(Phaser.Input.Keyboard.JustUp(this.wKey) || Phaser.Input.Keyboard.JustUp(this.sKey)) {
			this.body.setVelocityY(0);
		}

        // space -> agarra
        if(his.spaceKey.isDown) {
            this.grab();
        }

        // deja space -> para de agarrar
        if(Phaser.Input.Keyboard.JustUp(this.spaceKey)) {
            this.stopGrab();
        }
    }

    grab() {
        this.isGrabbing = true;
    }

    stopGrab() {
        this.isGrabbing = false;
    }

    // getter de propiedad is grabbing
    getGrabbing() {
        return this.isGrabbing;
    }
}