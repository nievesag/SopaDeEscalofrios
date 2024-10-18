export default class Boot extends Phaser.Scene {
    constructor() {
        super({ key: 'Boot'});
    }
    
    //Esta escena sirve para cargar todos los assets que tengamospara tenerlo organizado//
    preload () {
        //Cragar imagenes del juego
        this.load.image('bgProvisional', 'assets/images/bgProvisional.jpg');
        this.load.image("mainMenu", "./assets/images/mainMenu.jpg");
		this.load.image("startButton", "./assets/images/startButton.jpg");
		this.load.audio("f3ale", "./assets/images/f3ale.mp3");
    }
    
    create()
    {
        console.log("Boot");
        //this.loadAnimations();
        this.scene.start("MainMenu");

    }

    }