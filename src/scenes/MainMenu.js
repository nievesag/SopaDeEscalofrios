export default class MainMenu extends Phaser.Scene {
	constructor() {
		super({ key: 'MainMenu'});
	}

	preload () {
		
	}
	create() {
        // Paramos el audio
        this.sound.stopAll();

        // Texto del Título con borde de color aleatorio
        let title = this.add.text(
            this.cameras.main.centerX,
            this.cameras.main.centerY - 150,
            'Introito Antiapotropaico\no cómo contactar con los dioses para propósitos malignos\npor mandato de la faraona suprema',
            {
                fontFamily: 'arabic',
                fontSize: 40,
                color: 'Blue'
            }
        ).setOrigin(0.5, 0.5);

        // Alineacion del texto
        title.setAlign('center');

        //Color del reborde de la letra y grosor.
        title.setStroke('white', 8)

        // Botones
        this.createButton('JUGAR', 0, 1, 'white');
        //this.createButton('2P Game', 50, 2, 'white');
    }

	createButton(text, yOffset, unidades, textColor) {
        let button = this.add.text(
            this.cameras.main.centerX,
            yOffset + this.cameras.main.centerY,
            text,
            {
                fontFamily: 'arabic',
                fontSize: 30,
                color: textColor
            }
        ).setOrigin(0.5, 0.5);

        button.setInteractive();
        button.on("pointerdown", () => {
            this.scene.start("Game3", {nPlayers : unidades});
        });
    }

  }