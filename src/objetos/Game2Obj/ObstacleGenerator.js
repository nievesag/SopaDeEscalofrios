export default class ObstaclesGenerator extends Phaser.GameObjects.Image{
    constructor(scene, obsClass){ 
        super(scene, scene.cameras.main.centerX, scene.cameras.main.centerY + 250, 'obstacleGenerator');
        
        this.scene = scene;
        this.obsClass = obsClass;

        // Mete el objeto en la escena con físicas.
        scene.add.existing(this);

        // Configuración de las fisicas.
        this.setScale(0.25, 0.25).setDepth(2);

        // Grupo de obstacles.
        //this.obsGroup = this.scene.physics.add.staticGroup({ -> grupo dinamico.
        // HAY GRUPOS ESTÁTICOS (NO SE MUEVEN PERO TIENEN COLISIONES).
        this.obsGroup = this.scene.physics.add.group({ // grupo estático.
            runChildUpdate: true // cada objeto tiene su movida single (cada UPDATE).
        });

        // Contador y eliminación de obstáculos.
        this.scene.time.addEvent({
            delay: 2000, // tiempo entre obstáculo y obstáculo (2 segundos) 
            loop: true,
            callback: () => 
            {
                this.spawnObstacle();
            }
        });

        // Para evitar que se solapen los obsjetos.
        this.lastObstaclePosX = 0; // inicialmench es 0.
        this.minDistanceBetweenObstacles = Phaser.Math.Between(100, 300); // distancia mínima hasta summonear otro cacharro (a veces una a veces otra)
    }

    update(){
        // Mantiene al obstacle generator a la derecha de la pantalla.
        this.x = this.scene.cameras.main.scrollX + 1000 // scrollX te da la posición de la cámara.
        this.dissappearObstacle();
    }

    spawnObstacle(){

        // Voy a intentar hacer un dibujo que lo explique:
        // + -------------------------------------------- +
        // |                                              |
        // |   Si la linea esa es menor que la distancia  |
        // |   que tiene que haber en la variable de      |
        // |   minDistanceCojones, se peina y no genera   |
        // |                                              |
        // |                                              |
        // |                                              |
        // |                     OBS          OBSTACLEGEN |
        // |                      <----------------->     |
        // + -------------------------------------------- +
        if(this.x - this.lastObstaclePosX >= this.minDistanceBetweenObstacles){ // si la línea es >= ¡¡¡GENERA!!
            // Escoge entre los obstáculos alguno con rnd.next.
            let rndObs = Phaser.Utils.Array.GetRandom(this.obsClass);

            // Genera un nuevo obstáculo en la escena en la pos del obstacleGen.
            let obs = new rndObs.class(this.scene);
            obs.setPosition(this.x, this.y);

            // Lo genera y le quita la gravedad.
            this.obsGroup.add(obs);  

            this.lastObstaclePosX = this.x; // la posicion del ultimo ostáculo siempre será la del ultimo generado.
        } 
    }

    dissappearObstacle(){
        // Si se salen los obstáculos del juego...
        this.obsGroup.getChildren().forEach((obs) =>{
            if(obs.x < this.scene.cameras.main.scrollX){ // borde (determinar)
                this.obsGroup.killAndHide(obs); // desactiva, oculta
                obs.destroy(); // elimina.
            }
        });
    }
}
