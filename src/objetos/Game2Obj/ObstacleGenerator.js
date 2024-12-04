export default class ObstaclesGenerator extends Phaser.GameObjects.Image{
    constructor(scene, obsClass){ 
        super(scene, scene.cameras.main.centerX, scene.cameras.main.centerY, 'obstacleGenerator');
        
        this.scene = scene;
        this.obsClass = obsClass;

        // Mete el objeto en la escena con físicas.
        scene.add.existing(this);
        scene.physics.add.existing(this);

        // Configuración de las fisicas.
        this.setScale(0.25, 0.25); // tamaño
        this.setDepth(2);
        this.body.setAllowGravity(false); // fisicas
        this.body.setImmovable(true);

        // Grupo de obstacles.
        this.obsGroup = this.scene.physics.add.group({
            maxSize: 5, // obstáculos activos en el momento.
            runChildUpdate: true // cada objeto tiene su movida single.
        });

        // Contador y eliminación de obstáculos.
        this.counter = this.scene.time.addEvent({
            delay: 500, // tiempo entre obstáculo y obstáculo.
            callback: this.spawnObstacle(),
            loop: true,
        });
    }

    update(){
        // Si se salen los obstáculos del juego...
        this.obsGroup.getChildren().forEach((obs) =>{
            if(obs.x < this.scene.cameras.main.x){ // borde.
                this.obsGroup.killAndHide(obs); // desactiva, oculta
                obs.destroy(); // elimina.
            }
        });
    }

    spawnObstacle(){
        // Escoge entre los obstáculos alguno con rnd.next.
        const rndObs = Phaser.Utils.Array.GetRandom(this.obsClass);

        // Genera un nuevo obstáculo en la escena en la pos del obstacleGen.
        const obs = new rndObs.class(this.scene, this.x, this.y);

        // Lo genera y le quita la gravedad.
        this.obsGroup.add(obs);  
        obs.body.setAllowGravity(false);  
    }
}
