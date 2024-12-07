import Arrow from '../Game4Obj/Arrow.js';

export default class SplitArrow extends Arrow {
    constructor(scene, x, y) {
        super(scene, x, y, 'arrow2');
        this.type = 'split';
        this.arrow = this; 
    }

    split() {
        const angle1 = Phaser.Math.Angle.Between(0, 0, 1, 1);
        const angle2 = Phaser.Math.Angle.Between(0, 0, -1, 1);
        const angle3 = Phaser.Math.Angle.Between(0, 0, 0, 1);  

        const velocityX1 = Math.cos(angle1) * 300;
        const velocityY1 = Math.sin(angle1) * 300;

        const velocityX2 = Math.cos(angle2) * 300;
        const velocityY2 = Math.sin(angle2) * 300;

        const velocityX3 = Math.cos(angle3) * 300;
        const velocityY3 = Math.sin(angle3) * 300;

        // Crear nuevas flechas para la division
        const arrows = [
            new Arrow(this.scene, this.arrow.x, this.arrow.y),
            new Arrow(this.scene, this.arrow.x, this.arrow.y),
            new Arrow(this.scene, this.arrow.x, this.arrow.y),
        ];
    
        arrows[0].launch(velocityX1, velocityY1);
        arrows[1].launch(velocityX2, velocityY2);
        arrows[2].launch(velocityX3, velocityY3);

        arrows.forEach((arrow) => {
            this.scene.physics.add.collider(arrow, this.scene.ground, () => {
                arrow.body.setVelocityX(0); 
                arrow.body.setVelocityY(0);
                arrow.body.setBounce(0);  
            });
    
        });
    
        // Destruir flechas después de 4 segundos
        this.scene.time.delayedCall(4000, () => {
            arrows.forEach((arrow) => arrow.destroy());
        });
    
        this.arrow.destroy(); // Destruir flecha original

     
    }
}