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