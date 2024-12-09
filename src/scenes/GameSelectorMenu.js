
// Variable global para gestionar el dia y las acciones
let gameState = {
    currentDay: 1,
    actionsLeft: 3,
    maxDays: 5,
    minigamesResults: {
        Game1: [null, null, null, null, null] ,
        Game2: [null, null, null, null, null] ,
        Game3: [null, null, null, null, null] ,
        Game4: [null, null, null, null, null] ,
        Game5: [null, null, null, null, null] 
    },
    hasStartedBefore: [
        false, // game1.
        false, // game2.
        false, // game3.
        false, // game4.
        false  // game5.
    ],
};

export default class GameSelectorMenu extends Phaser.Scene {
    constructor() {
        super({ key: 'GameSelectorMenu'});
    }
    
    preload () {
    
    }
    
    init(data) {
        this.endResults = data.endResults; // Guarda endResults en la escena
    }

    create () {
        this.sound.stopAll();

        // Música.
        const music = this.sound.add('f3ale');
        music.play();
        this.sound.pauseOnBlur = true;

        this.createButton("Camino a la Duat", 200, 200, 'white', 50, 'Game1');
        this.createButton("La Vasija Entresija", 800, 200, 'white', 50, 'Game2');
        this.createButton("Al Rescate de los Escarabajos", 200, 600, 'white', 35, 'Game3');
        this.createButton("Tiro al Arco Mágico", 800, 600, 'white', 50, 'Game4');
        this.createButton("El Sendero al Sol", this.cameras.main.centerX, this.cameras.main.centerY, 'white', 50, 'Game5');

        this.infoText = this.add.text(10, 10, `Día: ${gameState.currentDay} - Acciones restantes: ${gameState.actionsLeft}`, {
            fontFamily: 'Arial',
            fontSize: '24px',
            color: '#ffffff',
        });

        // Boton para pasar al siguiente día
        this.nextDayButton = this.add.text(this.cameras.main.width - 100, 40, 'Next Day', {
            fontFamily: 'Arial',
            fontSize: '30px',
            color: '#ffffff',
        }).setOrigin(0.5, 0.5);

        this.nextDayButton.setInteractive();
        this.nextDayButton.on('pointerdown', () => this.nextDay());
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
            if (gameState.actionsLeft > 0) {
                gameState.actionsLeft--;
                this.scene.start(sceneName, { gameState: gameState });
                this.sound.stopAll();
            } else {
                alert('No te quedan acciones hoy. Pasa al siguiente dia.');
            }

        });
    }

    nextDay() {
        if (gameState.currentDay < gameState.maxDays) {
            gameState.currentDay++;
            gameState.actionsLeft = 3;
            this.infoText.setText(`Día: ${gameState.currentDay} - Acciones restantes: ${gameState.actionsLeft}`);
        } else {
            alert('¡Has alcanzado el ultimo dia!');
            this.saveEndResults();
            this.resetGame();
            this.scene.start("EndMenu");
        }
    }

    saveEndResults() {
        this.endResults.Game1 = gameState.minigamesResults.Game1;
    }

    resetGame() {
        gameState.currentDay = 1;
        gameState.actionsLeft = 3;
        gameState.maxDays = 5;
        gameState.minigamesResults = {
            Game1: [null, null, null, null, null] ,
            Game2: [null, null, null, null, null] ,
            Game3: [null, null, null, null, null] ,
            Game4: [null, null, null, null, null] ,
            Game5: [null, null, null, null, null] 
        };
    }
}