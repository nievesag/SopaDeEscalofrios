 export default class Cannon{
    constructor(scene) {
      this.scene = scene;

      // Imágenes.
      this.cannonBody = this.scene.make.image({ // Cannon Body.
        x: 150,
        y: 625, 
        key: 'cannonBody',
        scale : {
            x: 0.5,
            y: 0.5
        },
      }).setDepth(1);

      this.cannonHead = this.scene.make.image({ // Cannon Head.
        x: 300,
        y: 475, 
        angle: 0,
        key: 'cannonHead',
        flipY: true,
        scale : {
            x: 0.25,
            y: 0.30
        },
      }).setDepth(2);

      // Dibuja la línea de la dir.
      this.graphics = this.scene.add.graphics({ lineStyle: { width: 10, color: 0x6714d8 , alpha: 0.5 } });
      this.line = new Phaser.Geom.Line(); 
    }

    cannonAngle(pointer){
      this.angle = Phaser.Math.Angle.BetweenPoints(this.cannonBody, pointer); // Ángulo cañón -> mouse.
      this.cannonHead.rotation = this.angle + 30; // Pone la rotación del cañón mirando al mouse (con unos ajustes).
  
      // Línea gráfica de la dir.
      Phaser.Geom.Line.SetToAngle(this.line, this.cannonHead.x, this.cannonHead.y, this.angle+0.15, 128); 
      this.graphics.clear().strokeLineShape(this.line); // Limpia y redibuja la línea.
    }
  }
