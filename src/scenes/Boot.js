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



        //Game 5
		this.load.audio("f3ale", "./assets/images/f3ale.mp3");
    }
    
    create()
    {
        console.log("Boot");
        //this.loadAnimations();
        this.scene.start("MainMenu");

    }

    }