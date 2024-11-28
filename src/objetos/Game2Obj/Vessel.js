export default class Vessel extends Phaser.GameObjects.Image{
    constructor(scene, cannon, maelstromObs, crocodileObs){
        super(scene, cannon.x, cannon.y - 50, 'vessel')
        this.scene = scene;
        this.cannon = cannon;
        this.maelstromObs = maelstromObs;
        this.crocodileObs = crocodileObs;

        // Añadir el objeto a la escena con físicas.
        scene.add.existing(this); 
        scene.physics.add.existing(this);

        // Configuración de las físicas.
        this.setScale(0.2); // Le pone el tamaño.
        this.body.setCollideWorldBounds(true); // Para que no se salga de los límites del mundo.
        this.body.setDrag(100); // Fricción con el suelo.

        // Al comienzo se desactiva.
        this.body.enable = false;
        this.setActive(false);
        this.setVisible(false);
        
        // La cámara sigue al vessel.
        this.scene.cameras.main.startFollow(this, false, 0.2, 0.2); 

        /*, hippoObs){
        //this.hippoObs = hippoObs;
        // --- VESSEL ---. EN UN FUTURO SERÁ SPRITESHEET
        //this.vessel = this.scene.physics.add.image(this.cannon.cannonBody.x, this.cannon.cannonBody.y - 50, 'vessel').setScale(0.2); // Añade la vasija en la pos del cañón.
        // disableBody([disableGameObject], [hideGameObject]).*/
    }

    launchVessel(angle){
        // Se activa.
        this.body.enable = true;
        this.setActive(true);
        this.setVisible(true);

        // Pone a la vasija donde el cañón.
        this.body.reset(this.cannon.cannonHead.x, this.cannon.cannonHead.y);

        // Lanza a la vasija con un ángulo y velocidad.
        this.scene.physics.velocityFromRotation(angle, 600, this.body.velocity); 

        //chick.play('fly'); // animación de vuelo del pollo.
    }

    /*collisionWithVessel(obstacle){

        // NOTA:
        // OVERLAP SI SUPERPONEN
        // COLlIDE SI COL.

        // Si colisiona la vasija con el obstáculo...
        if(this.scene.physics.world.collide(this, obstacle)){

            // OBSTÁCULO:
            if(obstacle === this.maelstromObs){ // MAELSTROM.
                this.destroy();
            }
            else if(obstacle === this.crocodileObs){ // CROCODILE.
                this.scene.physics.velocityFromRotation(45, 600, this.body.velocity); // Lanza a la vasija con un ángulo y velocidad.
            }
            else if(obstacle === this.hippoObs){
                // Lo que pasa cuando colisiona con HIPPO.  
            }
            //¿AGUA?
        }
    }*/
}