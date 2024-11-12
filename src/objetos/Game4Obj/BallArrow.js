import Arrow from '../Game4Obj/Arrow.js';

export default class BallArrow extends Arrow {
    constructor(scene, x, y) {
        super(scene, x, y);
        this.type = 'ball';  // Tipo de flecha
    }

    // Método para convertir la flecha en una bola cuando se hace clic
    transformToBall() {

       
        this.posX = this.arrow.x;
        this.posY = this.arrow.y
        this.velX = this.getVelX();
        this.velY = this.getVelY();
        this.auxAngle = this.angle;
        this.arrow.destroy();


        this.arrowBall = this.scene.add.circle(this.posX, this.posY, 100, 0xFFD700)
        this.scene.physics.world.enable(this.arrowBall);
        this.arrowBall.setFillStyle(0xFF4500);  // Cambiar el color a naranja para simular una bola
        this.arrowBall.setSize(100, 100);  // Cambiar el tamaño a una bola
        this.arrowBall.body.setCircle(100);  // Configurar el cuerpo para que sea circular

        this.arrowBall.body.setBounce(0.2);  // Añadir rebote
        this.arrowBall.body.setCollideWorldBounds(true);
 
        // Ajustar la velocidad de la flecha
        this.arrowBall.body.setVelocity(this.velX, 0);

        this.arrowBall.setRotation(this.auxAngle);

    }
}
