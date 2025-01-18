import Cannon from '../objetos/Game2Obj/Cannon.js';
import Vessel from '../objetos/Game2Obj/Vessel.js';
import Maelstrom from '../objetos/Game2Obj/Maelstrom.js';
import Background from '../objetos/Game2Obj/Background.js';
import Crocodile from '../objetos/Game2Obj/Crocodile.js';
import Hippo from '../objetos/Game2Obj/Hippo.js';
import ObstaclesGenerator from '../objetos/Game2Obj/ObstacleGenerator.js';
import ColorBug from '../objetos/Game2Obj/ColorBug.js';

export default class Game2 extends Phaser.Scene {
    constructor() {
        super({ key: 'Game2'});
    }

    init(data) {
        this.gameState = data.gameState; // guarda gameState en la escena.
    }
    
    create (){
        this.cameras.main.setBackgroundColor(0x181818);
        this.isGameOver = false; // inicialmench no es gameOver.
  
        // si es la primera vez q se inicia...
        if(!this.gameState.hasStartedBefore[1]){ // [1] es por que es el Game2.
            this.gameState.hasStartedBefore[1] = true; // ala ya ha salio el tutorial.
            this.createTanqiaPopUp();
        }
        else{ // si ya se ha iniciado anteriormente...
            this.startGame(); // empieza el game directamente.
        }    
    }

    createTanqiaPopUp(){
        this.isClickingOnUI = true; // inicialmente lo de Tanqia es UI (bloquea interacciones).

        let tanqiaText = this.add.text(
            this.cameras.main.centerX, 
            this.cameras.main.centerY - 100, 
            'Nun, Las Aguas de la Vida, está encolerizado: una fuerte tempestad llena el paisaje. Una fuerte lluvia que se siente como pedradas, fortísimos relámpagos que son capaces de acobardar al más valeroso, vorágines que tragan todo a su paso, incluso las formas de vida de esta zona caudalosa parecieran haber enloquecido. Contacta con Anuket, diosa del agua enviándole una carta y órganos de gente sacrificada metidos en un vaso canopo para que ayude en la causa de apaciguar las aguas y traer de vuelta a la normalidad al río Nilo.',
            {
                fontSize: '20px',
                color: '#ffffff',
                align: 'center',
                fontFamily: 'yatra',
                wordWrap: {width: 600}, // la puta polla: es lo de \n pero pro.
                wordWrapUseAdvanced: true, // sirve para que no se coma palabras.
            }
        ).setOrigin(0.5); // danzhu lo tenia y funciona.

        let tanqia = this.add.image(
            this.cameras.main.centerX, 
            this.cameras.main.centerY + 175, 
            'Icon2'
        ).setScale(1.5, 1.5).setInteractive(); // x, y, tag.

        tanqia.on('pointerover', () => // Al pasar el ratón por encima...
        {
            tanqia.setTint(0x8a9597);
        });

        tanqia.on('pointerout', () => // Al quitar el ratón de encima...
        {
            tanqia.clearTint();
        });

        tanqia.on('pointerdown', ()=>{
            // Destruye todo y pone el juego a funcionarch.
            tanqia.destroy();
            tanqiaText.destroy();
            this.showTutorial();
        });
    }

    showTutorial(){
        let tutoImage = this.make.image({
            x: this.cameras.main.centerX, // x
            y: this.cameras.main.centerY, // y
            scale:{
                x: 1, // anchura
                y: 1.1, // altura
            },
            key: 'Tuto2',
        });

        let tuto2Text = this.add.text( // diapo 1 text.
            this.cameras.main.width - 30, 
            this.cameras.main.scrollY + 30, 
            'X',
            {
                fontSize: '40px',
                color: '#181818',
                align: 'center',
                fontFamily: 'yatra',
            }
        ).setOrigin(0.5).setInteractive();

        tuto2Text.on('pointerdown', ()=>{
            // Destruye todo y pone el juego a funcionarch.
            tutoImage.destroy();
            tuto2Text.destroy();
            this.startGame();
        });

        tuto2Text.on('pointerover', () => // Al pasar el ratón por encima...
        {
            tuto2Text.setColor('#0032c3');
        });

        tuto2Text.on('pointerout', () => // Al quitar el ratón de encima...
        {
            tuto2Text.setColor('#181818');
        });
    }

    startGame() {
        this.isClickingOnUI = true; // al inicio desactiva el input.
        // durante 100 milisegs bloquea el input.
        this.time.delayedCall(100, ()=>{
            this.isClickingOnUI = false; // permite interaccion tras 2 segs
        })

        // background y rio.
        this.bg = this.add.tileSprite(0, this.cameras.main.centerY - 400, 5220, 1080, 'background').setOrigin(0, 0).setScrollFactor(0).setScale(1, 0.6);
        this.rio = this.add.tileSprite(0, 600, 3200, 1992, 'river').setOrigin(0,0).setScrollFactor(0).setScale(1, 0.1);

        // creación de los objetos del juego.
        this.landscape = new Background(this);
        this.landscape.initialLandscape();
        this.cannon = new Cannon(this);
        this.colorBug = new ColorBug(this);

        // DIFICULTAD SEGÚN LOS DÍAS.
        this.setDifficulty();

        this.obstacleGen = new ObstaclesGenerator(this, this.obsClass);
        this.vessel = new Vessel(this, this.cannon, this.obstacleGen, this.colorBug);
        this.vessel.vesselCollisions();

        // establece los límites del mundo y de la cámara.
        // x, y, width, height
        this.physics.world.setBounds(0, -350, Number.MAX_SAFE_INTEGER, 1050);
        this.cameras.main.setBounds(0, 0, Number.MAX_SAFE_INTEGER, 600);
        
        // contador de distancia.
        this.distanceCounter = this.add.text(
            400, 
            35,
            'Distancia: 0 codos', // inicialmench 0m..
            {
                fontSize: '24px',
                color: 'white',
                fontFamily: 'yatra'
            }
        ).setDepth(10).setScrollFactor(0); // pq es UI.

        // contador de distancia.
        this.winCounter = this.add.text(
            this.distanceCounter.x, 
            this.distanceCounter.y + 40,
            'Codos para ganar: 0 codos', // inicialmench 0m..
            {
                fontSize: '24px',
                color: 'white',
                fontFamily: 'yatra'
            }
        ).setDepth(10).setScrollFactor(0); // pq es UI.
        
        // VASIJA.
        this.input.on('pointerup', () => // AL HACER CLIC.
        {
            if (!this.isClickingOnUI && !this.vessel.isLaunched) { // si no se clica en la UI y no se ha lanzado......
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
                {type: 'maelstrom', class: Maelstrom}, 
            ];
        }
    }

    update(){
        // Esto es pq en el primer tick del update las cosas no se han creado :)
        if(this.bg && this.rio && this.landscape && this.vessel && this.obstacleGen && this.vessel && this.vessel.body && this.winCounter){
            
            // parallax scroller.
            if(this.vessel.isLaunched){
                this.bg.tilePositionX += this.vessel.body.velocity.x / 500; // el fondo va segun la velocidad del vessel (aprox /500)
            }
            this.rio.tilePositionX -=6;

            this.landscape.update();
            this.vessel.update();
            this.obstacleGen.update();
            this.colorBug.update();

            //let scrollX = this.cameras.main.scrollX; // posx camara
            //let scrollY = this.cameras.main.scrollY; // posy camara

            // NOTA: COMPROBAR SI PUEDO HACER .SETSCROLLFACTOR PARA BG Y RIO
            //this.bg.setPosition(scrollX,scrollY);
            //this.rio.setPosition(scrollX, 600);
            
            // VICTORIA Y DERROTA.
            this.winCondition = false;
            let day = this.gameState.currentDay;

            let distance = this.vessel.x - this.vessel.initialPosX; // distancia recorrida
            let codoDistance = (distance * 0.524).toFixed(2)
            if(!this.vessel.isLaunched){ // si no se ha lanzado...
                this.distanceCounter.setText('Distancia: 0 codos');
                if(day === 1 || day === 2){
                    this.winCounter.setText('Codos para ganar: 5000 codos');
                }
                else if (day === 3 || day === 4){
                    this.winCounter.setText('Codos para ganar: 2700 codos');
                }
                else if(day === 5){
                    this.winCounter.setText('Codos para ganar: 2500 codos');
                }
            }
            else{
                this.distanceCounter.setText('Distancia: ' + codoDistance + ' codos'); // el tofixed es para que tenga solo 2 decimales y se multiplica por '0.524 para convertirlo a codos reales.
                if(day === 1 || day === 2){
                    this.winCounter.setText('Codos para ganar: ' + (5000 - codoDistance).toFixed(2) + ' codos');
                }
                else if (day === 3 || day === 4){
                    this.winCounter.setText('Codos para ganar: ' + (2700 - codoDistance).toFixed(2) + ' codos');
                }
                else if(day === 5){
                    this.winCounter.setText('Codos para ganar: ' + (2500 - codoDistance).toFixed(2) + ' codos');
                }
            }

            if((codoDistance > 5000 && (day === 1 || day === 2))
             ||(codoDistance > 2700 && (day === 3 || day === 4))
             ||(codoDistance > 2500 && day === 5))
            {
                this.winCondition = true;
                this.gameOver();
            }
            
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

            let result;
            if (this.winCondition) {
                console.log("victoria");
                alert('Has obtenido el logro ' + this.gameState.logros.Game2[this.gameState.currentDay - 1] + ' por enviarle una carta a Nun el día ' + this.gameState.currentDay);
                result = 'victoria';
            }
            else
            {
                console.log("derrota");
                result = 'derrota';
            }

            if (result) {
                const currentDayIndex = this.gameState.currentDay - 1; 
                this.gameState.minigamesResults.Game3[currentDayIndex] = result;
            }

            // ENDLEVEL.
            let mode;
            if(this.winCondition){
                mode = 0;
                this.scene.start('EndLevel', {mode: mode});
            }
            else if(!this.winCondition){
                mode = 1;
                this.scene.start('EndLevel', {mode: mode});
            }
            /*let gameOverBg = this.make.image({
                x: this.cameras.main.centerX, // x
                y: this.cameras.main.centerY + 50, // y
                scale:{
                    x: 2.8, // anchura
                    y: 1, // altura
                },
                key: 'rectUI'
            }).setOrigin(0.5).setDepth(99).setScrollFactor(0);

            let gameOverText = this.add.text(
            this.cameras.main.centerX,
            this.cameras.main.centerY,
            'La vasija se ha hundido',
            {
                fontSize: '50px',
                fontFamily: 'yatra',
                color: 'white',
                align: 'center'
            }
            ).setOrigin(0.5).setDepth(100).setScrollFactor(0); // setcrollfactor SIGUE A LA CÁMARA.


            if(this.winCondition){
                gameOverText.setText('Has ganado, obtener logros');

                // PARA VER LO DE LOS COLLECTIONABLES
            let result;
            if (this.isGameOver) {
            console.log("victoria");
            result = 'victoria';
            }
            if (result) {
            const currentDayIndex = this.gameState.currentDay - 1; 
            this.gameState.minigamesResults.Game2[currentDayIndex] = 'victoria';
            }
            console.log('Resultados hasta ahora: ' + this.gameState.minigamesResults.Game2);
            }

            this.buttonMainMenu.setPosition(this.cameras.main.centerX, this.cameras.main.centerY + 100).setFontSize(40).setVisible(true);
*/
        }
    }
}
