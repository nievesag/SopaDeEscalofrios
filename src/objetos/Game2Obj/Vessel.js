export default class Vessel extends Phaser.GameObjects.Image{
    constructor(scene, cannon, maelstromObs){
        super(scene, cannon.cannonBody.x, cannon.cannonBody.y-50, 'vessel')
        this.setScale(0.2);
        scene.add.existing(this);
        scene.physics.add.existing(this);
        //crocodileObs, hippoObs){
        this.scene = scene;
        this.cannon = cannon;
        this.maelstromObs = maelstromObs;
        //this.crocodileObs = crocodileObs;
        //this.hippoObs = hippoObs;

        // --- VESSEL ---. EN UN FUTURO SERÁ SPRITESHEET
        //this.vessel = this.scene.physics.add.image(this.cannon.cannonBody.x, this.cannon.cannonBody.y - 50, 'vessel').setScale(0.2); // Añade la vasija en la pos del cañón.

        // disableBody([disableGameObject], [hideGameObject]).
        this.disableBody(  true , true); // Desactiva la vessel para que no colisione ni se vea todavía.
        this.setCollideWorldBounds(true); // Para que no se salga de los límites del mundo.
        this.setDrag(100); // Fricción con el suelo.

        // La cámara sigue al vessel.
        this.scene.cameras.main.startFollow(this, false, 0.2, 0.2); 
    }

    launchVessel(angle){
        //this.enableBody(true, this.cannon.cannonHead.x, this.cannon.cannonHead.y, true, true); // Activa la vessel y la pone donde cannonHead.
        //chick.play('fly'); // animación de vuelo del pollo.
        this.scene.physics.velocityFromRotation(angle, 600, this.body.velocity); // Lanza a la vasija con un ángulo y velocidad.
    }

    collisionWithVessel(obstacle){

        // OVERLAP SI SUPERPONEN
        // COLlIDE SI COL.
        if(this.scene.physics.world.collide(this, obstacle)){
            if(obstacle === this.maelstromObs){
                this.destroy;
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