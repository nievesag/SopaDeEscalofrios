export default class Obstacle extends Phaser.Physics.Arcade.Image {
    constructor(scene, type){
        super(scene, 0, 0, type);

        this.scene = scene;
        this.type = type;

        // Mete el objeto en la escena con físicas.
        scene.add.existing(this);
        scene.physics.add.existing(this);

        // Configuración de las fisicas.
        this.setScale(0.3); // tamaño
        this.body.setAllowGravity(false); // fisicas
        this.body.setImmovable(true);
        this.body.moves = false; // CONGELA EL OBJETO, pero permite colisión.
        // Lo de arriba lo he apañao cfon grupos estáticos.
    }

}