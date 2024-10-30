import Cannon from '../objetos/Game2Obj/Cannon.js';

export default class Game2 extends Phaser.Scene {
    constructor() {
        super({ key: 'Game2'});
    }
    
    preload () {
        // Cannon.
        this.load.image('cannonBody', '../assets/images/cannonBody.jpg');
        this.load.image('cannonHead', '../assets/images/cannonHead.png');

        // Bg.
        this.load.image('background', '../assets/images/rionilo.jpg');
    }
    
    // https://phaser.io/examples/v3.85.0/physics/arcade/view/velocity-from-angle
    create (){

        // BACKGROUND.
        this.make.sprite({
            x: 510,
            y: 375, 
            key: 'background',
            scale : {
                x: 0.9,
                y: 1.1
            },
        })

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

        let angle = 0;

        this.input.on('pointermove', (pointer) =>
            {
                angle = Phaser.Math.Angle.BetweenPoints(cannonBody, pointer);
                cannonHead.rotation = angle + 30;
            });


    }
    }