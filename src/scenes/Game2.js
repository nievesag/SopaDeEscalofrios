import Cannon from '../objetos/Game2Obj/Cannon.js';
import Vessel from '../objetos/Game2Obj/Vessel.js';
import Maelstrom from '../objetos/Game2Obj/Maelstrom.js';
import Background from '../objetos/Game2Obj/Background.js';
import Crocodile from '../objetos/Game2Obj/Crocodile.js';
import Hippo from '../objetos/Game2Obj/Hippo.js';
import ObstaclesGenerator from '../objetos/Game2Obj/ObstacleGenerator.js';



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
        this.loadImages();
        this.loadAudios();
    }
    
    // https://phaser.io/examples/v3.85.0/physics/arcade/view/velocity-from-angle
    // https://phaser.io/examples/v3.85.0/camera/view/graphics-landscape
    // https://phaser.io/examples/v3.85.0/animation/view/60fps-animation-test
    // https://phaser.io/examples/v3.85.0/physics/arcade/view/velocity-from-angle-2
    create (){

        this.isClickingOnUI = false; // Inicialmente no se clica sobre UI.

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
        //this.maelstrom = new Maelstrom(this);
        //this.crocodile = new Crocodile(this);
        //this.hippo = new Hippo(this);
        
        // Grupo de obstacles con cada clase.
        this.obsClass = [
            {type: 'crocodile', class: Crocodile},
            {type: 'hippo', class: Hippo},
            {type: 'maelstrom', class: Maelstrom},
        ];

        this.obstacleGen = new ObstaclesGenerator(this, this.obsClass);

        this.vessel = new Vessel(this, this.cannon, this.maelstrom, this.crocodile, this.hippo);

        this.vessel.vesselCollisions();

        // Establece los límites del mundo y de la cámara.
        // x, y, width, height
        this.physics.world.setBounds(0, 0, 3200, 700);
        this.cameras.main.setBounds(0, 0, 3200, 600);

        // Botón de la música.
        this.musicButton = this.add.image(40, 40, 'musicButton').setScale(0.3).setInteractive();

        // PARAR Y REANUDAR MUSICA.
        this.musicButton.on("pointerdown", () => {
            this.isClickingOnUI = true; // clic sobre UI.
            if (music.isPlaying) {
                music.pause();
                this.musicButton.setTexture('muteButton');
            } 
            else {
                music.resume();
                this.musicButton.setTexture('musicButton');
            }
        });

        // Botón de regreso.
        this.buttonMainMenu = this.createButton('MAIN MENU',  900,  70, 'white', 30, 'GameSelectorMenu');
        this.buttonMainMenu.on('pointerdown', () => { this.isClickingOnUI = true; }); // clic sobre UI.

        // ---- VASIJA ----.
        
        // AL HACER CLIC.
        this.input.on('pointerup', () =>
        {
            if (!this.isClickingOnUI) { // si no se clica en la UI...
            this.vessel.launchVessel(this.cannon.angle); // lanza vasija.
            }
            this.isClickingOnUI = false; // restea flag.
        });
        // SIGUE AL MOUSE.
        this.input.on('pointermove', (pointer) =>
        {
            this.cannon.cannonAngle(pointer);
        });
    }

    update(){
        // parallax scroller.
        this.bg.tilePositionX += 2;
        this.rio.tilePositionX -=6;

        
        this.obstacleGen.update(this.vessel.x);
        
        this.buttonMainMenu.x = this.cameras.main.scrollX + 955; // scrollX te da la posición de la cámara.
        this.buttonMainMenu.y = this.cameras.main.scrollY + 25; // scrollY te da la posición de la cámara.

        this.musicButton.x = this.cameras.main.scrollX + 45; // Ajusta según sea necesario
        this.musicButton.y = this.cameras.main.scrollY + 40;
        
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

    loadImages(){
        // Cannon.
        this.load.image('cannonBody', './assets/images/Game2/cannonBody.jpg');
        this.load.image('cannonHead', './assets/images/Game2/cannonHead.png');

        // Carga el sprite animado del pollito con dimensiones de cada frame (LUEGO).
        //this.load.spritesheet('chick', 'assets/sprites/chick.png', { frameWidth: 16, frameHeight: 18 });

        this.load.image('vessel', './assets/images/Game2/vessel.png');
        this.load.image('river', './assets/images/Game2/rio.jpg');
        this.load.image('background', './assets/images/Game2/background.jpg');
        this.load.image('maelstrom', './assets/images/Game2/maelstrom.jpg');
        this.load.image('crocodile', './assets/images/Game2/crocodile.jpg');
        this.load.image('hippo', './assets/images/Game2/hippo.jpg');

        // UI.
        this.load.image('musicButton', './assets/images/Game2/music.png');
        this.load.image('muteButton', './assets/images/Game2/mute.png');

        // Obstáculo (DEBUG).
        this.load.image('obstacle', './assets/images/Game2/obstacle.png')

        // Generador de obstáculos.
        this.load.image('obstacleGenerator', './assets/images/Game2/obstaclesGenerator.jpg');
    }

    loadAudios(){
        this.load.audio('theme2', './assets/audio/m2c.mp3');
    }
    
}