import Cannon from '../objetos/Game2Obj/Cannon.js';
import Vessel from '../objetos/Game2Obj/Vessel.js';
import Maelstrom from '../objetos/Game2Obj/Maelstrom.js';
import Background from '../objetos/Game2Obj/Background.js';
import Crocodile from '../objetos/Game2Obj/Crocodile.js';
import Hippo from '../objetos/Game2Obj/Hippo.js';
import ObstaclesGenerator from '../objetos/Game2Obj/ObstacleGenerator.js';

export default class Game2 extends Phaser.Scene {
    constructor() {
        super({ key: 'Game2'});
        
    }

    init(data) {
        this.gameState = data.gameState; // Guarda gameState en la escena
    }
    
    // CAMBIAR TODO PERO TODO E POR SPRITES
    create (){
        this.isGameOver = false; // inicialmench no es gameOver.
        
        // si es la primera vez q se inicia...
        if(!this.gameState.hasStartedBefore[1]){
            this.gameState.hasStartedBefore[1] = true; // ala ya ha salio el tutorial.
            this.createTanqiaPopUp();
        }
        else{ // si ya se ha iniciado anteriormente...
            this.startGame(); // empieza el game directamente.
        }
        
    }

    createTanqiaPopUp(){
        this.isClickingOnUI = true; // inicialmente lo de Tanqia es UI (bloquea interacciones).
        // Background del dialogo (LUEGO IMAGEN).
        let dialogueBackground = this.make.image({
            x: this.cameras.main.centerX, // x
            y: this.cameras.main.centerY, // y
            scale:{
                x: 1.9, // anchura
                y: 2.22, // altura
            },
            key: 'tanqiaBg',
        });

        let tanqia = this.add.image(
            this.cameras.main.centerX, 
            this.cameras.main.centerY + 175, 
            'tanqia'
        ).setScale(0.5, 0.32); // x, y, tag.

        let tanqiaText = this.add.text(
            this.cameras.main.centerX, 
            this.cameras.main.centerY - 150, 
            'Nun, Las Aguas de la Vida, está encolerizado: una fuerte tempestad llena el paisaje. Una fuerte lluvia que se siente como pedradas, fortísimos relámpagos que son capaces de acobardar al más valeroso, vorágines que tragan todo a su paso, incluso las formas de vida de esta zona caudalosa parecieran haber enloquecido. Contacta con Anuket, diosa del agua enviándole una carta y órganos de gente sacrificada metidos en un vaso canopo para que ayude en la causa de apaciguar las aguas y traer de vuelta a la normalidad al río Nilo.',
            {
                fontSize: '20px',
                color: '#ffffff',
                align: 'center',
                fontFamily: 'EagleLake',
                wordWrap: {width: 500}, // la puta polla: es lo de \n pero pro.
                wordWrapUseAdvanced: true, // sirve para que no se coma palabras.
            }
        ).setOrigin(0.5); // danzhu lo tenia y funciona.

        // Botón de aceptar.
        let acceptButton = this.add.text(
            this.cameras.main.centerX, 
            this.cameras.main.centerY + 340, 
            'Jugar',
            {
            fontSize: '50px',
            fontFamily: 'arabic',
            color: 'white',
            align: 'center'
        }).setOrigin(0.5).setInteractive();

        acceptButton.on('pointerover', () => // Al pasar el ratón por encima...
        {
            acceptButton.setTint(0xdfa919);
        });

        acceptButton.on('pointerout', () => // Al quitar el ratón de encima...
        {
            acceptButton.clearTint();
        });

        acceptButton.on('pointerdown', ()=>{
            // Destruye todo y pone el juego a funcionarch.
            dialogueBackground.destroy();
            tanqia.destroy();
            tanqiaText.destroy();
            acceptButton.destroy();
            this.startGame();
        })
    }

    startGame(){

        this.isClickingOnUI = true; // al inicio desactiva el input.
        // durante 100 milisegs bloquea el input.
        this.time.delayedCall(100, ()=>{
            this.isClickingOnUI = false; // permite interaccion tras 2 segs
        })

        // música.
        let music = this.sound.add('theme2');
        music.play();
        this.sound.pauseOnBlur = true;

        // background y rio.
        this.bg = this.add.tileSprite(0, 0, 3200, 600, 'background').setOrigin(0, 0).setScrollFactor(0);
        this.rio = this.add.tileSprite(0, 600, 3200, 200, 'river').setOrigin(0,0).setScrollFactor(0);

        // creación de los objetos del juego.
        this.background = new Background(this);
        this.background.initialLandscape();
        this.cannon = new Cannon(this);

        // DIFICULTAD SEGÚN LOS DÍAS.
        this.setDifficulty();

        this.obstacleGen = new ObstaclesGenerator(this, this.obsClass);
        this.vessel = new Vessel(this, this.cannon, this.obstacleGen);
        this.vessel.vesselCollisions();

        // establece los límites del mundo y de la cámara.
        // x, y, width, height
        this.physics.world.setBounds(0, -350, Number.MAX_SAFE_INTEGER, 1050);
        this.cameras.main.setBounds(0, 0, Number.MAX_SAFE_INTEGER, 600);

        // Botón de la música.
        this.musicButton = this.add.image(40, 40, 'musicButton');
        this.musicButton.on("pointerdown", () => { // PARAR Y REANUDAR MUSICA.
            this.isClickingOnUI = true; 
            if (music.isPlaying) {
                music.pause();
                this.musicButton.setTexture('muteButton');
            } 
            else {
                music.resume();
                this.musicButton.setTexture('musicButton');
            }
        }).setScale(0.3).setInteractive().setDepth(10).setScrollFactor(0); // pq es UI
        
        // contador de distancia.
        this.distanceCounter = this.add.text(
            400, 
            35,
            'Distancia: 0m', // inicialmench 0m..
            {
                fontSize: '24px',
                color: 'white',
                fontFamily: 'EagleLake'
            }
        ).setDepth(10).setScrollFactor(0); // pq es UI.

        // botón de regreso.
        this.buttonMainMenu = this.createButton('Regresar',  960,  35, 'white', 30, 'GameSelectorMenu');
        this.buttonMainMenu.on('pointerdown', () => { 
            this.isGameOver = false;
            this.isClickingOnUI = true; 
            this.destroyAll();
            this.scene.stop(); // detiene la escena.
        }).setDepth(10).setScrollFactor(0); // pq es UI 
        
        // VASIJA.
        this.input.on('pointerup', () => // AL HACER CLIC.
        {
            if (!this.isClickingOnUI) { // si no se clica en la UI...
            this.vessel.launchVessel(this.cannon.angle); // lanza vasija.
            }
        });
        
        this.input.on('pointermove', (pointer) => // SIGUE AL MOUSE.
        {
            this.cannon.cannonAngle(pointer); 
        });
    }

    setDifficulty(){
        // lógica según el día.
        let day = this.gameState.currentDay;
        this.obsClass = []; // crea un array vacío para después llenarlo según el día.

        if(day === 1 || day === 2){
            this.obsClass = [
                {type: 'crocodile', class: Crocodile},
            ];
        }
        else if(day === 3 || day === 4){
            this.obsClass = [
                {type: 'crocodile', class: Crocodile},
                {type: 'hippo', class: Hippo},
            ];
        }
        else if(day === 5){
            this.obsClass = [
                {type: 'crocodile', class: Crocodile},
                {type: 'hippo', class: Hippo},
                {type: 'maelstrom', class: Maelstrom}, // MAELSTROM AUN NO MATA!!!
            ];
        }
    }

    update(){

        // HAY QUE PONERLE A TODO IF POR LA CARA PQ SI NO FALLA
        // HAY Q INVESTIGAR COMO HACER ESO MAS LIMPIO :/

        if(this.bg && this.rio && this.background && this.vessel && this.obstacleGen && this.buttonMainMenu && this.musicButton && this.vessel && this.vessel.body){
            // parallax scroller.
            this.bg.tilePositionX += 2;
            this.rio.tilePositionX -=6;

            this.background.update();
            this.vessel.update();
            this.obstacleGen.update();

            //let scrollX = this.cameras.main.scrollX; // posx camara
            //let scrollY = this.cameras.main.scrollY; // posy camara

            // NOTA: COMPROBAR SI PUEDO HACER .SETSCROLLFACTOR PARA BG Y RIO
            //this.bg.setPosition(scrollX,scrollY);
            //this.rio.setPosition(scrollX, 600);
            
            let distance = this.vessel.x - this.vessel.initialPosX; // distancia recorrida
            this.distanceCounter.setText('Distancia: ' + distance.toFixed(2) + 'm'); // el tofixed es para que tenga solo 2 decimales.
            //this.distanceCounter.setPosition(scrollX + 400, scrollY + 20)
            
            // si se detiene el movimiento Y LA VASIJA HA SIDO LANZADA.
            if((Math.abs(this.vessel.body.velocity.x) < 0.5) && this.vessel.isLaunched){ 
                if(!this.stopTimer){ // si no exite timer lo crea.

                    this.stopTimer = this.time.addEvent({
                        delay: 2000, // espera 2 segs.
                        callback: () => 
                        {

                            this.gameOver(); // se nos ha jodio la flesbos.
                        }
                    });
                } 
            }
            else{
                if(this.stopTimer){ // si esite y no esta para la vasija ni es lanzada..

                    this.stopTimer.remove(); // para el crono.
                    this.stopTimer = null; // quita refe.
                }  
            }
        }
    }
    

    gameOver(){ // ¡¡¡¡¡¡¡¡PENDIENTE: PQ GAME OVER SALE SOLO UNA VEZ???? EL RESTO DE VECES NO.....

        if(!this.isGameOver){ // SI NO HAY GAME OVER AÚN...
            this.isGameOver = true; // ... lo hay ahora.
            
            // --- LÓGICA DE GAME OVER SI TRUE... ---

            // quita las físicas.
            this.physics.pause(); 

            let gameOverBg = this.make.image({
                x: this.cameras.main.centerX, // x
                y: this.cameras.main.centerY + 50, // y
                scale:{
                    x: 2.5, // anchura
                    y: 1.5, // altura
                },
                key: 'rectUI'
            }).setOrigin(0.5).setDepth(99).setScrollFactor(0);

            let gameOverText = this.add.text(
            this.cameras.main.centerX,
            this.cameras.main.centerY,
            '¡Se acabó!',
            {
                fontSize: '70px',
                fontFamily: 'EagleLake',
                color: 'white',
                align: 'center'
            }
            ).setOrigin(0.5).setDepth(100).setScrollFactor(0); // setcrollfactor SIGUE A LA CÁMARA.

            let restartButton = this.add.text(
            this.cameras.main.centerX,
            this.cameras.main.centerY + 100,
            'Reiniciar (-1 acción)',
            {
                fontSize: '40px',
                fontFamily: 'EagleLake',
                color: 'white',
                align: 'center'
            }
            ).setOrigin(0.5).setInteractive().setDepth(100).setScrollFactor(0);

            restartButton.on('pointerdown', () => {
                if (this.gameState.actionsLeft > 0){
                    this.isGameOver = false;
                    this.gameState.actionsLeft--;
                    this.scene.restart(); // reinicia escena.
                }
                else{
                    alert('No te quedan acciones hoy. Pasa al siguiente dia.');
                }
            });

            restartButton.on('pointerover', () => // Al pasar el ratón por encima...
            {
                restartButton.setTint(0x453424);
            });

            restartButton.on('pointerout', () => // Al quitar el ratón de encima...
            {
                restartButton.clearTint();
            });

            // PARA VER LO DE LOS COLLECTIONABLES
            let result;
            if (this.isGameOver) {
            console.log("victoria");
            result = 'victoria';
            }
            if (result) {
            const currentDayIndex = this.gameState.currentDay - 1; 
            this.gameState.minigamesResults.Game4[currentDayIndex] = result;
            }
            console.log('Resultados hasta ahora: ' + this.gameState.minigamesResults.Game4);
        }
    }

    

    destroyAll(){ // elimina todos los objetos del juego.
        if(this.background)
        {
            this.background.destroy();
            this.background = null; // limpia referencia.
        } 

        if(this.cannon)
        {
            this.cannon.destroy();
            this.cannon = null;
        } 

        if(this.vessel)
        {
            this.vessel.destroy();
            this.vessel = null;
        } 

        if(this.obstacleGen)
        {
            let items = this.obstacleGen.obsGroup.getChildren(); // saca los items de dentro.

            for(let i = 0; i < items.length; i++){
            items[i].destroy();
            }
            this.obstacleGen.obsGroup.clear(true, true); // limpia el grupo (objetos, referencias).
            this.obstacleGen.destroy();
        } 

        if(this.buttonMainMenu)
        {
            this.buttonMainMenu.destroy();
            this.buttonMainMenu = null;
        } 

        if(this.musicButton)
        {
            this.musicButton.destroy();
            this.buttonMainMenu = null;
        } 
    }

    // botón de la UI.
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
        ).setOrigin(0.5, 0.5).setInteractive();

        button.on('pointerover', () => // Al pasar el ratón por encima...
        {
            button.setTint(0xdfa919);
        });

        button.on('pointerout', () => // Al quitar el ratón de encima...
        {
            button.clearTint();
        });

        button.on("pointerdown", () => { // Al hacer clic...
            this.scene.start(sceneName);
            this.sound.stopAll();
        });

        return button;
    }
    
}
