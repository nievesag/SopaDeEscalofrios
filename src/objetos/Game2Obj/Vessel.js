export default class Vessel extends Phaser.GameObjects.Image{
    constructor(scene, cannon, obstacleGenerator){
        super(scene, cannon.x, cannon.y - 50, 'vessel');
        
        this.scene = scene;
        this.cannon = cannon;
        this.obstacleGen = obstacleGenerator;

        // añadir el objeto a la escena con físicas.
        scene.add.existing(this); 
        scene.physics.add.existing(this);

        // config de las físicas.
        this.setScale(0.4); // Le pone el tamaño.
        this.body.setCollideWorldBounds(true); // Para que no se salga de los límites del mundo.
        this.body.setDrag(50); // Fricción con el suelo (NON OSTUCALOS).
        this.body.setAngularDrag(50); // rotación angular con el airew y tal.
        this.body.setBounce(1); // rebote con colisiones.
        this.setDepth(5); // siempre delante de todo.

        // Al comienzo se desactiva.
        this.body.enable = false;
        this.setActive(false).setVisible(false);
        
        // La cámara sigue al vessel.
        this.scene.cameras.main.startFollow(this, false, 0.2, 0.2); 

        this.isLaunched = false; // inicialmench la vasija no es lanzada
  
    }

    launchVessel(angle){

        this.isLaunched = true; // se ha lanzado la vesel.

        // guarda la pos inicial de x.
        this.initialPosX = this.x; 

        // se activa.
        this.body.enable = true;
        this.setActive(true).setVisible(true);

        // pone a la vasija donde el cañón.
        this.body.reset(this.cannon.cannonHead.x, this.cannon.cannonHead.y);

        let launchForce; // fuerza con la q se lanza inicialmente la vasija.
        let cannonForce = Math.floor(this.cannon.power); // fuerza del cañón truncada.

        if(cannonForce === 0) launchForce = 100; // poca fuerza.
        else if(cannonForce === 1) launchForce = 300; // jijijuju.
        else if (cannonForce === 2) launchForce = 500; // ni mas ni menos.
        else if (cannonForce === 3) launchForce = 700; // va folledo.
        else if (cannonForce === 4) launchForce = 900; // joder lo folledo que va.
        else if (cannonForce === 5) launchForce = 1200; // NITRO.

        // lanza a la vasija con un ángulo y velocidad.
        this.scene.physics.velocityFromRotation(angle, launchForce, this.body.velocity); 

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
                this.scene.gameOver();
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

        // SI SE QUISIERA COLISIONAR CON UNA MOVIDA SINGLE (NON LO DE ARRIBA).
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