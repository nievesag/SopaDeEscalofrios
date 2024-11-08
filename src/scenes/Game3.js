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
        this.load.image('cannonBase', '../assets/images/icon500.jpg');
        this.load.image('cannonHead', '../assets/images/Burbujas.png');
        //Munición 
        this.load.image('shootingBeetle', '../assets/images/BurbujaRoja.png')
        this.load.image('Bicho', '../assets/images/BurbujaNaranja.png')
        this.load.image('shootingBeetle', '../assets/images/BurbujaRoja.png')
        this.load.image('shootingBeetle', '../assets/images/BurbujaRoja.png')
        this.load.image('shootingBeetle', '../assets/images/BurbujaRoja.png')
        this.load.image('shootingBeetle', '../assets/images/BurbujaRoja.png')
        this.load.image('shootingBeetle', '../assets/images/BurbujaRoja.png')
    }
    
    // https://phaser.io/examples/v3.85.0/physics/arcade/view/velocity-from-angle

    create (){

        // --- BASE BG ---.
        //const baseBG = this.add.rectangle(502, 385, 600, 760, 0xd0be49).setStrokeStyle(10, 0xffffff);

        // --- BORDERS ---.
        const borderLeft = this.add.rectangle(100, 385, 200, 775, 0xffffff);
        const borderRight = this.add.rectangle(920, 385, 230, 775, 0xffffff);
        const borderUp = this.add.rectangle(550, 5, 1100, 10, 0xffffff);
        const borderDown = this.add.rectangle(550, 765, 1100, 10, 0xffffff);
        const borders = [borderLeft, borderRight, borderUp, borderDown];

        for (let i = 0; i < borders.length; i++){
            this.physics.world.enable(borders[i]);
            borders[i].body.setImmovable(true); // El suelo no se moverá
            borders[i].body.setAllowGravity(false); // No tendrá gravedad
            console.log(borders[i]);
        }


        // --- CANNON ---.
        const cannonBase = this.make.image({ // Cannon Base.
            x: 500,
            y: 800, 
            key: 'cannonBase',
            scale : {
                x: 0.25,
                y: 0.25
            },
        }).setDepth(1);

        const cannonHead = this.make.image({ // Cannon Head.
            x: 500,
            y: 730, 
            angle: 90,
            key: 'cannonHead',

            scale : {
                x: 0.3,
                y: 0.3,
            },
        }).setDepth(2);

        // --- SHOOTABLES ---. 
        const shootingBeetle = this.physics.add.image(cannonBase.x, cannonBase.y, 'shootingBeetle').setScale(1); // Añade la vasija en la pos del cañón.
        //shootingBeetle.disableBody(true, true); // Desactiva la vessel para que no colisione ni se vea todavía.
        // Para que no se salga de los límites del mundo.
        shootingBeetle.setBounce(1).setCollideWorldBounds(true);
        // Dibuja la línea de la dir DE LANZAMIENTO
        const graphics = this.add.graphics({ lineStyle: { width: 10, color: 0x6714d8 , alpha: 0.5 } });
        const line = new Phaser.Geom.Line(); 

        let angle = 0; // Inicializa el ángulo a 0.

        // --- INPUT ---.
        // SIGUE AL MOUSE.
        this.input.on('pointermove', (pointer) =>
            {
                angle = Phaser.Math.Angle.BetweenPoints(cannonBase, pointer); // Ángulo cañón -> mouse.
                cannonHead.rotation = angle; // Pone la rotación del cañón mirando al mouse (con unos ajustes).


                // Línea gráfica de la dir.
                Phaser.Geom.Line.SetToAngle(line, cannonHead.x, cannonHead.y, angle, 128); 
                graphics.clear().strokeLineShape(line); // Limpia y redibuja la línea.
            });

        // AL HACER CLIC. DISPARO
        this.input.on('pointerup', () =>
            {
                shootingBeetle.enableBody(true, cannonHead.x, cannonHead.y, true, true); // Activa la vessel y la pone donde cannonHead.

                this.physics.velocityFromRotation(angle, 1000, shootingBeetle.body.velocity); // Lanza el escarabajo con un ángulo y velocidad.

                
            });


        // --- COLISIONES CON BORDERS ---.
        this.physics.add.collider(borders, shootingBeetle);
        
        // --- GRID DE BICHOS ---.
        const groupImpares = this.add.group({
            key: 'Bicho',
            frame: [ 0 ],
            frameQuantity: 120,
        });

        Phaser.Actions.GridAlign(groupImpares.getChildren(), {
            width: 12,
            height: 5,
            cellWidth: 50,
            cellHeight: 100,
            x: 205,
            y: 20,
        });

        const groupPares = this.add.group({
            key: 'shootingBeetle',
            frame: [ 0 ],
            frameQuantity: 110,
        });

        Phaser.Actions.GridAlign(groupPares.getChildren(), {
            width: 11,
            height: 5,
            cellWidth: 50,
            cellHeight: 100,
            x: 230,
            y: 70,
        });


    }
}
            