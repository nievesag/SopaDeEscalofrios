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



        //Game 3
        //Background
        this.load.image('bg3', "./assets/images/Game3/bg.jpg")
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

        //Game 4
        this.load.image("bg1", "./assets/images/bg1_game4.jpg");
        this.load.image("bow", "./assets/images/bow.png");
        this.load.image("arrow1", "./assets/images/arrow1.png");
        this.load.image("arrow2", "./assets/images/arrow2.png");
        this.load.image("arrow3", "./assets/images/arrow3.png");
        this.load.image("arrow4", "./assets/images/arrow4.png");


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