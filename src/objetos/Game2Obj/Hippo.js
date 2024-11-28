export default class Hippo extends Phaser.GameObjects.Image{
    constructor(scene){ // Ponerle tambien obsGen aqui.
        super(scene, scene.cameras.main.centerX + 200, scene.cameras.main.centerY + 250, 'hippo');

        this.scene = scene;
        
        // Mete el objeto en la escena con físicas.
        scene.add.existing(this);
        scene.physics.add.existing(this);

        // Configuración de las fisicas.
        this.setScale(0.2); // tamaño
        this.body.setAllowGravity(false); // fisicas
        this.body.setImmovable(true);

        // Se activa.
        this.body.enable = true;
        this.setActive(true);
        this.setVisible(true); 
    }
}