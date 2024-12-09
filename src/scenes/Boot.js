export default class Boot extends Phaser.Scene {
    constructor() {
        super({ key: 'Boot'});
    }
    
    //Esta escena sirve para cargar todos los assets que tengamos para tenerlo organizado//
    preload () {
        //Cargar imagenes del juego

        //Main Menu
        this.load.image('bgProvisional', './assets/images/bgProvisional.jpg');
        this.load.image("mainMenu", "./assets/images/mainMenu.jpg");
		this.load.image("startButton", "./assets/images/startButton.jpg");

        //Game 1



        //Game 2
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
        this.load.image('tanqiaBg', './assets/images/Game2/tanqiaBackground.jpg');
        this.load.image('rectUI', './assets/images/Game2/rectUI.png');
        this.load.audio('theme2', './assets/audio/m2c.mp3');
        this.load.css('EagleLake', 'style.css');



        //Game 3



        //Game 4
        this.load.image("bg1", "./assets/images/game4/bg1_game4.jpg");
        this.load.image("bow", "./assets/images/game4/bow.png");
        this.load.image("arrow1", "./assets/images/game4/arrow1.png");
        this.load.image("arrow2", "./assets/images/game4/arrow2.png");
        this.load.image("arrow3", "./assets/images/game4/arrow3.png");
        this.load.image("arrow4", "./assets/images/game4/arrow4.png");
        this.load.image("obstaculo1", "./assets/images/game4/obs1.png");
        this.load.image("obstaculo2", "./assets/images/game4/obs2.png");
        this.load.image("lion", "./assets/images/game4/lion.png");


        //Game 5
        
        this.load.image('MuroTablero', 'assets/images/Game5/MuroTablero.png');
        this.load.image('VacioTablero', 'assets/images/Game5/VacioTablero.png');
        this.load.image('FondoTablero', 'assets/images/Game5/FondoTablero.png');
        this.load.image('DisparadorTablero', 'assets/images/Game5/DisparadorTablero.png');
        this.load.image('EspejoTablero', 'assets/images/Game5/EspejoTablero.png');

        // La Vasija Entresija.
        this.load.image('cannon', 'assets/images/cannon.png')
    }
    
    create()
    {
        console.log("Boot");
        //this.loadAnimations();
        this.scene.start("MainMenu");


    }

    }