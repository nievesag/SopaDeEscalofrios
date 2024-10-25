export default class GameSelectorMenu extends Phaser.Scene {
    constructor() {
        super({ key: 'GameSelectorMenu'});
    }
    
    preload () {
    
    }
    
    create (){
            this.createButton("MINIGAME 1", 200, 200, 'white', 60, 'Game1');
            this.createButton("MINIGAME 2", 800, 200, 'white', 60, 'Game2');
            this.createButton("MINIGAME 3", 200, 600, 'white', 60, 'Game3');
            this.createButton("MINIGAME 4", 800, 600, 'white', 60, 'Game4');
            this.createButton("MINIGAME 5", this.cameras.main.centerX, this.cameras.main.centerY, 'white', 60, 'Game5');


    }

	createButton(text, x, y, textColor, fontsize, sceneName) {
        let button = this.add.text(
           x,
           y,
            text,
            {
                fontFamily: 'babelgam',
                fontSize: fontsize,
                color: textColor
            }
        ).setOrigin(0.5, 0.5);

        button.setInteractive();
        button.on("pointerdown", () => {
            this.scene.start(sceneName);
        });
    }



    }