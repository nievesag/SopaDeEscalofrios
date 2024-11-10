export default class Arrow extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y, spriteKey = 'arrow1') {
        super(scene, x, y, spriteKey);  // Usamos un sprite personalizado para cada flecha

        this.scene = scene;
        this.scene.add.existing(this);
        this.scene.physics.world.enable(this);

        // Configuraciones iniciales de la física
        this.body.setAllowGravity(false);
        this.body.setImmovable(true);
        
        this.velX = 0;
        this.velY = 0;
        this.setDisplaySize(100, 20);
        this.body.onCollide = true;

    }

    // Método para lanzar la flecha con una velocidad determinada
    launch(velocityX, velocityY) {

        this.velX = velocityX;
        this.velY = velocityY;

        this.body.setAllowGravity(true);
        this.body.setImmovable(false);
        this.body.setCollideWorldBounds(true);
        this.body.setBounce(0.2);

        this.body.setVelocity(this.velX, this.velY);

        // Rotar en la dirección del movimiento
        const angle = Phaser.Math.Angle.Between(0, 0, velocityX, velocityY);
        this.setRotation(angle);

        this.body.setDragX(0);
    }

    getVelX(){
        return this.velX;
    }

    getVelY() {
        return this.velY;
    }



    

   
}
