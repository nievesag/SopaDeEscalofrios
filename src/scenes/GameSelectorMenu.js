export default class GameSelectorMenu extends Phaser.Scene {
    constructor() {
        super({ key: 'GameSelectorMenu'});
    }
    
    preload () {
    
    }
    
    create (){
            this.createButton("MINIGAME I", 200, 200, 'white', 60, 'Game1');
            this.createButton("MINIGAME II", 800, 200, 'white', 60, 'Game2');
            this.createButton("MINIGAME III", 200, 600, 'white', 60, 'Game3');
            this.createButton("MINIGAME IV", 800, 600, 'white', 60, 'Game4');
            this.createButton("MINIGAME V", this.cameras.main.centerX, this.cameras.main.centerY, 'white', 60, 'Game5');


    }

	createButton(text, x, y, textColor, fontsize, sceneName) {
        let button = this.add.text(
           x,
           y,
            text,
            {
                fontFamily: 'arabic',
                fontSize: fontsize,
                color: textColor
            }
        ).setOrigin(0.5, 0.5);

        button.on('pointerover', () => // Al pasar el ratón por encima...
        {
            button.setTint(0xdfa919);
        });

        button.on('pointerout', () => // Al quitar el ratón de encima...
        {
            button.clearTint();
        });

        button.setInteractive();
        button.on("pointerdown", () => { // Al hacer clic...
            this.scene.start(sceneName);
        });
    }



    }