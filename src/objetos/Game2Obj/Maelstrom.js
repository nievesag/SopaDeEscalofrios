export default class Maelstrom extends Phaser.GameObjects.Image{
    constructor(scene){ // Ponerle tambien obsGen aqui.
        super(scene, scene.cameras.main.centerX + 200, scene.cameras.main.centerY + 250, 'maelstrom');

        this.scene = scene;

        /*//this.obstacleGenerator = obstacleGenerator;
        // ---MAELSTROM---.
        // NOTA (A FUTURO): al principio la pondremos en el centro, pero luego habrá que ponerlo donde (this.obstacleGenerator.x, this.obstacleGenerator.y) para que aparezca en esa ubi.
        // this.maelstrom = this.scene.physics.add.image(this.obstacleGenerator.x, this.obstacleGenerator.y, 'maelstrom')*/ 
        
        // Mete el objeto en la escena con físicas.
        scene.add.existing(this);
        scene.physics.add.existing(this);

        // Configuración de las fisicas.
        this.setScale(0.2); // tamaño
        this.body.setAllowGravity(false); // fisicas
        this.body.setImmovable(true);

        // Posición.
        //this.setPosition(scene.cameras.main.centerX + 200, scene.cameras.main.centerY + 250);

        // Se activa.
        this.body.enable = true;
        this.setActive(true);
        this.setVisible(true); 
    }
}