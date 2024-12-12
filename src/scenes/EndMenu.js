let ending = 0;
let logros = {
    Game1: ['Amset', 'Hapy', 'Kebeshenuef', 'Duamutef', 'Henu'] ,
    Game2: ['Pluma de la corona', 'Concha cauri', 'Frasco Asuán', 'Cetro de Papiro', 'Cefalea bóvida'] ,
    Game3: ['Escarabajo negro', 'Escarabajo verde', 'Escarabajo azul', 'Escarabajo rojo', 'Escarabajo dorado'] ,
    Game4: ['Flecha', 'Lanza', 'Flecha mágica', 'Lanza mágica', 'Pluma'] ,
    Game5: ['Pequeña estrella', 'Estrella', 'Gran estrella', 'Sol', 'Sol radiante'] 
};

let logros1 = [];
let logros2 = [];
let logros3 = [];
let logros4 = [];
let logros5 = [];

export default class EndMenu extends Phaser.Scene {
	constructor() {
		super({ key: 'EndMenu'});
	}

    init(data) {
        this.gameState = data.gameState; // Guarda gameState en la escena
    }

	preload () {
		// Background.
        this.load.image('backgroundMenu', './assets/images/menuBackground.jpg');

        // Música.s
        this.load.audio('f3ale', './assets/audio/f3ale.mp3');
	}

	create() {
        // Paramos el audio
        this.sound.stopAll();
        
        // Música.
        const music = this.sound.add('f3ale');
        music.play();
        this.sound.pauseOnBlur = true;

        let blackBackground = this.make.image({
            key: 'tanqiaBackground'
        }).setPosition(this.cameras.main.centerX, this.cameras.main.centerY).setOrigin(0.5).setScale(0.8, 1.11);

        // Texto del Título con borde de color aleatorio
        let title = this.add.text(
            this.cameras.main.centerX,
            this.cameras.main.centerY - 150,
            'FIN DEL PERIODO DE CONTACTO CON LOS DIOSES',
            {
                fontFamily: 'yatra',
                fontSize: 30,

                color: '#dfa919',
                stroke: '#453424',   
                strokeThickness: 10
            }
        ).setOrigin(0.5, 0.5);

		let title2 = this.add.text(
            this.cameras.main.centerX,
            this.cameras.main.centerY - 75,
            'Estos son tus resultados:',
            {
                fontFamily: 'yatra',
                fontSize: 25,
                color: '#e3be5b'
            }
        ).setOrigin(0.5, 0.5);

        // Alineacion y profundidad del texto.
        title.setAlign('center').setDepth(1);
		title2.setAlign('center').setDepth(1);

        // Gestion de finales
        this.checkEnding();
        this.showEnding(ending);
        this.manageLogros();
        this.showLogros();

        // Botones
        this.createButton('VOLVER',  this.cameras.main.centerX,  80 + this.cameras.main.centerY, 'white');
    }

	createButton(text, x, y, textColor) {
        let button = this.add.text(
           x,
           y,
            text,
            {
                fontFamily: 'yatra',
                fontSize: 50,

                color: textColor
            }
        ).setOrigin(0.5, 0.5);

        button.setInteractive();
        button.on("pointerdown", () => { // Al hacer clic...
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
        let bgText;
        if(e == 1) {
            bg = this.make.image({
                key: 'Final1',
            }).setPosition(this.cameras.main.centerX, this.cameras.main.centerY).setOrigin(0.5).setScale(0.7, 0.7);

            bgText = this.add.text( // diapo 1 text.
                this.cameras.main.centerX, 
                this.cameras.main.centerY - 310, 
                'yeli yeli',
                {
                    fontSize: '20px',
                    color: '#ffffff',
                    align: 'center',
                    fontFamily: 'yatra',
                    wordWrap: {width: 500}, // la puta polla: es lo de \n pero pro.
                    wordWrapUseAdvanced: true, // sirve para que no se coma palabras.
                }
            ).setOrigin(0.5); // danzhu lo tenia y funciona.
        }
        else if(e == 2) {
            bg = this.make.image({
                key: 'Final2',
            }).setPosition(this.cameras.main.centerX, this.cameras.main.centerY).setOrigin(0.5).setScale(0.7, 0.7);
        }
        else if(e == 3) {
            bg = this.make.image({
                key: 'Final3',
            }).setPosition(this.cameras.main.centerX, this.cameras.main.centerY).setOrigin(0.5).setScale(0.7, 0.7);
        }
        else if(e == 4) {
            bg = this.make.image({
                key: 'Final4',
            }).setPosition(this.cameras.main.centerX, this.cameras.main.centerY).setOrigin(0.5).setScale(0.7, 0.7);
        }
        else if(e == 5) {
            bg = this.make.image({
                key: 'Final5',
            }).setPosition(this.cameras.main.centerX, this.cameras.main.centerY).setOrigin(0.5).setScale(0.7, 0.7);
        }
        else if(e == 6) {
            bg = this.make.image({ 
                key: 'Generico',
            }).setPosition(this.cameras.main.centerX, this.cameras.main.centerY).setOrigin(0.5).setScale(0.7, 0.7);
        }
    }

    showLogros() {

        // si hay algun logro
        if(logros1.length != 0 || logros2.length != 0 || logros3.length != 0 || logros4.length != 0 || logros5.length != 0) 
        {
            alert('Has obtenido los siguientes logros: ' + logros1 +  ' ' + logros2 +  ' ' + logros3 +  ' ' + logros4 +  ' ' + logros5 );
        }

        /*
        for(var i = 0; i < logros1.length; i++) {
            if(i == 0) {
                // --- logro 1 g1
                if(logros1[i] != null) {
                    let l11 = this.make.image({
                        key: 'Final4',
                    }).setPosition(this.cameras.main.centerX, this.cameras.main.centerY);
                }
                // --- logro 1 g2
                if(logros2[i] != null) {
                    
                }
                // --- logro 1 g3
                if(logros3[i] != null) {

                }
                // --- logro 1 g4
                if(logros4[i] != null) {

                }
                // --- logro 1 g5
                if(logros5[i] != null) {

                }
            }
            else if(i == 1) {
                
            }
            else if(i == 2) {

            }
            else if(i == 3) {

            }
            else if(i == 4) {

            }
        }
        */
    }

    manageLogros() {
        for(var i = 0; i < this.gameState.endResults.Game1.length; i++) {
            // --- logros g1
            if(this.gameState.endResults.Game1[i] != null && this.gameState.endResults.Game1[i] != 'derrota') {
                logros1.push(logros.Game1[i]);
            }
            // --- logros g2
            if(this.gameState.endResults.Game2[i] != null && this.gameState.endResults.Game2[i] != 'derrota') {
                logros2.push(logros.Game2[i]);
            }
            // --- logros g3
            if(this.gameState.endResults.Game3[i] != null && this.gameState.endResults.Game3[i] != 'derrota') {
                logros3.push(logros.Game3[i]);
            }
            // --- logros g4
            if(this.gameState.endResults.Game4[i] != null && this.gameState.endResults.Game4[i] != 'derrota') {
                logros4.push(logros.Game4[i]);
            }
            // --- logros g5
            if(this.gameState.endResults.Game5[i] != null && this.gameState.endResults.Game5[i] != 'derrota') {
                logros5.push(logros.Game5[i]);
            }
        }

        console.log(logros1);
        console.log(logros2);
        console.log(logros3);
        console.log(logros4);
        console.log(logros5);
    }
}