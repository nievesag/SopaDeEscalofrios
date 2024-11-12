import Arrow from '../Game4Obj/Arrow.js';
import SplitArrow from '../Game4Obj/SplitArrow.js';
import BallArrow from '../Game4Obj/BallArrow.js';

export default class Bow {
    constructor(scene, x, y) {
        this.scene = scene;
        this.x = x;
        this.y = y;
        
        // Crear los elementos del arco
        this.origin = new Phaser.Math.Vector2(x, y);
        this.band = this.scene.add.line(0, 0, 0, 0, 0, 0, 0x000000, 1).setOrigin(0);

        // Crear la flecha como el proyectil
        this.projectile = new BallArrow(this.scene, x, y); 
        
        // Posicionar la flecha sobre el arco
        this.projectile.arrow.setPosition(this.origin.x, this.origin.y); // Posición inicial sobre el arco
        this.projectile.arrow.body.setAllowGravity(false);  // Desactivar la gravedad
        this.projectile.arrow.body.setImmovable(true);      // No debe moverse

        // Configuración del proyectil
        this.isDragging = false;
        this.maxStretch = 100;
        this.minPower = 150; 
        this.maxPower = 800; 

        // Hacer que la flecha sea interactiva
        this.projectile.arrow.setInteractive();
        this.scene.input.setDraggable(this.projectile.arrow);

        // Eventos de arrastrar y soltar
        this.scene.input.on('dragstart', (pointer, gameObject) => {
            if (gameObject === this.projectile.arrow) {
                this.isDragging = true;
            }
        });

        this.scene.input.on('drag', (pointer, gameObject, dragX, dragY) => {
            if (gameObject === this.projectile.arrow && this.isDragging) {
                const dx = dragX - this.origin.x;
                const dy = dragY - this.origin.y;
                const distance = Phaser.Math.Distance.Between(this.origin.x, this.origin.y, dragX, dragY);

                if (distance > this.maxStretch) {
                    const angle = Phaser.Math.Angle.Between(this.origin.x, this.origin.y, dragX, dragY);
                    dragX = this.origin.x + Math.cos(angle) * this.maxStretch;
                    dragY = this.origin.y + Math.sin(angle) * this.maxStretch;
                }

                this.projectile.arrow.x = dragX;
                this.projectile.arrow.y = dragY;
                this.band.setTo(this.origin.x, this.origin.y, this.projectile.arrow.x, this.projectile.arrow.y);
            }
        });

        this.scene.input.on('dragend', (pointer, gameObject) => {
            if (gameObject === this.projectile.arrow && this.isDragging) {
                this.isDragging = false;

                // Calcular la distancia y ajustar la potencia
                const distance = Phaser.Math.Distance.Between(this.origin.x, this.origin.y, this.projectile.arrow.x, this.projectile.arrow.y);
                const power = Phaser.Math.Clamp((distance / this.maxStretch) * this.maxPower, this.minPower, this.maxPower);

                // Calcular dirección y velocidad
                const angle = Phaser.Math.Angle.Between(this.projectile.arrow.x, this.projectile.arrow.y, this.origin.x, this.origin.y);
                const velocityX = Math.cos(angle) * power;
                const velocityY = Math.sin(angle) * power;

                // Lanzar la flecha
                this.projectile.launch(velocityX, velocityY);

                // Limpiar la banda una vez lanzado
                this.band.setTo(0, 0, 0, 0);
            }
        });

        this.scene.input.keyboard.on('keydown-SPACE', () => {
            if (this.projectile.arrow.body) {
                if (this.projectile instanceof SplitArrow) {
                    this.projectile.split();  // Dividir la flecha
                } else if (this.projectile instanceof BallArrow) {
                    this.projectile.transformToBall();  // Convertir la flecha en bola
                }
            }
        });
    }
}
