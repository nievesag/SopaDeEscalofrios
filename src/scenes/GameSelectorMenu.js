export default class GameSelectorMenu extends Phaser.Scene {
    constructor() {
        super({ key: 'GameSelectorMenu'});
    }
    
    preload () {
    
    }
    
    create (){
            this.createButton("Camino a la Duat", 200, 200, 'white', 50, 'Game1');
            this.createButton("La Vasija Entresija", 800, 200, 'white', 50, 'Game2');
            this.createButton("Al Rescate de los Escarabajos", 200, 600, 'white', 35, 'Game3');
            this.createButton("Tiro al Arco Mágico", 800, 600, 'white', 50, 'Game4');
            this.createButton("El Sendero al Sol", this.cameras.main.centerX, this.cameras.main.centerY, 'white', 50, 'Game5');


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