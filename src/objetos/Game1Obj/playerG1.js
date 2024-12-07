export default class PlayerG1 extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y) {
        super(scene, x, y, 'player');
        this.scene = scene;
        this.x = x;
        this.y = y;
        this.speed = 140; // velocidad de movimiento

        this.scene.add.existing(this); // mete al pj en la escena

        this.wKey = this.scene.input.keyboard.addKey('W'); // arriba
		this.aKey = this.scene.input.keyboard.addKey('A'); // izq
		this.aKey = this.scene.input.keyboard.addKey('S'); // abajo
		this.dKey = this.scene.input.keyboard.addKey('D'); // der
		this.spaceKey = this.scene.input.keyboard.addKey('SPACE'); // agarrar

		// Agregamos al player a las físicas para que Phaser lo tenga en cuenta -> no se si hace falta
		this.scene.physics.add.existing(this);

        this.grabArea = this.scene.physics.add.sprite(this.getCenter().x, this.getCenter().y, null);
        this.grabArea.body.setAllowGravity(false);
        this.grabArea.setSize(50,50);
        this.grabArea.setDepth(10);
		this.body.setSize(28, 28); // Para que entre mejor por los pasillos

        // flags de teclas
        this.isW = false;
        this.isA = false;
        this.isS = false;
        this.isD = false;
        this.isGrabbing = false; 

        // player colisiona con los límites del mundo
		this.body.setCollideWorldBounds();
        this.body.setDrag(0); // rozamiento

        this.body.setAllowGravity(false);
    }

    // t -> tiempo total
    // dt -> tiempo entre frames
    preUpdate(t, dt) {
        super.preUpdate(t, dt); // llamar al preupdate del padre (sprite) para activar animación si la hubiera

        // ---- input ----
        // A -> mueve en el eje -X
        this.scene.input.keyboard.on('keydown-A', () => {
            this.isA = true;
			this.body.setVelocityX(-this.speed);
        });

		// D -> mueve en el eje X
        this.scene.input.keyboard.on('keydown-D', () => {
            this.isD = true;
			this.body.setVelocityX(this.speed);
        });

		// dejar A o D -> para
        this.scene.input.keyboard.on('keyup-A', () => {
            this.isA = false;
            this.body.setVelocityX(0);
        });

        this.scene.input.keyboard.on('keyup-D', () => {
            this.isD = false;
            this.body.setVelocityX(0);
        });

        // W -> mueve en el eje -Y
        this.scene.input.keyboard.on('keydown-W', () => {
            this.isW = true;
			this.body.setVelocityY(-this.speed);
        });
        
        // S -> mueve en el eje Y
        this.scene.input.keyboard.on('keydown-S', () => {
            this.isS = true;
			this.body.setVelocityY(this.speed);
        });
        
        // dejar W o S -> para
        this.scene.input.keyboard.on('keyup-W', () => {
            this.isW = false;
            this.body.setVelocityY(0);
        });

        this.scene.input.keyboard.on('keyup-S', () => {
            this.isS = false;
            this.body.setVelocityY(0);
        });

        // SPACE -> esta agarrando
        this.scene.input.keyboard.on('keydown-SPACE', () => {
            this.isGrabbing = true;
        });

        // deja SPACE -> deja de agarrar
        this.scene.input.keyboard.on('keyup-SPACE', () => {
            this.isGrabbing = false;
        });
    }

    setGrabAreaPos(x, y) {
        this.grabArea.x = x;
        this.grabArea.y = y;
    }
    getGrabArea() { return this.grabArea; }

    // getters de flags
    getisW(){ return this.isW; }
    getisA(){ return this.isA; }
    getisS(){ return this.isS; }
    getisD(){ return this.isD; }
    getGrabbing() { return this.isGrabbing; }
}