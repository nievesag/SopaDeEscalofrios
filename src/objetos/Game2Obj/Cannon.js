 export default class Cannon extends Phaser.GameObjects.Image{
    constructor(scene) {
      super(scene, 150, 625, 'cannonBody');
      this.scene = scene;

      // Añade CANNON BODY
      scene.add.existing(this);

      // Configuración.
      this.setScale(0.5);
      this.setDepth(1);

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

      // POWERBAR.
      
      this.powerBarRectangle = this.scene.add.rectangle(
        600,     // x.
        550,     // y.
        40,      // anchura.
        200,     // altura.
        0x444444 // color.
      ).setDepth(1);

      this.powerBar = this.scene.add.rectangle(
        600,     // x.    
        450,     // y.
        40,      // anchura.
        0,       // altura (inicialmench es 0 porque sube y baja).
        0xff0000 // color.
      ).setDepth(2);

      this.power = 0; // potensya. (0 apagao 1 encendio).
      this.powerDir = -1; // 1 baja -1 sube (inicialmench sube).

      // Dibuja la línea de la dir.
      this.graphics = this.scene.add.graphics({ 
        lineStyle: { width: 10, color: 0x6714d8 , alpha: 0.5 } 
      });
      this.line = new Phaser.Geom.Line(); 

      // Evento para animar la barra arriba y abajo.
      this.scene.time.addEvent({
        delay: 16, // 60fps maomeno.
        loop: true,
        callback: () => 
        {
          this.updatePowerBar();
        }
      });
    }

    cannonAngle(pointer){
      this.angle = Phaser.Math.Angle.BetweenPoints(this, pointer); // Ángulo cañón -> mouse.
      this.cannonHead.rotation = this.angle + 30; // Pone la rotación del cañón mirando al mouse (con unos ajustes).
  
      // Línea gráfica de la dir.
      Phaser.Geom.Line.SetToAngle(this.line, this.cannonHead.x, this.cannonHead.y, this.angle+0.15, 128); 
      this.graphics.clear().strokeLineShape(this.line); // Limpia y redibuja la línea.
    }

    updatePowerBar(){
      this.power += 0.01 *this.powerDir; // Power = Power - (vel * dir); hay q hacelo asi porq 1 sbaja -1 sube

      if (this.power >= 1) { // si supera 1.
        this.power = 1; 
        this.powerDir = -1; // cabia dir.
      } 
      else if (this.power <= 0) { // si llega a 0.
        this.power = 0;
        this.powerDir = 1; // cambia dir.
      }

      // Actualiza visualmente
      this.powerBar.height = 200 * this.power;
    }
  }
