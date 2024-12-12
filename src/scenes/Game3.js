
import Player3 from '../objetos/Game3Obj/Player3.js';
import Beetle from '../objetos/Game3Obj/Beetle.js';
import Matrix from '../objetos/Game3Obj/Matrix.js';
import Time from '../objetos/Game3Obj/Time.js';

export default class Game3 extends Phaser.Scene 
{
    constructor() 
    {
        super({ key: 'Game3'});
    }

    init(data) 
    {
        this.gameState = data.gameState; // Guarda gameState en la escena
    }

    create ()
    {
        //Empieza sin ser game over
        this.gameOver = false;
        // si es la primera vez q se inicia...
        if(!this.gameState.hasStartedBefore[2]){
            this.gameState.hasStartedBefore[2] = true; // ala ya ha salio el tutorial.
            this.createTanqiaPopUp();
        }
        else{ // si ya se ha iniciado anteriormente...
            this.startGame(); // empieza el game directamente.
        }
        this.start = false;
    }

    createTanqiaPopUp()
    {
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
                fontFamily: 'yatra',
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
            fontFamily: 'yatra',
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

    startGame()
    {
        this.input.mouse.enabled = false;
        // durante 100 milisegs bloquea el input.
        this.time.delayedCall(100, ()=>{
            this.input.mouse.enabled = true;
        })

        //// --- MUSIC ---.
        //const music = this.sound.add('theme3');
        //music.play();
        //this.sound.pauseOnBlur = true;


        // --- PUNTUACIÓN ---.
        this.points = 0;
        this.pointUI = this.add.text(
            50, 
            50,
            'Puntos: ',
            {
                fontSize: '24px',
                color: 'white',
                fontFamily: 'EagleLake'
            }
        ).setDepth(3);

        // --- BACKGROUND ---.
        this.add.image(this.cameras.main.centerX, this.cameras.main.centerY, 'bg3')
          .setOrigin(0.5, 0.5)
          .setDisplaySize(this.cameras.main.width, this.cameras.main.height); 

        // --- BORDERS ---.
        const borderLeft = this.add.rectangle(90, 385, 200, 775, 0xbb953e, 10);
        const borderRight = this.add.rectangle(933, 385, 230, 775, 0xbb953e, 10);
        const borderUp = this.add.rectangle(550, 5, 1100, 10, 0xbb953e, 10);
        const borderDown = this.add.rectangle(550, 765, 1100, 10, 0xbb953e, 10);
        const borders = [borderLeft, borderRight, borderUp, borderDown];
        // Fisicas para bordes
        for (let i = 0; i < borders.length; i++){
            this.physics.world.enable(borders[i]);
            borders[i].body.setImmovable(true); // El suelo no se moverá
            borders[i].body.setAllowGravity(false); // No tendrá gravedad
        }

        //Boton SALIR
        //this.createButton('Exit',  100, 200, 'white', 30, 'GameSelectorMenu');

        // --- PLAYER ---.
        this.player = this.make.image({ 
            x: 500,
            y: 700, 
            key: 'player3',
            scale : {
                x: 0.3,
                y: 0.3
            },
        }).setDepth(1);

        // Línea de lanzamiento
        const graphics = this.add.graphics({ lineStyle: { width: 10, color: 0xffffff , alpha: 0.5 } });
        const line = new Phaser.Geom.Line(); 

        this.angle = 90; // Inicializa el ángulo a 90.

        // --- SHOOTABLES ---. 
        this.beetles = ['RedBeetle', 'OrangeBeetle', 'YellowBeetle', 'GreenBeetle', 'CianBeetle', 'BlueBeetle', 'PurpleBeetle'];
        //La dificultad, que depende de beetles
        //this.setDifficulty();
        // El que vamos a disparar
        this.shootingBeetle;
/*
        // --- GRID DE BICHOS ---.
        let cols = 12; //Columnas totales
        let fils = 12; //Filas totales - Rellenable solo hasta fila 13
        let filIni = 3;
        let height = 50; //Alto bicho
        let width = 50; //Ancho bicho
        let x = 220;
        let y = 40;
        let offset = width / 2;
        const row = new Array(cols);
        const lvl = new Array(fils);
        for (let j = 0; j < fils; j++){
            if (j % 2 == 1) //Miramos las filas pares
            {
                x += offset;
            }
            for (let i = 0; i < cols; i++){
                //Rellena filas
                let texture = Phaser.Math.RND.between(0, this.beetles.length - 1);
                //Color random
                if (j < filIni){

                    row.push(this.physics.add.sprite(x + width * i, y, this.beetles[texture]).setScale(1.25));
                }
                //Color Empty
                else {
                    row.push(this.add.sprite(x + width * i, y, "EmptyBeetle").setScale(1.25));
                }

            }
            //Collider en bichos
            row.forEach(element => {
                //console.log(element.texture.key);
                if (element.texture.key!= "EmptyBeetle"){
                    element.body.setAllowGravity(false);
                }
  
            });
            lvl.push(row);
            //Reseteamos la x 
            x = 220;
            y += height;
        }
 */   

         // --- GRID DE BICHOS ---.
         let cols = 12; //Columnas totales
         let fils = 12; //Filas totales - Rellenable solo hasta fila 13
         let filIni = 3;
         let height = 50; //Alto bicho
         let width = 50; //Ancho bicho
         let x = 220;
         let y = 40;
         let offset = width / 2;
         this.lvl = [];
         for (let j = 0; j < fils; j++){
            this.lvl[j] = []; 
            if (j % 2 == 1) //Miramos las filas pares
            {
                x += offset;
            }
            for (let i = 0; i < cols; i++){
                //Rellena filas
                let texture = Phaser.Math.RND.between(0, this.beetles.length - 1);
                //Color random
                if (j < filIni){
                    this.lvl[j][i] = this.add.sprite(x + width * i, y, this.beetles[texture]).setScale(1.25);
                    //this.lvl[j][i].body.setAllowGravity(false);
                }
                //Color Empty
                else {
                    this.lvl[j][i] = this.add.sprite(x + width * i, y,  "EmptyBeetle").setScale(1.25);
                }
            }
             //Reseteamos la x 
             x = 220;
             y += height;
         }
        
        
        
        
        
        // --- INPUT ---.
        // SIGUE AL MOUSE.
        this.input.on('pointermove', (pointer) =>
        {
            this.angle = Phaser.Math.Angle.BetweenPoints(this.player, pointer);
            this.player.rotation = this.angle + 1.5708; // Pone la rotación del cañón mirando al mouse en radianes

            // Línea gráfica de la dir.
            Phaser.Geom.Line.SetToAngle(line, this.player.x, this.player.y, this.angle, 225); 
            graphics.clear().strokeLineShape(line); // Limpia y redibuja la línea.

        });
        
        // AL HACER CLIC. DISPARO
        this.input.on('pointerup', () =>
        {
            //Randomizamos el color
            const texture = Phaser.Math.RND.between(0, this.beetles.length - 1);
            //Instancia escarabajo   
            this.shootingBeetle = this.physics.add.sprite(this.player.x, this.player.y - 50, this.beetles[texture]).setDepth(3).setScale(1.25);
            //Quitar gravedad 
            this.shootingBeetle.body.setAllowGravity(false);
            // Para que no se salga de los límites del mundo.
            this.shootingBeetle.setBounce(1);
            // Lanza el escarabajo con un ángulo y velocidad.
            this.physics.velocityFromRotation(this.angle, 1000, this.shootingBeetle.body.velocity); 
            
            // --- COLISIONES CON BORDERS ---.
            this.physics.add.collider(borders, this.shootingBeetle);

            // --- COLISIONES LEVEL CON DISPARO ---.
            //this.physics.add.collider(this.shootingBeetle, lvl, colisiona());
            //this.physics.arcade.collide(this.lvl[0][0], this.shootingBeetle, colisiona);
            //console.log(this.lvl[0][0]);
            
            //let overlapea = this.physics.overlap(this.shootingBeetle, this.lvl, colisiona());
            //console.log(overlapea);
            /*let infoCol = []
            for (let i = 0; i < lvl.length; i++){
                row.forEach(element => {
                    //console.log(element.texture.key);
                    if (element.texture.key!= "EmptyBeetle"){
                        let intersection = Phaser.Geom.Intersects.GetRectangleIntersection(this.shootingBeetle, element, infoCol);
                        console.log(intersection);
                        console.log(infoCol);
                    }
      
                });
            }*/

            this.start = true;
        })

       
        function colisiona(){
            console.log("pum");
        }





        function createButton(text, x, y, textColor, fontsize, sceneName) {
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




    }

    //Se añade pero no se une
    addToMatrix(shootingBeetle, element)
    {
        let newBeetle = this.make.image({ // Cannon Base. Aquí habría que poner los siguientes bichos que van a salir
            x: shootingBeetle.x,
            y: shootingBeetle.y, 
            key: shootingBeetle.texture.key,
            scale : {
                x: 1,
                y: 1,
            },
        }).setDepth(1);

        //Creamos el bicho que se va a añadir a la matriz
        
        //newBeetle.texture = shootingBeetle.texture;
        //newBeetle.y = shootingBeetle.y;
        console.log(newBeetle.texture.key);
        //console.log(groupMatrix[0].frameQuantity, groupMatrix[1].frameQuantity);
        //Miramos la posición de la colisión
        //Impar
        if (newBeetle.y % 10 == 0){
            groupMatrix[0].add(newBeetle);
            groupMatrix[0].frameQuantity++;
            //groupImpares.frameQuantity++;
        }
        //Par
        else if(newBeetle.y % 65 == 0){
            groupMatrix[1].add(newBeetle);
            groupMatrix[1].frameQuantity++;
            //groupPares.frameQuantity++;
        }
        //console.log(groupMatrix[0].frameQuantity, groupMatrix[1].frameQuantity);
        //console.log(groupMatrix); //Se está añadiendo, pero no se queda quieto

        //newBeetle.body.setImmovable(true); 
        newBeetle.body.setAllowGravity(false);
    }


    update ()
    {  
        //Una vez que ya ha empezado el juego
        if (this.start) {
            let intersection = Phaser.Geom.Intersects.GetRectangleIntersection(this.shootingBeetle, this.lvl[1][1]);
            //let overlapea = this.physics.overlap(this.shootingBeetle, this.lvl[1][1]);   
            console.log(intersection); 
        }

        //Pone los puntos
        //this.pointUI.setText('Puntos: ' + this.points);
    }

    //'Exit',  925,  700, 'white', 50, 'GameSelectorMenu'
    // --- BOTONES ---.
    createButton(text, x, y, textColor, fontsize, sceneName) {
        let button = this.add.text(
            x,
            y,
            text,
            {
                fontFamily: 'yatra',
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

    // --- DIFICULTAD ---.
    /*setDifficulty() 
    {

        if(this.gameState.currentDay == 1 || this.gameState.currentDay == 2)
        {
            this.beetles.length = 5;
        }
        else if(this.gameState.currentDay == 3 || this.gameState.currentDay == 4)
        {
            this.beetles.length = 6;
        }
        else if(this.gameState.currentDay == 5)
        {
            this.beetles.length = 7;
        }
    }*/

}



/*
Fuentes: 
https://labs.phaser.io/edit.html?src=src\physics\arcade\closest%20furthest.js
https://labs.phaser.io/edit.html?src=src\utils\array\translate%20matrix.js
https://phaser.io/examples/v3.85.0/physics/arcade/view/velocity-from-angle
*/
