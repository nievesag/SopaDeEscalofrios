import Cannon from '../objetos/Game2Obj/Cannon.js';
import Vessel from '../objetos/Game2Obj/Vessel.js';
import Background from '../objetos/Game2Obj/Background.js';

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

        // River.
        this.load.image('river', '../assets/images/rio.jpg')

        // Música.
        this.load.audio('theme', '../assets/audio/m2.mp3');

        // Background.
        this.load.image('background', 'assets/images/background.jpg');
    }
    
    // https://phaser.io/examples/v3.85.0/physics/arcade/view/velocity-from-angle
    // https://phaser.io/examples/v3.85.0/camera/view/graphics-landscape
    // https://phaser.io/examples/v3.85.0/animation/view/60fps-animation-test

    create (){
        // Música.
        const music = this.sound.add('theme');
        music.play();
        this.sound.pauseOnBlur = true;

        // Background y rio.
        this.bg = this.add.tileSprite(0, 0, 3200, 600, 'background').setOrigin(0, 0);
        this.rio = this.add.tileSprite(0, 600, 3200, 200, 'river').setOrigin(0,0);

    
        // Establece los límites del mundo y de la cámara.
        // x, y, width, height
        this.physics.world.setBounds(0, 0, 3200, 700);
        this.cameras.main.setBounds(0, 0, 3200, 600);

        // Objetos.
        this.background = new Background(this);
        this.background.createLandscape();
        this.cannon = new Cannon(this);
        this.vessel = new Vessel(this, this.cannon);
        

        

        // SIGUE AL MOUSE.
        this.input.on('pointermove', (pointer) =>
            {
                this.cannon.cannonAngle(pointer);
            });

        // AL HACER CLIC.
        this.input.on('pointerup', () =>
            {
                this.vessel.launchVessel(this.cannon.angle);
            });


    }

    update(){
        // parallax scroller.
        this.bg.tilePositionX += 2;
        this.rio.tilePositionX -=6;
    }

    
}