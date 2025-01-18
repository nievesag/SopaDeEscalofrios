export default class Arrow extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y, spriteKey = 'arrow1') {
        super(scene, x, y, spriteKey);  

        this.scene = scene;
        this.scene.add.existing(this);
        this.scene.physics.world.enable(this);

        this.body.setAllowGravity(false);
        this.body.setImmovable(true);
        
        this.velX = 0;
        this.velY = 0;
        this.setDisplaySize(100, 20);
        this.body.onCollide = true;

        this.scene.events.on('update', this.updateRotation, this);
        this.type = 'normal';
    }

    launch(velocityX, velocityY) { //Metodo que gestiona el lanzamiento de la flecha

        this.velX = velocityX;
        this.velY = velocityY;

        this.body.setAllowGravity(true);
        this.body.setImmovable(false);
        this.body.setCollideWorldBounds(true);
        this.body.setBounce(0.2);

        this.body.setVelocity(this.velX, this.velY);

        // Rota en la direccion del movimiento
        const angle = Phaser.Math.Angle.Between(0, 0, velocityX, velocityY);
        this.setRotation(angle);

        //this.body.setDragX(0);
        this.scene.physics.add.collider(this, this.scene.ground, () => {
            this.body.setVelocityX(0); 
            this.body.setVelocityY(0);
            this.body.setBounce(0);  
        });

        this.scene.activeArrowsPool.push(this);
    }

    getVelX(){ //Getter de la vel X
        return this.velX;
    }

    getVelY() { //Getter de la vel Y
        return this.velY;
    }

    updateRotation() {  //Actualiza la rotacion de la flecha
        
        if (this.body && (this.body.velocity.x !== 0 || this.body.velocity.y !== 0)) {
            const angle = Phaser.Math.Angle.Between(0, 0, this.body.velocity.x, this.body.velocity.y);
            this.setRotation(angle);
        }
    }

   



    

   
}
