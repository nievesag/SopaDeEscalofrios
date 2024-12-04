import Crocodile from "./Crocodile";
import Hippo from "./Hippo";
import Maelstrom from "./Maelstrom";

export default class ObstaclesGenerator extends Phaser.GameObjects.Image{
    constructor(scene){ // Ponerle tambien obsGen aqui.
        super(scene, scene.cameras.main.centerX, scene.cameras.main.centerY, 'obstacleGenerator');
        
        this.scene = scene;

        // Mete el objeto en la escena con físicas.
        scene.add.existing(this);
        scene.physics.add.existing(this);

        // Configuración de las fisicas.
        this.setScale(0.25, 0.25); // tamaño
        this.setDepth(2);
        this.body.setAllowGravity(false); // fisicas
        this.body.setImmovable(true);

        // Grupo de obstáculos.
        this.obstacl

        // Se activa.
        this.body.enable = true;
        this.setActive(true);
        this.setVisible(true); 
    }
}