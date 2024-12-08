import Crocodile from "./Crocodile.js";
import Hippo from "./Hippo.js";
import Maelstrom from "./Maelstrom.js";

export default class ObstaclesGenerator extends Phaser.GameObjects.Image{
    constructor(scene, gameState){ 
        super(scene, scene.cameras.main.centerX + 1115, scene.cameras.main.centerY + 300, 'obstacleGenerator');
        
        this.scene = scene;
        this.gameState = gameState

        // mete el objeto en la escena con físicas.
        scene.add.existing(this);

        // configuración de las fisicas.
        this.setScale(0.25, 0.25).setDepth(2).setScrollFactor(0); // config de la UI.

        // grupo estático.
        this.obsGroup = this.scene.physics.add.group({ 
            runChildUpdate: true // cada objeto tiene su movida single (cada UPDATE).
        });

        // pone los obstáculos dependiendo del día que sea.
        this.setObstaclesPerDay();

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
        this.minDistanceBetweenObstacles = Phaser.Math.Between(300, 500); // distancia mínima hasta summonear otro cacharro (a veces una a veces otra)
    }

    update(){
        if(this.scene)this.dissappearObstacle();
    }

    setObstaclesPerDay(){
        // ponemos obsclass al principio como array vacio.
        this.obsClass = []; 

        // segun el día hay unos obstáculos u otros.
        if(this.gameState.currentDay === 1 || this.gameState.currentDay === 2){ // DIFICULTAD 1.
            // cocodrilos single:
            this.obsClass = [
                {type: 'crocodile', class: Crocodile}
            ];
        }
        else if(this.gameState.currentDay === 3 || this.gameState.currentDay === 4){ // DIFICULTAD 2.
    
            // + hippos.
            this.obsClass = [
                {type: 'crocodile', class: Crocodile},
                {type: 'hippo', class: Hippo}
            ];
        }
        else if(this.gameState.currentDay === 5){ // DIFICULTAD FINAL.
            // + maelstrom.
            this.obsClass = [
                {type: 'crocodile', class: Crocodile},
                {type: 'hippo', class: Hippo},
                {type: 'maelstrom', class: Maelstrom}
            ];
        }
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
            if(obs.x < this.scene.cameras.main.scrollX - 100){ // borde izquierdo (un poco mas a la izquierda para q no despopee de pronto)
                this.obsGroup.killAndHide(obs); // desactiva, oculta
                obs.destroy(); // elimina.
            }
        });
    }
}
