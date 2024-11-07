//Importamos los objetos en escena
import Player3 from '../objetos/Game3Obj/Player3.js';
import Beetle from '../objetos/Game3Obj/Beetle.js';
import Matrix from '../objetos/Game3Obj/Matrix.js';
import Time from '../objetos/Game3Obj/Time.js';

export default class Game3 extends Phaser.Scene {
    constructor() {
        super({ key: 'Game3'});

        //Colores de los bichos
        const COLOR = {
            RED: 'RED',
            ORANGE: 'ORANGE',
            YELLOW: 'YELLOW',
            GREEN: 'GREEN',
            CIAN: 'CIAN',
            BLUE: 'BLUE',
            PURPLE: 'PURPLE',
            BLACK: 'BLACK',
        } //Se accede como color.RED...
    }
    
    preload () {
        //Player (place holder)
        this.load.image('cuadrado', '../assets/images/icon500.jpg');
        this.load.image('cannonHead', '../assets/images/Burbujas.png');

        // A lanzar
        this.load.image('shootingBeetle', '../assets/images/BurbujaRoja.png')
    }
    
    // https://phaser.io/examples/v3.85.0/physics/arcade/view/velocity-from-angle

    create (){

        // --- CANNON ---.
        const cannon = this.make.image({ // Cannon Body.
            x: 500,
            y: 750, 
            key: 'cuadrado',
            scale : {
                x: 0.25,
                y: 0.25
            },
        }).setDepth(1);

        const cannonHead = this.make.image({ // Cannon Head.
            x: 500,
            y: 650, 
            angle: 90,
            key: 'cannonHead',
            //flipY: true,
            scale : {
                x: 0.3,
                y: 0.3,
            },
        }).setDepth(2);

        // --- VESSEL ---. EN UN FUTURO SERÁ SPRITESHEET
        const shootingBeetle = this.physics.add.image(cannon.x, cannon.y - 50, 'shootingBeetle').setScale(1); // Añade la vasija en la pos del cañón.
        shootingBeetle.disableBody(true, true); // Desactiva la vessel para que no colisione ni se vea todavía.
        
        shootingBeetle.setCollideWorldBounds(true); // Para que no se salga de los límites del mundo.
        //vessel.setDrag(100); // Fricción con el suelo.               

        // Dibuja la línea de la dir.
        const graphics = this.add.graphics({ lineStyle: { width: 10, color: 0x6714d8 , alpha: 0.5 } });
        const line = new Phaser.Geom.Line(); 

        let angle = 0; // Inicializa el ángulo a 0.

        // SIGUE AL MOUSE.
        this.input.on('pointermove', (pointer) =>
            {
                angle = Phaser.Math.Angle.BetweenPoints(cannon, pointer); // Ángulo cañón -> mouse.
                cannonHead.rotation = angle + 30; // Pone la rotación del cañón mirando al mouse (con unos ajustes).

                // Línea gráfica de la dir.
                Phaser.Geom.Line.SetToAngle(line, cannonHead.x, cannonHead.y, angle+0.15, 128); 
                graphics.clear().strokeLineShape(line); // Limpia y redibuja la línea.
            });

        // AL HACER CLIC.
        this.input.on('pointerup', () =>
            {
                shootingBeetle.enableBody(true, cannonHead.x, cannonHead.y, true, true); // Activa la vessel y la pone donde cannonHead.
                //chick.play('fly'); // animación de vuelo del pollo.
                this.physics.velocityFromRotation(angle, 600, shootingBeetle.body.velocity); // Lanza a la vasija con un ángulo y velocidad.
                
            });


    }
}