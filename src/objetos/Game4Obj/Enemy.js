export default class Enemy extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y) {
        super(scene, x, y, 'lion');

        // Asignar un identificador único al enemigo
        this.scene.add.existing(this);
        this.scene.physics.world.enable(this);
        this.offsetRight = {x: 50, y: 0};
        this.offsetLeft = {x: 0, y: 20};
        this.setImmovable(false);
        this.isDead = false;
        this.setScale(0.4, 0.4);
       
        this.body.setSize(150, 150);
        this.body.setOffset(this.offsetRight.x, this.offsetLeft.y);

        // Desactivar la gravedad
        this.body.setAllowGravity(true);

        // // Añadir tween para movimiento armónico simple con duración más larga
        // this.tween = this.scene.tweens.add({
        //     targets: this,
        //     x: x + 75 * this.direction, // Ajusta la amplitud del movimiento
        //     ease: 'Sine.easeInOut',
        //     yoyo: true,
        //     repeat: -1,
        //     duration: 3000 // Ajusta la duración del tween (en milisegundos)
        // });
        this.scene.physics.add.collider(this, this.scene.ground, () => {
            this.body.setVelocityX(0); 
            this.body.setVelocityY(0);
            this.body.setBounce(0);  
        });

    
    }

    preUpdate(t, dt) {
        super.preUpdate(t, dt);   
    }

    checkCollisionWithArrow(scene, arrow) {
        if (this.isDead) {
            // Si el enemigo ya está muerto, no hay colisión
            return false;
        }

        // Verifica la colisión con el jugador
        const collision = this.scene.physics.world.collide(this, arrow);

        if (collision) {
            this.scene.enemiesCounter++;
            //arrow.destroy();
            this.isDead = true;
            this.selfDestroy();
        }

        return collision;
    }

    selfDestroy(){
        this.destroy();
    }

    freeze(){
        this.body.setAllowGravity(false);
        this.setVelocityX(0);
        this.setVelocityY(0);
        this.tween.stop();  // Detener el tween al congelar al enemigo
    }

    getId() {
        return this.enemyId;
    }
}
