import Arrow from '../Game4Obj/Arrow.js';

export default class SplitArrow extends Arrow {
    constructor(scene, x, y) {
        super(scene, x, y);
        this.type = 'split';
    }

    split() {
        // Crear tres flechas nuevas con direcciones y velocidades específicas
        const angle1 = Phaser.Math.Angle.Between(0, 0, 1, 1);
        const angle2 = Phaser.Math.Angle.Between(0, 0, -1, 1);
        const angle3 = Phaser.Math.Angle.Between(0, 0, 0, 1);  // Flecha central

        const velocityX1 = Math.cos(angle1) * 300;
        const velocityY1 = Math.sin(angle1) * 300;

        const velocityX2 = Math.cos(angle2) * 300;
        const velocityY2 = Math.sin(angle2) * 300;

        const velocityX3 = Math.cos(angle3) * 300;
        const velocityY3 = Math.sin(angle3) * 300;

        // Crear nuevas flechas para la división
        const arrow1 = new Arrow(this.scene, this.arrow.x, this.arrow.y);
        arrow1.launch(velocityX1, velocityY1);

        const arrow2 = new Arrow(this.scene, this.arrow.x, this.arrow.y);
        arrow2.launch(velocityX2, velocityY2);

        const arrow3 = new Arrow(this.scene, this.arrow.x, this.arrow.y);
        arrow3.launch(velocityX3, velocityY3);

        // Destruir la flecha original
        this.arrow.destroy();
    }
}