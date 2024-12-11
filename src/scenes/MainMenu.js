export default class MainMenu extends Phaser.Scene {
	constructor() {
		super({ key: 'MainMenu'});
	}

	create() {
        // Background.
        this.bg = this.make.image({ 
            key: 'backgroundMenu',
        }).setPosition(this.cameras.main.centerX, this.cameras.main.centerY).setOrigin(0.5).setScale(0.8, 1.11);

        // Botones
        this.createButton('JUGAR',  this.cameras.main.width -100,  this.cameras.main.scrollY + 50, '#735500');
        
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
            this.scene.start("GameSelectorMenu");
        });

        button.on('pointerover', () => // Al pasar el ratón por encima...
        {
            button.setColor('#0032c3');
        });
    
        button.on('pointerout', () => // Al quitar el ratón de encima...
        {
            button.setColor('#735500');
        });
    }

  }