 export default class Cannon extends Phaser.GameObjects.Image{
    constructor(scene) {
      super(scene, 150, 625, 'cannonBody');
      this.scene = scene;

      // Añade CANNON BODY
      scene.add.existing(this);

      // Configuración.
      //this.setScale(0.5);
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
        300,     // x.
        650,     // y.
        40,      // anchura.
        200,     // altura.
        0x181818 // color.
      ).setDepth(1);

      this.powerBar = this.scene.add.rectangle(
        300,     // x.    
        750,     // y.
        25,      // anchura.
        -27,       // altura (inicialmench es -27 porque sube y baja y kiero margen).
        0xed8022 // color.
      ).setDepth(2).setAngle(180); // se rota 180 por la movida esta q sube y baja.

      this.power = 0; // potensya. (0 apagao 1 encendio).
      this.powerDir = 1; // 1 baja -1 sube (inicialmench sube).

      // Evento para animar la barra arriba y abajo.
      this.scene.time.addEvent({
        delay: 1, // para que vaya depriseja
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

      // 0 -> poca fuerza
      // 1 -> jijijuju
      // 2 -> ni mas ni menos
      // 3 -> va folledo
      // 4 -> joder lo folledo que va
      // 5 -> NITRO

      if (this.power >= 5) { // si supera el max.
        this.power = 5; 
        this.powerDir = -1; // cabia dir.
      } 
      else if (this.power <= 0) { // si llega a 0.
        this.power = 0;
        this.powerDir = 1; // cambia dir.
      }

      // Actualiza visualmente movidas visuales /6 para ajustar margenes y pollas de fraqcciones.
      this.powerBar.height = 200/6 * this.power;

      this.updatePowerBarColors();
    }

    updatePowerBarColors(){

      // Math.floor convierte los números de this power (1.9, 2.7) a enteros (1, 2) para que funcionen los ifs.
      let power = Math.trunc(this.power); // trunc trunca xde
      let color;

      if(power === 0){ // 0 -> poca fuerza.
        // Verde.
        color = 0x07522b;
      }
      else if(power === 1){ // 1 -> jijijuju.
        // Verde again
        color = 0x07522b;
      }
      else if(power === 2){ // 2 -> ni mas ni menos.
        // Amarillo.
        color = 0x735500;
      }
      else if(power === 3){ // 3 -> va folledo.
        // Naranja
        color = 0x732c00;
      }
      else if(power === 4){ // 4 -> joder lo folledo que va.
        // Rojo.
        color = 0x740101;
      }
      else if(power === 5){ // 5 -> NITRO.
        // Rojo
        color = 0x740101;
      }

      this.powerBar.fillColor = color;

    }
  }
