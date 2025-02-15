export default class Boot extends Phaser.Scene {
    constructor() {
        super({ key: 'Boot'});
    }
    
    //Esta escena sirve para cargar todos los assets que tengamos para tenerlo organizado//
    preload () {
        // ----- CARGAR IMAGENES DEL JUEGO -----
    
        // -------- MAINMENU
        this.load.image('backgroundMenu', './assets/images/menuBackground.png');
        this.load.audio('f3ale', './assets/audio/f3ale.mp3');
        this.load.audio('ambience', './assets/audio/ambience.mp3');

        // -------- INTRO
        this.load.image('Intro1', './assets/images/intro/png/i1.png');
        this.load.image('Intro2', './assets/images/intro/png/i2.png');
        this.load.image('Intro3', './assets/images/intro/png/i3.png');
        this.load.image('Intro4', './assets/images/intro/png/i4.png');
        this.load.image('Intro5', './assets/images/intro/png/i5.png');
        this.load.image('Intro6', './assets/images/intro/png/i6.png');

        // -------- ESCENA PRINCIPAL
		this.load.image("EscenaPrincipal", "./assets/images/mainmenu.png");
        // -- iconos
		this.load.image("Icon1", "./assets/images/iconosJuegos/iconG1.png"); // g1
		this.load.image("Icon2", "./assets/images/iconosJuegos/iconG2.png"); // g2
		this.load.image("Icon3", "./assets/images/iconosJuegos/iconG3.png"); // g3
		this.load.image("Icon4", "./assets/images/iconosJuegos/iconG4.png"); // g4
		this.load.image("Icon5", "./assets/images/iconosJuegos/iconG5.png"); // g5

        // --------- TUTORIALES
        this.load.image("Tuto1", './assets/images/tutos/tutoG1.png');
        this.load.image("Tuto2", './assets/images/tutos/tutoG2.png');
        this.load.image("Tuto3", './assets/images/tutos/tutoG3.png');
        this.load.image("Tuto4", './assets/images/tutos/tutoG4.png');
        this.load.image("Tuto5", './assets/images/tutos/tutoG5.png');

        // -------- GAME 1
        // Cargamos la imagen que compone el Tileset (Imagen con los tiles usados por el tilemap)
        this.load.image('patronesTilemap', './assets/tilemap/tileset_duat.png');

        // Recursos de objetos del nivel
        this.load.image('player', './assets/images/g1/playerG1.png');
        this.load.image('box', './assets/images/g1/box.png');
        this.load.image('organ', './assets/images/g1/organ.png');
        this.load.image('goal', './assets/images/g1/goal.png');

        // -------- GAME 2
        // Carga el sprite animado del pollito con dimensiones de cada frame (LUEGO).
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
        this.load.image('obstacleGenerator', './assets/images/Game2/obstaclesGenerator.png');
        this.load.image('rectUI', './assets/images/Game2/rectUI.png');
        this.load.css('EagleLake', 'style.css');

        // -------- GAME 3
        //Background
        this.load.image('bg3', "./assets/images/Game3/bg.png")
        //Player
        this.load.image('player3', './assets/images/Game3/Cannon.png');
        //Escarabajos
        this.load.image('EmptyBeetle', './assets/images/Game3/BurbujaEmpty.png')
        this.load.image('RedBeetle', './assets/images/Game3/BurbujaRoja.png')
        this.load.image('OrangeBeetle', './assets/images/Game3/BurbujaNaranja.png')
        this.load.image('YellowBeetle', './assets/images/Game3/BurbujaAmarilla.png')
        this.load.image('GreenBeetle', './assets/images/Game3/BurbujaVerde.png')
        this.load.image('CianBeetle', './assets/images/Game3/BurbujaCian.png')
        this.load.image('BlueBeetle', './assets/images/Game3/BurbujaAzul.png')
        this.load.image('PurpleBeetle', './assets/images/Game3/BurbujaMorada.png')
        this.load.audio('beep', './assets/audio/beep.wav');

        // ------- GAME 4
        this.load.image("bg1", "./assets/images/game4/bg1_game4.png");
        this.load.image("bow", "./assets/images/game4/bow.png");
        this.load.image("arrow1", "./assets/images/game4/arrow1.png");
        this.load.image("arrow2", "./assets/images/game4/arrow2.png");
        this.load.image("arrow3", "./assets/images/game4/arrow3.png");
        this.load.image("arrow4", "./assets/images/game4/arrow4.png");
        this.load.image("obstaculo1", "./assets/images/game4/obs1.png");
        this.load.image("obstaculo2", "./assets/images/game4/obs2.png");
        this.load.image("lion", "./assets/images/game4/lion.png");
        this.load.image("rat", "./assets/images/game4/ratonComecables.png");
        this.load.image("explosion", "./assets/images/game4/explosion.png");
        this.load.image("bola", "./assets/images/game4/bola.png");

        // -------- GAME 5
        this.load.image('MuroTablero', 'assets/images/Game5/MuroTablero.png');
        this.load.image('VacioTablero', 'assets/images/Game5/VacioTablero.png');
        this.load.image('FondoTablero', 'assets/images/Game5/FondoTablero.png');
        this.load.image('DisparadorTablero', 'assets/images/Game5/DisparadorTablero.png');
        this.load.image('EspejoTablero', 'assets/images/Game5/EspejoTablero.png');
        this.load.image('DestinoApagado', 'assets/images/Game5/DestinoApagadoTablero.png');
        this.load.image('DestinoEncendido', 'assets/images/Game5/DestinoEncendidoTablero.png');
        this.load.image('BotonRotar', 'assets/images/Game5/BotonRotar.png');
        this.load.image('BotonEliminar', 'assets/images/Game5/BotonEliminar.png');
        this.load.image('PuertaEncendida', 'assets/images/Game5/PuertaEncendidaTablero.png');
        this.load.image('PuertaApagada', 'assets/images/Game5/PuertaApagadaTablero.png');
        
        // -------- FEEDBACK
        this.load.image('Enviada', 'assets/images/feedback/enviada.png');
        this.load.image('NoEnviada', 'assets/images/feedback/noenviada.png');
        this.load.image('Fade', 'assets/images/feedback/fade.png');

        // -------- ENDINGS
        this.load.image('Final1', 'assets/images/endings/png/g1.png');
        this.load.image('Final2', 'assets/images/endings/png/g2.png');
        this.load.image('Final3', 'assets/images/endings/png/g3.png');
        this.load.image('Final4', 'assets/images/endings/png/g4.png');
        this.load.image('Final5', 'assets/images/endings/png/g5.png');
        this.load.image('Final6', 'assets/images/endings/png/g6.png');
    }
    
    create()
    {
        console.log("Boot");
        this.scene.start("MainMenu");
    }
}