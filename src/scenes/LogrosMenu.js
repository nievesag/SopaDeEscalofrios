let logrosEnd = [];

export default class LogrosMenu extends Phaser.Scene {
	constructor() {
		super({ key: 'LogrosMenu'});
	}

    init(data) {
        this.gameState = data.gameState; // Guarda gameState en la escena
    }

    create() {
        // Música
        const music = this.sound.add('f3ale');
        music.play();
        this.sound.pauseOnBlur = true;

        console.log(this.gameState);
        this.savelogrosEnd();
        this.showLogros();
        this.createButton('VOLVER',  this.cameras.main.width -50,  this.cameras.main.scrollY + 25, 'white');
    }

    createButton(text, x, y, textColor) {
        let button = this.add.text(
           x,
           y,
            text,
            {
                fontFamily: 'yatra',
                fontSize: 20,

                color: textColor
            }
        ).setOrigin(0.5, 0.5);

        button.setInteractive();
        button.on("pointerdown", () => { // Al hacer clic...
            // Paramos el audio
            this.sound.stopAll();
            this.resetLogros();
            this.scene.start("MainMenu");
        });

        button.on('pointerover', () => // Al pasar el ratón por encima...
        {
            button.setTint(0xdfa919);
            //button.fontSize = '70px';
        });
    
        button.on('pointerout', () => // Al quitar el ratón de encima...
        {
            button.clearTint();
            //button.fontSize = '50px';
        });
    }

    savelogrosEnd() {
        // logros 1
        for(var i = 0; i < this.gameState.logros1.length; i++){
            logrosEnd.push(this.gameState.logros1[i]);
        }
        // logros 2
        for(var i = 0; i < this.gameState.logros2.length; i++){
            logrosEnd.push(this.gameState.logros2[i]);
        }
        // logros 3
        for(var i = 0; i < this.gameState.logros3.length; i++){
            logrosEnd.push(this.gameState.logros3[i]);
        }
        // logros 4
        for(var i = 0; i < this.gameState.logros4.length; i++){
            logrosEnd.push(this.gameState.logros4[i]);
        }
        // logros 5
        for(var i = 0; i < this.gameState.logros5.length; i++){
            logrosEnd.push(this.gameState.logros5[i]);
        }
    }

    showLogros() {
        // --- Alerta
        // si hay algun logro
        /*
        if(this.gameState.logros1.length != 0 || this.gameState.logros2.length != 0 || this.gameState.logros3.length != 0 || this.gameState.logros4.length != 0 || this.gameState.logros5.length != 0) 
        {
            alert('Has obtenido los siguientes logros: ' + logros1 +  ' ' + logros2 +  ' ' + logros3 +  ' ' + logros4 +  ' ' + logros5 );
        }
        */

        // --- Textos
        // si hay algun logro
        if(this.gameState.logros1.length != 0 || this.gameState.logros2.length != 0 || this.gameState.logros3.length != 0 || this.gameState.logros4.length != 0 || this.gameState.logros5.length != 0) 
        {
            // -- Logros, nombres
            this.ningunLogroText = this.add.text(
                this.cameras.main.centerX,
                this.cameras.main.centerY,
                logrosEnd,
                {
                    fontFamily: 'yatra',
                    fontSize: 40,
                    color: '#ffffff',
                    align: 'center',
                    wordWrap: {width: 750}, // la puta polla: es lo de \n pero pro.
                    wordWrapUseAdvanced: true, // sirve para que no se coma palabras.
                }
            ).setOrigin(0.5, 0.5).setDepth(1);         
        }
        // ningun logro
        else
        {
            this.ningunLogroText = this.add.text(
                this.cameras.main.centerX,
                this.cameras.main.centerY,
                'No has obtenido ningún logro',
                {
                    fontFamily: 'yatra',
                    fontSize: 40,
                    color: '#ffffff',
                    align: 'center',
                    wordWrap: {width: 750}, // la puta polla: es lo de \n pero pro.
                    wordWrapUseAdvanced: true, // sirve para que no se coma palabras.
                }
            ).setOrigin(0.5, 0.5).setDepth(1);    
        }
    }

    resetLogros() {
        this.gameState.logros1 = [];
        this.gameState.logros2 = [];
        this.gameState.logros3 = [];
        this.gameState.logros4 = [];
        this.gameState.logros5 = [];
    }
}