export default class Obstacle extends Phaser.Physics.Arcade.Image {
    constructor(scene, x, y, type){
        super(scene, x, y, type);

        this.scene = scene;

        // Mete el objeto en la escena con físicas.
        scene.add.existing(this);
        scene.physics.add.existing(this);

        // Configuración de las fisicas.
        this.setScale(0.2); // tamaño
        this.body.setAllowGravity(false); // fisicas
        this.body.setImmovable(true);
    }
}