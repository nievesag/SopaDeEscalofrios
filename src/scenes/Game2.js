import Cannon from '../objetos/Game2Obj/Cannon.js';
import Vessel from '../objetos/Game2Obj/Vessel.js';
import Maelstrom from '../objetos/Game2Obj/Maelstrom.js';
import Background from '../objetos/Game2Obj/Background.js';


// TO DO.
        // Vorágine.
        // Agua que rebota.
        // Hipopótamo.
        // Cocodrilo.
        //...


export default class Game2 extends Phaser.Scene {
    constructor() {
        super({ key: 'Game2'});
    }
    
    preload () { // Carga los recursos.
        // Cannon.
        this.load.image('cannonBody', './assets/images/Game2/cannonBody.jpg');
        this.load.image('cannonHead', './assets/images/Game2/cannonHead.png');

        // Carga el sprite animado del pollito con dimensiones de cada frame (LUEGO).
        //this.load.spritesheet('chick', 'assets/sprites/chick.png', { frameWidth: 16, frameHeight: 18 });

        this.load.image('vessel', './assets/images/Game2/vessel.png');
        this.load.image('river', './assets/images/Game2/rio.jpg');
        this.load.image('background', './assets/images/Game2/background.jpg');
        this.load.image('maelstrom', './assets/images/Game2/maelstrom.jpg')
        this.load.audio('theme2', './assets/audio/m2c.mp3');

        // Generador de obstáculos.
        //this.load.image('obstacleGenerator', './assets/images/Game2/obstaclesGenerator.jpg')
    }
    
    // https://phaser.io/examples/v3.85.0/physics/arcade/view/velocity-from-angle
    // https://phaser.io/examples/v3.85.0/camera/view/graphics-landscape
    // https://phaser.io/examples/v3.85.0/animation/view/60fps-animation-test

    create (){
        // Música.
        const music = this.sound.add('theme2');
        music.play();
        this.sound.pauseOnBlur = true;

        // Background y rio.
        this.bg = this.add.tileSprite(0, 0, 3200, 600, 'background').setOrigin(0, 0);
        this.rio = this.add.tileSprite(0, 600, 3200, 200, 'river').setOrigin(0,0);

        // Objetos.
        this.background = new Background(this);
        this.background.createLandscape();

        // Objetos principales.
        this.cannon = new Cannon(this);
        this.maelstrom = new Maelstrom(this);
        this.vessel = new Vessel(this, this.cannon, this.maelstrom);

        this.physics.add.collider(this.vessel, this.maelstrom, ()=>{
            this.vessel.destroy();
        });

        // Botón de regreso.
        this.buttonMainMenu = this.createButton('MAIN MENU',  900,  70, 'white', 30, 'GameSelectorMenu');
     
        /*// Generador de obstáculos.
        this.obstacleGen = this.make.image({
            scale : {
                x: 0.25,
                y: 0.25
            },
            key: 'obstacleGenerator'
        }).setDepth(2);
        */
    
        // Establece los límites del mundo y de la cámara.
        // x, y, width, height
        this.physics.world.setBounds(0, 0, 3200, 700);
        this.cameras.main.setBounds(0, 0, 3200, 600);

        
        
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

        /* --- CREAR AL GENERADOR DE OBSTÁCULOS LUEGO ---
        // Mantiene al obstacle generator a la derecha de la pantalla.
        this.obstacleGen.x = this.cameras.main.scrollX + 1000 // scrollX te da la posición de la cámara.
        this.obstacleGen.y = this.cameras.main.centerY + 250
        */

        this.buttonMainMenu.x = this.cameras.main.scrollX + 955; // scrollX te da la posición de la cámara.
        this.buttonMainMenu.y = this.cameras.main.scrollY + 25; // scrollY te da la posición de la cámara.
        
        // Colisiones de la Vessel.
        //this.vessel.collisionWithVessel(this.maelstrom); // LUEGO QUITAR ahora colisiona con la voragine.
    }

    // Botón de la UI.
    createButton(text, x, y, textColor, fontsize, sceneName) {
        let button = this.add.text(
           x,
           y,
            text,
            {
                fontFamily: 'arabic',
                fontSize: fontsize,
                color: textColor
            }
        ).setOrigin(0.5, 0.5);

        button.on('pointerover', () => // Al pasar el ratón por encima...
        {
            button.setTint(0xdfa919);
        });

        button.on('pointerout', () => // Al quitar el ratón de encima...
        {
            button.clearTint();
        });

        button.setInteractive();
        button.on("pointerdown", () => { // Al hacer clic...
            this.scene.start(sceneName);
            this.sound.stopAll();

        });

        return button;
    }
}