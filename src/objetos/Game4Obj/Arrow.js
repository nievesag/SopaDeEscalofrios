export default class Arrow {
    constructor(scene, x, y) {
        this.scene = scene;

        // Crear la flecha como un rectángulo alargado
        this.arrow = this.scene.add.rectangle(x, y, 40, 10, 0xFFD700); // Flecha amarilla de 40x10
        this.arrow.setOrigin(0.5, 0.5);

        // Inicializar sin física activa
        this.scene.physics.world.enable(this.arrow);
        this.arrow.body.setAllowGravity(false);  // Desactivamos la gravedad temporalmente
        this.arrow.body.setImmovable(true);      // La flecha no se moverá hasta el lanzamiento

        // Detectar cuando la flecha toque el suelo
        this.arrow.body.onCollide = true;  // Habilitar la detección de colisiones
    }

    // Método para lanzar la flecha con una velocidad determinada
    launch(velocityX, velocityY) {
        // Activar la gravedad y permitir movimiento en el momento del lanzamiento
        this.arrow.body.setAllowGravity(true);
        this.arrow.body.setImmovable(false); 

        // Configurar colisión con los límites del mundo y rebote
        this.arrow.body.setCollideWorldBounds(true);
        this.arrow.body.setBounce(0.2);  

        // Ajustar la velocidad de la flecha
        this.arrow.body.setVelocity(velocityX, velocityY);

        // Rotar la flecha en la dirección del movimiento
        const angle = Phaser.Math.Angle.Between(0, 0, velocityX, velocityY);
        this.arrow.setRotation(angle);

        // Desactivar la fricción al inicio del lanzamiento
        this.arrow.body.setDragX(0);
    }

    

   
}
