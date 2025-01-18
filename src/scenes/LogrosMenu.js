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
        let logroLengthArray = [
            this.gameState.logros1, 
            this.gameState.logros2, 
            this.gameState.logros3, 
            this.gameState.logros4, 
            this.gameState.logros5
        ];

        for(var i = 0; i < logroLengthArray.length; i++){
            for(var j = 0; j < logroLengthArray[i].length; j++)
            logrosEnd.push(logroLengthArray[i][j])
        }
    }

    showLogros() {

        // --- Textos
        let textoLogros;

        let i = 0;
        let logroLengthArray = [
            this.gameState.logros1.length, 
            this.gameState.logros2.length, 
            this.gameState.logros3.length, 
            this.gameState.logros4.length, 
            this.gameState.logros5.length
        ];

        let hasAnyAward = false;
        while(i<logroLengthArray.length && !hasAnyAward){
            hasAnyAward = logroLengthArray[i] != 0;
            i++;
        }
        // si hay algun logro
        if(hasAnyAward) 
        {
            textoLogros = logrosEnd;     
        }
        // ningun logro
        else
        {
            textoLogros = 'No has obtenido ningún logro';   
        }

        this.ningunLogroText = this.add.text(
            this.cameras.main.centerX,
            this.cameras.main.centerY,
            textoLogros,
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

    resetLogros() {
        let logroLengthArray = [
            this.gameState.logros1, 
            this.gameState.logros2, 
            this.gameState.logros3, 
            this.gameState.logros4, 
            this.gameState.logros5
        ];

        for(var i = 0; i < logroLengthArray.length; i++) logroLengthArray[i] = [];
        logrosEnd = [];


        this.gameState.endResults = {
            Game1: [null, null, null, null, null] ,
            Game2: [null, null, null, null, null] ,
            Game3: [null, null, null, null, null] ,
            Game4: [null, null, null, null, null] ,
            Game5: [null, null, null, null, null] 
        };
        console.log(this.gameState);
    }
}