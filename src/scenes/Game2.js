import Cannon from '../objetos/Game2Obj/Cannon.js';
import Vessel from '../objetos/Game2Obj/Vessel.js';
import Maelstrom from '../objetos/Game2Obj/Maelstrom.js';
import Background from '../objetos/Game2Obj/Background.js';
import Crocodile from '../objetos/Game2Obj/Crocodile.js';
import Hippo from '../objetos/Game2Obj/Hippo.js';
import ObstaclesGenerator from '../objetos/Game2Obj/ObstacleGenerator.js';

export default class Game2 extends Phaser.Scene {
    constructor() {
        super({ key: 'Game2'});
    }
    
    preload () { 
        this.loadImages();
        this.loadAudios();
        this.load.css('EagleLake', 'style.css')
    }
    
    // https://phaser.io/examples/v3.85.0/physics/arcade/view/velocity-from-angle
    // https://phaser.io/examples/v3.85.0/camera/view/graphics-landscape
    // https://phaser.io/examples/v3.85.0/animation/view/60fps-animation-test
    // https://phaser.io/examples/v3.85.0/physics/arcade/view/velocity-from-angle-2
    
    create (){
        this.createTanqiaPopUp();
    }

    createTanqiaPopUp(){
        // Background del dialogo (LUEGO IMAGEN).
        let dialogueBackground = this.add.rectangle( 
            400, // x
            300, // y
            500, // anchura
            300, // altura
            0x000000 // color
        ).setAlpha(0.8);

        let tanqia = this.add.image(
            this.cameras.main.centerX, 
            this.cameras.main.centerY + 110, 
            'tanqia'
        ).setScale(0.5, 0.32); // x, y, tag.

        let tanqiaText = this.add.text(
            this.cameras.main.centerX, 
            this.cameras.main.centerY - 150, 
            'Nun, Las Aguas de la Vida, está encolerizado: una fuerte \ntempestad llena el paisaje. Una fuerte lluvia que se siente como pedradas, fortísimos relámpagos que son capaces de acobardar al más valeroso, vorágines que tragan todo a su paso, incluso las formas de vida de esta zona caudalosa parecieran haber enloquecido. Contacta con Anuket, diosa del agua enviándole una carta y órganos de gente sacrificada metidos en un vaso canopo para que ayude en la causa de apaciguar las aguas y traer de vuelta a la normalidad al río Nilo.',
            {
                fontSize: '20px',
                color: '#ffffff',
                align: 'center',
                fontFamily: 'EagleLake',
                wordWrap: {width: 530}, // la puta polla: es lo de \n pero pro.
                wordWrapUseAdvanced: true, // sirve para que no se coma palabras.
            }
        ).setOrigin(0.5); // danzhu lo tenia y funciona.

        // Botón de aceptar.
        let acceptButton = this.add.text(
            this.cameras.main.centerX, 
            this.cameras.main.centerY + 250, 
            'Jugar',
            {
            fontSize: '30px',
            color: 'white',
            align: 'center'
        }).setOrigin(0.5).setInteractive();

        acceptButton.on('pointerdown', ()=>{
            // Destruye todo y pone el juego a funcionarch.
            dialogueBackground.destroy();
            tanqia.destroy();
            tanqiaText.destroy();
            acceptButton.destroy();

            this.startGame();
        })
    }

    startGame(){
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

        this.cannon = new Cannon(this);
        
        // Grupo de obstacles con cada clase.
        this.obsClass = [
            {type: 'crocodile', class: Crocodile},
            {type: 'hippo', class: Hippo},
            {type: 'maelstrom', class: Maelstrom},
        ];

        this.obstacleGen = new ObstaclesGenerator(this, this.obsClass);

        this.vessel = new Vessel(this, this.cannon, this.obstacleGen);
        this.vessel.vesselCollisions();

        // Establece los límites del mundo y de la cámara.
        // x, y, width, height
        this.physics.world.setBounds(0, 0, 3200, 700);
        this.cameras.main.setBounds(0, 0, 3200, 600);

        // Botón de la música.
        this.musicButton = this.add.image(40, 40, 'musicButton').setScale(0.3).setInteractive();
        this.musicButton.on("pointerdown", () => { // PARAR Y REANUDAR MUSICA.
            this.isClickingOnUI = true; 
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
        this.buttonMainMenu.on('pointerdown', () => { this.isClickingOnUI = true; }); 
        
        // VASIJA.
        this.input.on('pointerup', () => // AL HACER CLIC.
        {
            if (!this.isClickingOnUI) { // si no se clica en la UI...
            this.vessel.launchVessel(this.cannon.angle); // lanza vasija.
            }
            this.isClickingOnUI = false; // restea flag.
        });
        
        this.input.on('pointermove', (pointer) => // SIGUE AL MOUSE.
        {
            this.cannon.cannonAngle(pointer);
        });
    }

    update(){

        // HAY QUE PONERLE A TODO IF POR LA CARA PQ SI NO FALLA
        // HAY Q INVESTIGAR COMO HACER ESO MAS LIMPIO :/

        // parallax scroller.
        if(this.bg)this.bg.tilePositionX += 2;
        if(this.rio)this.rio.tilePositionX -=6;

        if(this.vessel)this.vessel.update();
        if(this.obstacleGen)this.obstacleGen.update();

        let scrollX = this.cameras.main.scrollX; // posx camara
        let scrollY = this.cameras.main.scrollY; // posy camara

        if(this.buttonMainMenu)this.buttonMainMenu.setPosition(scrollX + 955, scrollY + 25);
        if(this.musicButton)this.musicButton.setPosition(scrollX + 45, scrollY + 40);
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
        ).setOrigin(0.5, 0.5).setInteractive();

        button.on('pointerover', () => // Al pasar el ratón por encima...
        {
            button.setTint(0xdfa919);
        });

        button.on('pointerout', () => // Al quitar el ratón de encima...
        {
            button.clearTint();
        });

        button.on("pointerdown", () => { // Al hacer clic...
            this.scene.start(sceneName);
            this.sound.stopAll();
        });

        return button;
    }

    loadImages(){
        // Carga el sprite animado del pollito con dimensiones de cada frame (LUEGO).
        //this.load.spritesheet('chick', 'assets/sprites/chick.png', { frameWidth: 16, frameHeight: 18 });

        this.load.image('cannonBody', './assets/images/Game2/cannonBody.png');
        this.load.image('cannonHead', './assets/images/Game2/cannonHead.png');
        this.load.image('vessel', './assets/images/Game2/vessel.png');
        this.load.image('river', './assets/images/Game2/rio.jpg');
        this.load.image('background', './assets/images/Game2/background.jpg');
        this.load.image('maelstrom', './assets/images/Game2/maelstrom.jpg');
        this.load.image('crocodile', './assets/images/Game2/crocodile.png');
        this.load.image('hippo', './assets/images/Game2/hippo.png');
        this.load.image('musicButton', './assets/images/Game2/music.png');
        this.load.image('muteButton', './assets/images/Game2/mute.png');
        this.load.image('obstacleGenerator', './assets/images/Game2/obstaclesGenerator.jpg');
        this.load.image('tanqia', './assets/images/Game2/tanqia.PNG');
    }

    loadAudios(){
        this.load.audio('theme2', './assets/audio/m2c.mp3');
    }
    
}