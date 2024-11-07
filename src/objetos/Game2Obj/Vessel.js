export default class Vessel{
    constructor(scene, cannon){
        this.scene = scene;
        this.cannon = cannon;

        // --- VESSEL ---. EN UN FUTURO SERÁ SPRITESHEET
        this.vessel = this.scene.physics.add.image(this.cannon.cannonBody.x, this.cannon.cannonBody.y - 50, 'vessel').setScale(0.2); // Añade la vasija en la pos del cañón.
        this.vessel.disableBody(true, true); // Desactiva la vessel para que no colisione ni se vea todavía.
        this.vessel.setCollideWorldBounds(true); // Para que no se salga de los límites del mundo.
        this.vessel.setDrag(100); // Fricción con el suelo.

        // La cámara sigue al vessel.
        this.scene.cameras.main.startFollow(this.vessel, false, 0.2, 0.2); 
    }

    launchVessel(angle){
        this.vessel.enableBody(true, this.cannon.cannonHead.x, this.cannon.cannonHead.y, true, true); // Activa la vessel y la pone donde cannonHead.
        //chick.play('fly'); // animación de vuelo del pollo.
        this.scene.physics.velocityFromRotation(angle, 600, this.vessel.body.velocity); // Lanza a la vasija con un ángulo y velocidad.
    }
}