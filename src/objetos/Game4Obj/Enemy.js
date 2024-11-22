export default class Enemy extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y) {
        super(scene, x, y, 'lion');

        // Asignar un identificador único al enemigo
        this.scene.add.existing(this);
        this.scene.physics.world.enable(this);
        this.offsetRight = {x: 0, y: 0};
        this.offsetLeft = {x: 0, y: 0};
        this.setImmovable(true);
        this.isDead = false;

        // Ajustar el tamaño del cuerpo de físicas para que coincida con el sprite visual
        //this.body.setSize(16, 16);
        this.body.setOffset(this.offsetRight.x, this.offsetLeft.y);

        // Desactivar la gravedad
        this.body.setAllowGravity(false);

        // // Añadir tween para movimiento armónico simple con duración más larga
        // this.tween = this.scene.tweens.add({
        //     targets: this,
        //     x: x + 75 * this.direction, // Ajusta la amplitud del movimiento
        //     ease: 'Sine.easeInOut',
        //     yoyo: true,
        //     repeat: -1,
        //     duration: 3000 // Ajusta la duración del tween (en milisegundos)
        // });
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
            console.log("hola");
            arrow.destroy();
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
