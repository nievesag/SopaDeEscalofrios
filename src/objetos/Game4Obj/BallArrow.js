import Arrow from '../Game4Obj/Arrow.js';

export default class BallArrow extends Arrow {
    constructor(scene, x, y) {
        super(scene, x, y, 'arrow3');
        this.type = 'ball';  // Tipo de flecha
    }

    // Método para convertir la flecha en una bola cuando se hace clic
    transformToBall() {
        if (!this.scene) {
            console.error("Scene is undefined!");
            return; 
        }

        console.log(this.scene);
        // Usamos `this` directamente en lugar de `this.arrow`
        const posX = this.x;
        const posY = this.y;
        let velX = this.getVelX();
        let velY = this.getVelY();
        const auxAngle = this.angle;

         // Aumentar la componente Y para que la bola vaya más en picado
         const angleToGround = Math.atan2(velY, velX); // Obtén el ángulo de movimiento
         const gravityFactor = -0.1; // Ajusta este valor para aumentar el "picado"

        velY = Math.sin(angleToGround) * gravityFactor * Math.abs(velX);  // Modificar componente Y
        velX = Math.cos(angleToGround) * Math.abs(velX);  // Mantener la componente X para que siga en la misma dirección

        // Crear una nueva bola (círculo) en la posición de la flecha
        this.arrowBall = this.scene.add.circle(posX, posY, 100, 0xFFD700);
        this.scene.physics.world.enable(this.arrowBall);
        this.arrowBall.setFillStyle(0xFF4500);  // Cambiar el color a naranja para simular una bola
        this.arrowBall.setSize(100, 100);  // Cambiar el tamaño a una bola
        this.arrowBall.body.setCircle(100);  // Configurar el cuerpo para que sea circular

        this.arrowBall.body.setBounce(0);  // Añadir rebote
        this.arrowBall.body.setCollideWorldBounds(true);

        // Ajustar la velocidad de la flecha
        this.arrowBall.body.setVelocity(velX, velY);

        // Establecer la rotación de la bola
        this.arrowBall.setRotation(auxAngle);

        this.scene.time.delayedCall(4000, () => {
            if (this.arrowBall) {
                this.arrowBall.destroy(); // Destruir la bola
            }
        });

         // Destruir la flecha original
         this.destroy(); // Destruir la flecha actual, pero no su escena


     

    }
}
