export default class Vessel extends Phaser.GameObjects.Image{
    constructor(scene, cannon, obstacleGenerator){
        super(scene, cannon.x, cannon.y - 50, 'vessel');
        
        this.scene = scene;
        this.cannon = cannon;
        this.obstacleGen = obstacleGenerator;

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

    vesselCollisions(){

        // NOTA:
        // OVERLAP SI SUPERPONEN
        // COLlIDE SI COL.

        this.scene.physics.add.collider(this, this.obstacleGen.obsGroup, (vessel, obstacle) =>{
            if(obstacle.type === 'maelstrom'){
                this.body.enable = false;
                this.setActive(false);
                this.setVisible(false);
            }
            else if(obstacle.type === 'crocodile'){
                this.scene.physics.velocityFromRotation(-45, 800, this.body.velocity); // Ángulo y velocidad.
            }
            else if(obstacle.type === 'hippo'){
                this.scene.physics.velocityFromRotation(-45, 300, this.body.velocity); 
            }
        })

        /*if(this.maelstromObs){
            this.scene.physics.add.collider(this, this.maelstromObs, ()=>{
                this.body.enable = false;
                this.setActive(false);
                this.setVisible(false);
            });
        }

        if(this.crocodileObs){
            this.scene.physics.add.collider(this, this.crocodileObs, ()=>{
                this.scene.physics.velocityFromRotation(-45, 800, this.body.velocity); // Lanza a la vasija con un ángulo y velocidad.
            });
        }

        if(this.hippoObs){
            this.scene.physics.add.collider(this, this.hippoObs, ()=>{
                this.scene.physics.velocityFromRotation(-45, 300, this.body.velocity); // Lanza a la vasija con un ángulo y velocidad.
            });
        }*/
        
        
    }
}