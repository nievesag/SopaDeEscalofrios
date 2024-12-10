let ending = 0;

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

        // Texto del Título con borde de color aleatorio
        let title = this.add.text(
            this.cameras.main.centerX,
            this.cameras.main.centerY - 150,
            'FIN DEL PERIODO DE CONTACTO CON LOS DIOSES',
            {
                fontFamily: 'arabic',
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
                fontFamily: 'arabic',
                fontSize: 25,
                color: '#e3be5b'
            }
        ).setOrigin(0.5, 0.5);

        const bg = this.make.image({ // Background.
            key: 'backgroundMenu',
        }).setPosition(this.cameras.main.centerX, this.cameras.main.centerY);

        // Alineacion y profundidad del texto.
        title.setAlign('center').setDepth(1);
		title2.setAlign('center').setDepth(1);

        // Gestion de finales
        this.checkEnding();
        this.showEnding(ending);

        // Botones
        this.createButton('VOLVER',  this.cameras.main.centerX,  80 + this.cameras.main.centerY, 'white');
        //this.createButton('2P Game', 50, 2, 'white');
    }

	createButton(text, x, y, textColor) {
        let button = this.add.text(
           x,
           y,
            text,
            {
                fontFamily: 'arabic',
                fontSize: 50,

                color: textColor
            }
        ).setOrigin(0.5, 0.5);

        button.setInteractive();
        button.on("pointerdown", () => { // Al hacer clic...
            this.scene.start("GameSelectorMenu");
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
        if(e == 1) {
            bg = this.make.image({
                key: 'Final1',
            }).setPosition(this.cameras.main.centerX, this.cameras.main.centerY);
        }
        else if(e == 2) {
            bg = this.make.image({
                key: 'Final2',
            }).setPosition(this.cameras.main.centerX, this.cameras.main.centerY);
        }
        else if(e == 3) {
            bg = this.make.image({
                key: 'Final3',
            }).setPosition(this.cameras.main.centerX, this.cameras.main.centerY);
        }
        else if(e == 4) {
            bg = this.make.image({
                key: 'Final4',
            }).setPosition(this.cameras.main.centerX, this.cameras.main.centerY);
        }
        else if(e == 5) {
            bg = this.make.image({
                key: 'Final5',
            }).setPosition(this.cameras.main.centerX, this.cameras.main.centerY);
        }
        else if(e == 6) {
            bg = this.make.image({ 
                key: 'Generico',
            }).setPosition(this.cameras.main.centerX, this.cameras.main.centerY);
        }
    }
}