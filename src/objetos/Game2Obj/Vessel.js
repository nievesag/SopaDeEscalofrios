export default class Vessel extends Phaser.GameObjects.Image{
    constructor(scene, cannon, maelstromObs){
        super(scene, cannon.cannonBody.x, cannon.cannonBody.y - 50, 'vessel')

        this.scene = scene;
        this.cannon = cannon;
        this.maelstromObs = maelstromObs;

        // Añadir a esta escena.
        scene.add.existing(this); 

        // Le pone físicas a la vasija.
        scene.physics.add.existing(this);

        // Le pone el tamaño.
        this.setScale(0.2);

        // Configuración de las físicas.
        this.body.setCollideWorldBounds(true); // Para que no se salga de los límites del mundo.
        this.body.setDrag(100); // Fricción con el suelo.

        // Al comienzo se desactiva.
        this.disableBody(true , true); 
        
        // La cámara sigue al vessel.
        this.scene.cameras.main.startFollow(this, false, 0.2, 0.2); 

        /*//crocodileObs, hippoObs){
        //this.crocodileObs = crocodileObs;
        //this.hippoObs = hippoObs;
        // --- VESSEL ---. EN UN FUTURO SERÁ SPRITESHEET
        //this.vessel = this.scene.physics.add.image(this.cannon.cannonBody.x, this.cannon.cannonBody.y - 50, 'vessel').setScale(0.2); // Añade la vasija en la pos del cañón.
        // disableBody([disableGameObject], [hideGameObject]).*/
    }

    launchVessel(angle){
        // Activa la vessel y la pone donde cannonHead.
        this.enableBody(true, this.cannon.cannonHead.x, this.cannon.cannonHead.y, true, true); 

        // Lanza a la vasija con un ángulo y velocidad.
        this.scene.physics.velocityFromRotation(angle, 600, this.body.velocity); 

        //chick.play('fly'); // animación de vuelo del pollo.
    }

    collisionWithVessel(obstacle){

        // NOTA:
        // OVERLAP SI SUPERPONEN
        // COLlIDE SI COL.

        // Si colisiona la vasija con el obstáculo...
        if(this.scene.physics.world.collide(this, obstacle)){

            // OBSTÁCULO:
            if(obstacle === this.maelstromObs){ // MAELSTROM.
                this.destroy();
            }
            else if(obstacle === this.crocodileObs){
                // Lo que pasa cuando colisiona con CROCODILE.
            }
            else if(obstacle === this.hippoObs){
                // Lo que pasa cuando colisiona con HIPPO.  
            }
            //¿AGUA?
        }


        
    }


}