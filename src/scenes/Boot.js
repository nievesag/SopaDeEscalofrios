export default class Boot extends Phaser.Scene {
    constructor() {
        super({ key: 'Boot'});
    }
    
    //Esta escena sirve para cargar todos los assets que tengamos para tenerlo organizado//
    preload () {
        //Cargar imagenes del juego

        //Main Menu
        this.load.image('bgProvisional', 'assets/images/bgProvisional.jpg');
        this.load.image("mainMenu", "./assets/images/mainMenu.jpg");
		this.load.image("startButton", "./assets/images/startButton.jpg");

        //Game 1



        //Game 2



        //Game 3



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