export default class Cannon extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y) {
      super(scene, x, y, 'cannon');

<<<<<<< Updated upstream
      let posX, posY;
      let dir;
      let force;
      let h, w;
      let angle = 0;
=======
      this.posX, posY;
      this.dir;
      this.force;
      this.h, w;
      this.angle = 0;

      // Añadimos el cañón a la escena.
      this.scene.add.existing(this);
>>>>>>> Stashed changes
    }

    create(){
      const cannon = this.add.image(130, 464, 'cannon').setDepth(1);
<<<<<<< Updated upstream
=======
      this.scene.add.existing(this);
>>>>>>> Stashed changes
    }
  }