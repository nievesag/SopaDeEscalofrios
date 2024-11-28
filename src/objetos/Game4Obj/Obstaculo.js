export default class Obstaculo extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y, fragments) {
        super(scene, x, y, 'obstaculo1');
      
        this.scene.add.existing(this);
        this.scene.physics.world.enable(this);
        this.offsetRight = {x: 0, y: 0};
        this.offsetLeft = {x: 0, y: 0};
        this.setImmovable(true);
        this.isDead = false;


        this.body.setSize(400, 50);
        this.body.setOffset(this.offsetRight.x, this.offsetLeft.y);

        this.body.setAllowGravity(false);
        this.fragments = fragments; // Número de fragmentos al romperse
    }


    preUpdate(t, dt) {
        super.preUpdate(t, dt);   
    }

    breakApart() {
        this.setVisible(false); // Ocultar el obstáculo original
        this.body.destroy(); // Desactivar el cuerpo original

        // Crear fragmentos
        for (let i = 0; i < this.fragments; i++) {
            const fragment = this.scene.add.sprite(
                this.x + Phaser.Math.Between(-10, 10),
                this.y + Phaser.Math.Between(-10, 10),
                'obstaculo2' // Asegúrate de tener una textura para los fragmentos
            );

            fragment.setDisplaySize(30, 30); // Tamaño de los fragmentos
            this.scene.physics.world.enable(fragment);

            fragment.body.setAllowGravity(true);
            fragment.body.setVelocity(
                Phaser.Math.Between(-100, 100),
                Phaser.Math.Between(-200, 0)
            );
            fragment.body.setCollideWorldBounds(true);
            fragment.body.setBounce(0.3); // Rebote de los fragmentos
        }

        this.destroy(); // Elimina el obstáculo original
    }

    checkCollisionWithArrowObs(scene, arrow) 
    {
       
        if (this.isDead) {
            // Si el enemigo ya está muerto, no hay colisión
            return false;
        }

        // Verifica la colisión con el jugador
       // const collision = this.scene.physics.world.collide(this, arrow);
        //console.log(collision);

       // if (collision) {
            console.log("si");
            arrow.destroy();
            this.isDead = true;
            this.breakApart();
        //}

      //  return collision;

    }
}
