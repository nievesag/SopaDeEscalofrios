let ending = 0;
export default class EndMenu extends Phaser.Scene {
	constructor() {
		super({ key: 'EndMenu'});
	}

    init(data) {
        this.gameState = data.gameState; // Guarda gameState en la escena
    }

	create() {
        this.cameras.main.setBackgroundColor(0x181818);

        /*// Paramos el audio
        this.sound.stopAll();
        
        // Música.
        const music = this.sound.add('f3ale');
        music.play();
        this.sound.pauseOnBlur = true;*/

        // Texto del Título con borde de color aleatorio
        let title = this.add.text(
            this.cameras.main.centerX,
            this.cameras.main.centerY +310,
            'FIN DEL PERIODO DE CONTACTO CON LOS DIOSES',
            {
                fontFamily: 'yatra',
                fontSize: 30,

                color: '#dfa919'
                //stroke: '#453424',   
                //strokeThickness: 10
            }
        ).setOrigin(0.5, 0.5);

        // Alineacion y profundidad del texto.
        title.setAlign('center').setDepth(1);

        // Gestion de finales
        this.checkEnding();
        this.showEnding(ending);
        this.manageLogros();

        // Botones
        this.createButton('VER LOGROS',  this.cameras.main.width -65,  this.cameras.main.scrollY + 25, 'white');
    }

	createButton(text, x, y, textColor) {
        let button = this.add.text(
           x,
           y,
            text,
            {
                fontFamily: 'yatra',
                fontSize: 17,

                color: textColor
            }
        ).setOrigin(0.5, 0.5);

        button.setInteractive();
        button.on("pointerdown", () => { // Al hacer clic...
            this.scene.start("LogrosMenu", { gameState: this.gameState });
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

    checkEnding()
    {
        // crea array auxiliares filtrando las victorias
        let result1 = this.gameState.endResults.Game1.filter(i => i == 'victoria');
        let result2 = this.gameState.endResults.Game2.filter(i => i == 'victoria');
        let result3 = this.gameState.endResults.Game3.filter(i => i == 'victoria');
        let result4 = this.gameState.endResults.Game4.filter(i => i == 'victoria');
        let result5 = this.gameState.endResults.Game5.filter(i => i == 'victoria');

        // el largo de esos auxiliares sera el num de victorias por juego
        let num1 = result1.length;
        let num2 = result2.length;
        let num3 = result3.length;
        let num4 = result4.length;
        let num5 = result5.length;

        let max = Math.max(num1, num2, num3, num4, num5);

        if(max != 0) {
            if(max == num1) { ending = 1; }
            else if(max == num2) { ending = 2; }
            else if(max == num3) { ending = 3; }
            else if(max == num4) { ending = 4; }
            else if(max == num5) { ending = 5; }
            else { ending = 6; } // final generico
        }
        else { ending = 6; } // final generico

        console.log(ending);
    }

    showEnding(e) {
        let bg;
        let endText
        if(e == 1) {
            bg = this.make.image({
                key: 'Final1',
            }).setPosition(this.cameras.main.centerX, this.cameras.main.centerY).setOrigin(0.5).setScale(0.7, 0.7); 
        
            endText = this.add.text(
                this.cameras.main.centerX,
                this.cameras.main.centerY - 310,
                'Centenares de entrañas han sido traídas al cielo inferior y cargadas en la embarcación Henu. Pronto seré transportada a través de la Duat, convirtiéndome así en la diosa de la putrefacción de la carne.',
                {
                    fontFamily: 'yatra',
                    fontSize: 20,
                    color: '#ffffff',
                    align: 'center',
                    wordWrap: {width: 750}, // la puta polla: es lo de \n pero pro.
                    wordWrapUseAdvanced: true, // sirve para que no se coma palabras.
                }
            ).setOrigin(0.5, 0.5).setDepth(1);
        }
        else if(e == 2) {
            bg = this.make.image({
                key: 'Final2',
            }).setPosition(this.cameras.main.centerX, this.cameras.main.centerY).setOrigin(0.5).setScale(0.7, 0.7);
        
            endText = this.add.text(
                this.cameras.main.centerX,
                this.cameras.main.centerY - 310,
                'Multitud de vasos canopos han sido arrojados a las profundidades del río Nilo y ninguno de ellos pese a su fragilidad ha sido fragmentado. Dentro de no mucho seré la próxima diosa de la primera catarata.',
                {
                    fontFamily: 'yatra',
                    fontSize: 20,
                    color: '#ffffff',
                    align: 'center',
                    wordWrap: {width: 750}, // la puta polla: es lo de \n pero pro.
                    wordWrapUseAdvanced: true, // sirve para que no se coma palabras.
                }
            ).setOrigin(0.5, 0.5).setDepth(1);
        }
        else if(e == 3) {
            bg = this.make.image({
                key: 'Final3',
            }).setPosition(this.cameras.main.centerX, this.cameras.main.centerY).setOrigin(0.5).setScale(0.7, 0.7);
        
            endText = this.add.text(
                this.cameras.main.centerX,
                this.cameras.main.centerY - 310,
                'Un sinnúmero de escarabajos han sido liberados de ese oscilante y viscoso fluido ámbar. Pronto podré ser una nueva mujer: la diosa del crepúsculo que teñirá el firmamento entero de sangre.',
                {
                    fontFamily: 'yatra',
                    fontSize: 20,
                    color: '#ffffff',
                    align: 'center',
                    wordWrap: {width: 750}, // la puta polla: es lo de \n pero pro.
                    wordWrapUseAdvanced: true, // sirve para que no se coma palabras.
                }
            ).setOrigin(0.5, 0.5).setDepth(1);
        }
        else if(e == 4) {
            bg = this.make.image({
                key: 'Final4',
            }).setPosition(this.cameras.main.centerX, this.cameras.main.centerY).setOrigin(0.5).setScale(0.7, 0.7);
            
            endText = this.add.text(
                this.cameras.main.centerX,
                this.cameras.main.centerY - 310,
                'Una manada de leones ha sido sacrificada. Se les conoce por ser los animales más poderosos de la vida y la muerte, símbolo de valía. Estoy preparada para ser la próxima diosa de la violencia.',
                {
                    fontFamily: 'yatra',
                    fontSize: 20,
                    color: '#ffffff',
                    align: 'center',
                    wordWrap: {width: 750}, // la puta polla: es lo de \n pero pro.
                    wordWrapUseAdvanced: true, // sirve para que no se coma palabras.
                }
            ).setOrigin(0.5, 0.5).setDepth(1);
        }
        else if(e == 5) {
            bg = this.make.image({
                key: 'Final5',
            }).setPosition(this.cameras.main.centerX, this.cameras.main.centerY).setOrigin(0.5).setScale(0.7, 0.7);

            endText = this.add.text(
                this.cameras.main.centerX,
                this.cameras.main.centerY - 310,
                'Los rayos luminosos han sido reflejados sobre las cristalinas paredes estratégicamente posicionadas. Mi bello resplandor causará dolor a los ojos de cualquier mortal, porque seré la futura diosa del centelleo.',
                {
                    fontFamily: 'yatra',
                    fontSize: 20,
                    color: '#ffffff',
                    align: 'center',
                    wordWrap: {width: 750}, // la puta polla: es lo de \n pero pro.
                    wordWrapUseAdvanced: true, // sirve para que no se coma palabras.
                }
            ).setOrigin(0.5, 0.5).setDepth(1);
        }
        else if(e == 6) {
            bg = this.make.image({ 
                key: 'Generico',
            }).setPosition(this.cameras.main.centerX, this.cameras.main.centerY).setOrigin(0.5).setScale(0.7, 0.7);
            endText = this.add.text(
                this.cameras.main.centerX,
                this.cameras.main.centerY - 310,
                'Ningún dios me ha otorgado su favor... en su lugar he sido castigada siendo encadenada por el resto de la eternidad. Imperios nacerán, civilizaciónes caerán, pero yo permaneceré aquí hasta el fin de los tiempos. Humillada, condenada, despreciada, sola.',
                {
                    fontFamily: 'yatra',
                    fontSize: 20,
                    color: '#ffffff',
                    align: 'center',
                    wordWrap: {width: 750}, // la puta polla: es lo de \n pero pro.
                    wordWrapUseAdvanced: true, // sirve para que no se coma palabras.
                }
            ).setOrigin(0.5, 0.5).setDepth(1);
        }
    }

    manageLogros() {
        for(var i = 0; i < this.gameState.endResults.Game1.length; i++) {
            // --- logros g1
            if(this.gameState.endResults.Game1[i] != null && this.gameState.endResults.Game1[i] != 'derrota') {
                this.gameState.logros1.push(this.gameState.logros.Game1[i]);
            }
            // --- logros g2
            if(this.gameState.endResults.Game2[i] != null && this.gameState.endResults.Game2[i] != 'derrota') {
                this.gameState.logros2.push(this.gameState.logros.Game2[i]);
            }
            // --- logros g3
            if(this.gameState.endResults.Game3[i] != null && this.gameState.endResults.Game3[i] != 'derrota') {
                this.gameState.logros3.push(this.gameState.logros.Game3[i]);
            }
            // --- logros g4
            if(this.gameState.endResults.Game4[i] != null && this.gameState.endResults.Game4[i] != 'derrota') {
                this.gameState.logros4.push(this.gameState.logros.Game4[i]);
            }
            // --- logros g5
            if(this.gameState.endResults.Game5[i] != null && this.gameState.endResults.Game5[i] != 'derrota') {
                this.gameState.logros5.push(this.gameState.logros.Game5[i]);
            }
        }

        console.log(this.gameState.logros1);
        console.log(this.gameState.logros2);
        console.log(this.gameState.logros3);
        console.log(this.gameState.logros4);
        console.log(this.gameState.logros5);
    }
}