//Importamos los objetos en escena
import Player3 from '../objetos/Game3Obj/Player3.js';
import Beetle from '../objetos/Game3Obj/Beetle.js';
import Matrix from '../objetos/Game3Obj/Matrix.js';
import Time from '../objetos/Game3Obj/Time.js';

export default class Game3 extends Phaser.Scene {
   
    constructor() {
        super({ key: 'Game3'});
    }

    init(data) {
        this.gameState = data.gameState; // Guarda gameState en la escena
    }
    
    preload () {
        // Musica.
        this.load.audio('theme3', './assets/audio/m3c.mp3');
    }
    
    create (){
        // si es la primera vez q se inicia...
        if(!this.gameState.hasStartedBefore[2]){
            this.gameState.hasStartedBefore[2] = true; // ala ya ha salio el tutorial.
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
            'Jepri, el dios del sol autocreado, sufre de una fuerte tristeza: sus adorados ahijados, los escarabajos de todo Egipto, han sido capturados.Para contentarle de nuevo, y evitar su ira, deberás rescatar al mayor número de escarabajos posibles, en el menor tiempo posible.',
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

        //// --- MUSIC ---.
        //const music = this.sound.add('theme3');
        //music.play();
        //this.sound.pauseOnBlur = true;
     
        // --- BACKGROUND ---.
        this.add.image(this.cameras.main.centerX, this.cameras.main.centerY, 'bg3')
          .setOrigin(0.5, 0.5)
          .setDisplaySize(this.cameras.main.width, this.cameras.main.height); 

        // --- BORDERS ---.
        const borderLeft = this.add.rectangle(90, 385, 200, 775, 0xbb953e, 10);
        const borderRight = this.add.rectangle(930, 385, 230, 775, 0xbb953e, 10);
        const borderUp = this.add.rectangle(550, 5, 1100, 10, 0xbb953e, 10);
        const borderDown = this.add.rectangle(550, 765, 1100, 10, 0xbb953e, 10);
        const borders = [borderLeft, borderRight, borderUp, borderDown];
        // Fisicas para bordes
        for (let i = 0; i < borders.length; i++){
            this.physics.world.enable(borders[i]);
            borders[i].body.setImmovable(true); // El suelo no se moverá
            borders[i].body.setAllowGravity(false); // No tendrá gravedad
        }

        // --- BOTON VOLVER A MAIN MENU ---.
        this.createButton('Exit',  925,  700, 'white', 50, 'GameSelectorMenu');

        // --- PUNTUACIÓN
        let points = 0;


  

        // --- TIMER ---
        //let timer = this.add.text(10, 30, { font: '16px Courier', fill: '#00FF00' });

        // --- INTERFACE ---.
        //let nextShootingBeetle = this.add.text(10, 30, { font: '16px Courier', fill: '#00FF00' });


        // --- CREACION OBJETOS ESCENA ---.
        // Cannon
        this.player3 = new Player3(this, 500, 750); // Ajusta las coordenadas
        // Matrix
        this.matrix = new Matrix(this, 200, 30);
        // Shooting Beetle 


        // --- COLISIONES ---.
        // --- COLISIONES BORDERS - DISPARO ---.
        this.physics.add.collider(borders, shootingBeetle);

        // --- COLISIONES MATRIX - DISPARO ---.
        if (Phaser.Geom.Intersects.CircleToCircle(this.player.shootingBeetle, this.matrix)) {
            console.log("Choca");
        }
        /*for (let i = 0; i < groupMatrix.length; i++){
        groupMatrix[i].getChildren().forEach(element => {
        //Hacemos que se llame a la función cuando se choque el escarabajo con la matriz


        this.physics.add.collider(shootingBeetle, element);
        //this.physics.add.collider(shootingBeetle, element, this.addToMatrix(shootingBeetle, element));

        //console.log(shootingBeetle);
        //console.log(element);*/

    


    
    }

    update (){

    }



    

    // --- BOTONES ---.
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
            this.sound.stopAll();

        });
    }

    setDifficulty() {
        if(this.gameState.currentDay == 1 || this.gameState.currentDay == 2)
        {

        }
        else if(this.gameState.currentDay == 3 || this.gameState.currentDay == 4)
        {

        }
        else if(this.gameState.currentDay == 5)
        {

        }
    }


}


/*
Fuentes: 
https://labs.phaser.io/edit.html?src=src\physics\arcade\closest%20furthest.js
https://labs.phaser.io/edit.html?src=src\utils\array\translate%20matrix.js
https://phaser.io/examples/v3.85.0/physics/arcade/view/velocity-from-angle


*/
            