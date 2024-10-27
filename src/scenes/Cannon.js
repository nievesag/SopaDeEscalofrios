export default class Cannon extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y) {
      super(scene, x, y, 'cannon');

      this.posX, posY;
      this.dir;
      this.force;
      this.h, w;
      this.angle = 0;

      // Añadimos el cañón a la escena.
      this.scene.add.existing(this);
    }

    create(){
      const cannon = this.add.image(130, 464, 'cannon').setDepth(1);
      this.scene.add.existing(this);
    }
  }