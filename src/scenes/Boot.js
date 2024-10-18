export default class Boot extends Phaser.Scene {
    constructor() {
        super({ key: 'Boot'});
    }
    
    //Esta escena sirve para cargar todos los assets que tengamospara tenerlo organizado//
    preload () {
        //Cragar imagenes del juego
        this.load.image('bgProvisional', 'assets/images/bgProvisional.png');
    }
    
    create (){
    
    }
    }