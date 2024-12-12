export default class Boot extends Phaser.Scene {
    constructor() {
        super({ key: 'Boot'});
    }
    
    //Esta escena sirve para cargar todos los assets que tengamos para tenerlo organizado//
    preload () {
        // ----- CARGAR IMAGENES DEL JUEGO -----
        

        // -------- MAINMENU
        this.load.image('bgProvisional', './assets/images/bgProvisional.jpg');
        this.load.image("mainMenu", "./assets/images/mainMenu.jpg");
		this.load.image("startButton", "./assets/images/startButton.jpg");
        this.load.image('backgroundMenu', './assets/images/menuBackground.png');
        this.load.audio('f3ale', './assets/audio/f3ale.mp3');

        // -------- INTRO
        this.load.image('Intro1', './assets/images/intro/png/i1.png');
        this.load.image('Intro2', './assets/images/intro/png/i2.png');
        this.load.image('Intro3', './assets/images/intro/png/i3.png');
        this.load.image('Intro4', './assets/images/intro/png/i4.png');
        this.load.image('Intro5', './assets/images/intro/png/i5.png');
        this.load.image('Intro6', './assets/images/intro/png/i6.png');

        // -------- GAME 1
        // Cargamos la imagen que compone el Tileset (Imagen con los tiles usados por el tilemap)
        this.load.image('patronesTilemap', './assets/tilemap/tileset_duat.png');

        // Recursos de objetos del nivel
        this.load.image('player', './assets/images/g1/playerG1.png');
        this.load.image('box', './assets/images/g1/box.png');
        this.load.image('organ', './assets/images/g1/organ.png');
        this.load.image('goal', '../../assets/images/g1/goal.png');

        // -------- GAME 2
        // Carga el sprite animado del pollito con dimensiones de cada frame (LUEGO).
        // this.load.spritesheet('chick', 'assets/sprites/chick.png', { frameWidth: 16, frameHeight: 18 });
        this.load.image('cannon', 'assets/images/cannon.png')
        this.load.image('cannonBody', './assets/images/Game2/cannonBody.png');
        this.load.image('cannonHead', './assets/images/Game2/cannonHead.png');
        this.load.image('vessel', './assets/images/Game2/vessel.png');
        this.load.image('river', './assets/images/Game2/rio.jpg');
        this.load.image('background', './assets/images/Game2/background.jpg');
        this.load.image('maelstrom', './assets/images/Game2/maelstrom.png');
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

        // -------- GAME 3
        //Background
        this.load.image('bg3', "./assets/images/Game3/bg.png")
        //Player (place holder)
        //this.load.image('cannonBase', './assets/images/icon500.jpg');
        this.load.image('cannon', './assets/images/Game3/Cannon.png');
        //Escarabajos
        this.load.image('RedBeetle', './assets/images/Game3/BurbujaRoja.png')
        this.load.image('OrangeBeetle', './assets/images/Game3/BurbujaNaranja.png')
        this.load.image('YellowBeetle', './assets/images/Game3/BurbujaAmarilla.png')
        this.load.image('GreenBeetle', './assets/images/Game3/BurbujaVerde.png')
        this.load.image('CianBeetle', './assets/images/Game3/BurbujaCian.png')
        this.load.image('BlueBeetle', './assets/images/Game3/BurbujaAzul.png')
        this.load.image('PurpleBeetle', './assets/images/Game3/BurbujaMorada.png')
        this.load.spritesheet('beetles', './assets/images/Game3/Burbujas.png', { frameWidth: 55, frameHeight: 53 });

        // ------- GAME 4
        this.load.image("bg1", "./assets/images/game4/bg1_game4.jpg");
        this.load.image("bow", "./assets/images/game4/bow.png");
        this.load.image("arrow1", "./assets/images/game4/arrow1.png");
        this.load.image("arrow2", "./assets/images/game4/arrow2.png");
        this.load.image("arrow3", "./assets/images/game4/arrow3.png");
        this.load.image("arrow4", "./assets/images/game4/arrow4.png");
        this.load.image("obstaculo1", "./assets/images/game4/obs1.png");
        this.load.image("obstaculo2", "./assets/images/game4/obs2.png");
        this.load.image("lion", "./assets/images/game4/lion.png");
        this.load.image("rat", "./assets/images/game4/ratonComecables.png");


        // -------- GAME 5
        this.load.image('MuroTablero', 'assets/images/Game5/MuroTablero.png');
        this.load.image('VacioTablero', 'assets/images/Game5/VacioTablero.png');
        this.load.image('FondoTablero', 'assets/images/Game5/FondoTablero.png');
        this.load.image('DisparadorTablero', 'assets/images/Game5/DisparadorTablero.png');
        this.load.image('EspejoTablero', 'assets/images/Game5/EspejoTablero.png');

        // -------- ENDINGS
        // ph
        this.load.image('Final1PH', 'assets/images/endings/ph/g1.png');
        this.load.image('Final2PH', 'assets/images/endings/ph/g2.png');
        this.load.image('Final3PH', 'assets/images/endings/ph/g3.png');
        this.load.image('Final4PH', 'assets/images/endings/ph/g4.png');
        this.load.image('Final5PH', 'assets/images/endings/ph/g5.png');
        this.load.image('GenericoPH', 'assets/images/endings/ph/nog.png');
        // reales
        this.load.image('Final1', 'assets/images/endings/png/g1.png');
        this.load.image('Final2', 'assets/images/endings/png/g2.png');
        this.load.image('Final3', 'assets/images/endings/png/g3.png');
        this.load.image('Final4', 'assets/images/endings/png/g4.png');
        this.load.image('Final5', 'assets/images/endings/png/g5.png');
        this.load.image('Generico', 'assets/images/endings/png/g6.png');
    }
    
    create()
    {
        console.log("Boot");
        //this.loadAnimations();
        this.scene.start("MainMenu");
    }
}