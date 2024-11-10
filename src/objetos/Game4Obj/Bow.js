import Arrow from '../Game4Obj/Arrow.js';
import SplitArrow from '../Game4Obj/SplitArrow.js';
import BallArrow from '../Game4Obj/BallArrow.js';

export default class Bow extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y, arrowConfig) {
        super(scene, x, y, 'bow');
        this.scene.add.existing(this);
        this.scene = scene;
        this.setDisplaySize(100, 200);

        this.origin = new Phaser.Math.Vector2(x, y);
        this.band = this.scene.add.line(0, 0, 0, 0, 0, 0, 0x000000, 1).setOrigin(0);

        // Configuración dinámica de las flechas según el nivel
        this.arrowOrder = arrowConfig;  // Ejemplo: [{ type: 'normal', count: 3 }, { type: 'split', count: 2 }, { type: 'ball', count: 2 }]
        this.currentArrowIndex = 0;
        this.remainingArrows = this.arrowOrder[0].count;

        this.isDragging = false;
        this.maxStretch = 100;
        this.minPower = 150;
        this.maxPower = 800;

        this.setProjectile(); // Inicializa el primer proyectil

        this.scene.input.setDraggable(this.projectile);
        this.setupInputEvents();
    }

    setProjectile() {
        const arrowType = this.arrowOrder[this.currentArrowIndex].type;
        let ArrowClass;

        if (arrowType === 'normal') ArrowClass = Arrow;
        else if (arrowType === 'split') ArrowClass = SplitArrow;
        else if (arrowType === 'ball') ArrowClass = BallArrow;

        this.projectile = new ArrowClass(this.scene, this.origin.x, this.origin.y);
        this.projectile.body.setAllowGravity(false);
        this.projectile.body.setImmovable(true);
        this.projectile.setInteractive({ draggable: true });
    }

    setupInputEvents() {
        this.scene.input.on('dragstart', (pointer, gameObject) => {
            if (gameObject === this.projectile) this.isDragging = true;
        });

        this.scene.input.on('drag', (pointer, gameObject, dragX, dragY) => {
            if (gameObject === this.projectile && this.isDragging) {
                const dx = dragX - this.origin.x;
                const dy = dragY - this.origin.y;
                const distance = Phaser.Math.Distance.Between(this.origin.x, this.origin.y, dragX, dragY);

                if (distance > this.maxStretch) {
                    const angle = Phaser.Math.Angle.Between(this.origin.x, this.origin.y, dragX, dragY);
                    dragX = this.origin.x + Math.cos(angle) * this.maxStretch;
                    dragY = this.origin.y + Math.sin(angle) * this.maxStretch;
                }

                this.projectile.setPosition(dragX, dragY);
                this.band.setTo(this.origin.x, this.origin.y, this.projectile.x, this.projectile.y);
            }
        });

        this.scene.input.on('dragend', (pointer, gameObject) => {
            if (gameObject === this.projectile && this.isDragging) {
                this.isDragging = false;
                this.launchProjectile();
            }
        });

        this.scene.input.keyboard.on('keydown-SPACE', () => {
            if (this.projectile) {
                // Si la flecha es de tipo SplitArrow
                if (this.projectile instanceof SplitArrow) {
                    this.projectile.split();
                }
                // Si la flecha es de tipo BallArrow
                else if (this.projectile instanceof BallArrow) {
                    this.projectile.transformToBall();
                }
            }
        });
    }

    launchProjectile() {
        const distance = Phaser.Math.Distance.Between(this.origin.x, this.origin.y, this.projectile.x, this.projectile.y);
        const power = Phaser.Math.Clamp((distance / this.maxStretch) * this.maxPower, this.minPower, this.maxPower);

        const angle = Phaser.Math.Angle.Between(this.projectile.x, this.projectile.y, this.origin.x, this.origin.y);
        const velocityX = Math.cos(angle) * power;
        const velocityY = Math.sin(angle) * power;

        this.projectile.launch(velocityX, velocityY);
        this.band.setTo(0, 0, 0, 0);

        // Destruye la flecha después de un tiempo y configura la siguiente
        this.scene.time.delayedCall(2000, () => {
            this.projectile.destroy();
            this.remainingArrows--;

            if (this.remainingArrows <= 0) {
                this.currentArrowIndex++;
                if (this.currentArrowIndex < this.arrowOrder.length) {
                    this.remainingArrows = this.arrowOrder[this.currentArrowIndex].count;
                }
            }

            if (this.currentArrowIndex < this.arrowOrder.length) {
                this.setProjectile(); // Crea el siguiente tipo de flecha en orden
                this.scene.input.setDraggable(this.projectile);
            }
        });
    }
}
