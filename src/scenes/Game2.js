import Cannon from '../objetos/Game2Obj/Cannon.js';

export default class Game2 extends Phaser.Scene {
    constructor() {
        super({ key: 'Game2'});
    }
    
    preload () { // Carga los recursos.
        // Cannon.
        this.load.image('cannonBody', '../assets/images/cannonBody.jpg');
        this.load.image('cannonHead', '../assets/images/cannonHead.png');

        // Carga el sprite animado del pollito con dimensiones de cada frame (LUEGO).
        //this.load.spritesheet('chick', 'assets/sprites/chick.png', { frameWidth: 16, frameHeight: 18 });

        // Vessel.
        this.load.image('vessel', '../assets/images/vessel.png')
    }
    
    // https://phaser.io/examples/v3.85.0/physics/arcade/view/velocity-from-angle
    // https://phaser.io/examples/v3.85.0/camera/view/graphics-landscape

    create (){
        // Establece los límites del mundo y de la cámara.
        this.physics.world.setBounds(0, 0, 3200, 600);
        this.cameras.main.setBounds(0, 0, 3200, 600);

        this.createLandscape();

        // --- CANNON ---.
        const cannonBody = this.make.image({ // Cannon Body.
            x: 150,
            y: 625, 
            key: 'cannonBody',
            scale : {
                x: 0.5,
                y: 0.5
            },
        }).setDepth(1);

        const cannonHead = this.make.image({ // Cannon Head.
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

        // --- VESSEL ---. EN UN FUTURO SERÁ SPRITESHEET
        const vessel = this.physics.add.image(cannonBody.x, cannonBody.y - 50, 'vessel').setScale(0.2); // Añade la vasija en la pos del cañón.
        vessel.disableBody(true, true); // Desactiva la vessel para que no colisione ni se vea todavía.
        
        // La cámara sigue al vessel.
        this.cameras.main.startFollow(vessel, false, 0.2, 0.2); 

        vessel.setCollideWorldBounds(true); // Para que no se salga de los límites del mundo.
        vessel.setDrag(100); // Fricción con el suelo.               

        // Dibuja la línea de la dir.
        const graphics = this.add.graphics({ lineStyle: { width: 10, color: 0x6714d8 , alpha: 0.5 } });
        const line = new Phaser.Geom.Line(); 

        let angle = 0; // Inicializa el ángulo a 0.

        // SIGUE AL MOUSE.
        this.input.on('pointermove', (pointer) =>
            {
                angle = Phaser.Math.Angle.BetweenPoints(cannonBody, pointer); // Ángulo cañón -> mouse.
                cannonHead.rotation = angle + 30; // Pone la rotación del cañón mirando al mouse (con unos ajustes).

                // Línea gráfica de la dir.
                Phaser.Geom.Line.SetToAngle(line, cannonHead.x, cannonHead.y, angle+0.15, 128); 
                graphics.clear().strokeLineShape(line); // Limpia y redibuja la línea.
            });

        // AL HACER CLIC.
        this.input.on('pointerup', () =>
            {
                vessel.enableBody(true, cannonHead.x, cannonHead.y, true, true); // Activa la vessel y la pone donde cannonHead.
                //chick.play('fly'); // animación de vuelo del pollo.
                this.physics.velocityFromRotation(angle, 600, vessel.body.velocity); // Lanza a la vasija con un ángulo y velocidad.
                
            });


    }

    createLandscape () // Dibujar un paisaje "procedural(?)"
    {
        //  Draw a random 'landscape'
        const landscape = this.add.graphics();

        landscape.fillStyle(0x008800, 1); // Color de relleno.
        landscape.lineStyle(2, 0x00ff00, 1); // Color de línea.

        landscape.beginPath();

        // Mínimo y máximo absolutos de cada pico.
        const maxY = 550;
        const minY = 400;

        let x = 0;
        let y = maxY;
        let range = 0;

        let up = true; // Para ver si sube o baja el pico. 

        // Dibuja el inicio del terreno.
        landscape.moveTo(0, 600);
        landscape.lineTo(0, 550);

        // Dibujar el paisaje.
        do
        {
            // Longitud de cada segmento.
            range = Phaser.Math.Between(20, 100);

            if (up) // Máximos.
            {
                y = Phaser.Math.Between(y, minY);
                up = false;
            }
            else // Mínimos.
            {
                y = Phaser.Math.Between(y, maxY);
                up = true;
            }


            // Traza el siguiente segmento.
            landscape.lineTo(x + range, y);

            x += range;

        } while (x < 3100); // Repite hasta que llegue al borde derecho.

        // Cierra el trazado a la derecha
        landscape.lineTo(3200, maxY);
        landscape.lineTo(3200, 600);
        landscape.closePath();

        // Traza y rellena.
        landscape.strokePath();
        landscape.fillPath();
    }
}