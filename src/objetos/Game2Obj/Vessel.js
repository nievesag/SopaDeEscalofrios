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
        this.setScale(0.35); // Le pone el tamaño.
        this.body.setCollideWorldBounds(true); // Para que no se salga de los límites del mundo.
        this.body.setDrag(100); // Fricción con el suelo.
        this.body.setAngularDrag(50); // rotación angular con el airew y tal.
        this.body.setBounce(1); // rebote con colisiones.

        // Al comienzo se desactiva.
        this.body.enable = false;
        this.setActive(false).setVisible(false);
        
        // La cámara sigue al vessel.
        this.scene.cameras.main.startFollow(this, false, 0.2, 0.2); 

        this.isRotating = false;
    }

    update(){
        if(this.isRotating){
            this.rotation += 0.045; // rota.
        }

    }

    launchVessel(angle){
        // Se activa.
        this.body.enable = true;
        this.setActive(true).setVisible(true);

        // Pone a la vasija donde el cañón.
        this.body.reset(this.cannon.cannonHead.x, this.cannon.cannonHead.y);

        // Lanza a la vasija con un ángulo y velocidad.
        this.scene.physics.velocityFromRotation(angle, 600, this.body.velocity); 

        this.body.setAngularVelocity(200); // vel de giro inicial.

        //chick.play('fly'); // animación de vuelo del pollo.
    }

    vesselCollisions(){

        // NOTA:
        // OVERLAP SI SUPERPONEN
        // COLlIDE SI COL.

        this.scene.physics.add.collider(this, this.obstacleGen.obsGroup, (vessel, obstacle) =>{
            if(obstacle.type === 'maelstrom'){
                this.body.enable = false;
                this.setActive(false).setVisible(false);
                this.isRotating = false;
            }
            else if(obstacle.type === 'crocodile'){
                this.scene.physics.velocityFromRotation(-45, 800, this.body.velocity); // Ángulo y velocidad.
                this.body.setAngularVelocity(500);
            }
            else if(obstacle.type === 'hippo'){
                this.scene.physics.velocityFromRotation(-45, 300, this.body.velocity); 
                this.body.setAngularVelocity(300);
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