//Importamos los objetos en escena
import Player3 from '../objetos/Game3Obj/Player3.js';
import Beetle from '../objetos/Game3Obj/Beetle.js';
import Matrix from '../objetos/Game3Obj/Matrix.js';
import Time from '../objetos/Game3Obj/Time.js';

export default class Game3 extends Phaser.Scene {
   
    constructor() {
        super({ key: 'Game3'});

        //Colores de los bichos
        const COLOR = {
            RED: 'RED',
            ORANGE: 'ORANGE',
            YELLOW: 'YELLOW',
            GREEN: 'GREEN',
            CIAN: 'CIAN',
            BLUE: 'BLUE',
            PURPLE: 'PURPLE',
            BLACK: 'BLACK',
        } //Se accede como color.RED...
    }
    
    preload () {

        //Player (place holder)
        this.load.image('cannonBase', './assets/images/icon500.jpg');
        this.load.image('cannonDisparo', './assets/images/Burbujas.png');
        //Munición 
        this.load.image('RedBeetle', './assets/images/BurbujaRoja.png')
        this.load.image('OrangeBeetle', './assets/images/BurbujaNaranja.png')
        this.load.image('YellowBeetle', './assets/images/BurbujaAmarilla.png')
        this.load.image('GreenBeetle', './assets/images/BurbujaVerde.png')
        this.load.image('CianBeetle', './assets/images/BurbujaCian.png')
        this.load.image('BlueBeetle', './assets/images/BurbujaAzul.png')
        this.load.image('PurpleBeetle', './assets/images/BurbujaMorada.png')
        this.load.spritesheet('beetles', './assets/images/Burbujas.png', { frameWidth: 55, frameHeight: 53 });

        // Música.
        this.load.audio('theme3', './assets/audio/m3c.mp3');
    }
    
    // https://phaser.io/examples/v3.85.0/physics/arcade/view/velocity-from-angle

    create (){


        // Música.
        //const music = this.sound.add('theme3');
        //music.play();
        //this.sound.pauseOnBlur = true;


     
        // --- BOTON VOLVER A MAIN MENU ---
        this.createButton('MainMenu',  925,  700, 'white');

        // --- TIMER ---
        //let timer = this.add.text(10, 30, { font: '16px Courier', fill: '#00FF00' });

        // --- BASE BG ---.
        //const baseBG = this.add.rectangle(502, 385, 600, 760, 0xd0be49).setStrokeStyle(10, 0xffffff);

        // --- INTERFACE ---.
        //let nextShootingBeetle = this.add.text(10, 30, { font: '16px Courier', fill: '#00FF00' });

        // --- BORDERS ---.
        const borderLeft = this.add.rectangle(90, 385, 200, 775, 0xffffff, 100);
        const borderRight = this.add.rectangle(930, 385, 230, 775, 0xffffff, 100);
        const borderUp = this.add.rectangle(550, 5, 1100, 10, 0xffffff, 100);
        const borderDown = this.add.rectangle(550, 765, 1100, 10, 0xffffff, 100);
        const borders = [borderLeft, borderRight, borderUp, borderDown];

        for (let i = 0; i < borders.length; i++){
            this.physics.world.enable(borders[i]);
            borders[i].body.setImmovable(true); // El suelo no se moverá
            borders[i].body.setAllowGravity(false); // No tendrá gravedad
            //console.log(borders[i]);
        }

        // --- CANNON ---.
        const cannonBase = this.make.image({ // Cannon Base. Aquí habría que poner los siguientes bichos que van a salir
            x: 500,
            y: 800, 
            key: 'cannonBase',
            scale : {
                x: 0.25,
                y: 0.25
            },
        }).setDepth(1);

        const cannonDisparo = this.make.image({ // Cannon Head.
            x: 500,
            y: 730, 
            angle: 90,
            key: 'cannonDisparo',

            scale : {
                x: 0.3,
                y: 0.3,
            },
        }).setDepth(2);

        // --- SHOOTABLES ---. 
        let beetles = ['RedBeetle', 'OrangeBeetle', 'YellowBeetle', 'GreenBeetle', 'CianBeetle', 'BlueBeetle', 'PurpleBeetle'];
        //El que vamos a disparar
        let shootingBeetle;

        // Dibuja la línea de la dir DE LANZAMIENTO
        const graphics = this.add.graphics({ lineStyle: { width: 10, color: 0x6714d8 , alpha: 0.5 } });
        const line = new Phaser.Geom.Line(); 

        let angle = 0; // Inicializa el ángulo a 0.

        // --- GRID DE BICHOS ---.
        this.groupImpares = this.physics.add.group({
            runChildUpdate: true
        });

        // Create multiple beetles and add them to the group
        this.beetlesImpares = this.groupImpares.createMultiple({
            key: 'beetles',
            frame: [0, 1, 2, 3, 4, 5, 6],
            quantity: 11,
            setXY: { x: 185.5, y: 10 },
            randomKey: true
        });

        // Align the beetles in a grid
        Phaser.Actions.GridAlign(this.beetlesImpares, {
            width: 11, // Columns
            height: 3, // Rows
            cellWidth: 55,
            cellHeight: 75,
            x: 185.5,
            y: 10,
        });

        // Repeat for groupPares
        this.groupPares = this.physics.add.group({
            runChildUpdate: true
            
        });

        this.beetlesPares = this.groupPares.createMultiple({
            key: 'beetles',
            frame: [0, 1, 2, 3, 4, 5, 6],
            quantity: 11,
            setXY: { x: 212, y: 47.5 },
            randomKey: true
        });

        Phaser.Actions.GridAlign(this.beetlesPares, {
            width: 11, // Columns
            height: 3, // Rows
            cellWidth: 55,
            cellHeight: 75,
            x: 212,
            y: 47.5,
        });
;
        //Lo agrupamos en un solo array
        let groupMatrix = [];
        groupMatrix.push(this.physics.add.groupImpares); // Group for odd rows
        groupMatrix.push(this.physics.add.groupPares); // Group for even rows


        console.log("Antes de rellenar" + groupMatrix[0] + groupMatrix[1]);


        groupMatrix.forEach((group, index) => {
            console.log('Grupo', index, 'tiene', group.getChildren().length, 'bichos');
        
            // Acceder a cada bicho dentro de este grupo
            group.getChildren().forEach((beetle, i) => {
                console.log(`Bicho ${i} del grupo ${index}:`, beetle);
        
                // Puedes modificar las propiedades de cada bicho, como su posición o animaciones
                beetle.body.setImmovable(true); // El suelo no se moverá
                beetle.body.setAllowGravity(false); // No tendrá gravedad
                //beetle.setVelocity(100, 0); // Por ejemplo, ponerle una velocidad
            });
        });
        
        console.log("Después de rellenar" + groupMatrix[0] + groupMatrix[1]);

        //Metemos físicas
        for (let i = 0; i < groupMatrix.length; i++){
            groupMatrix[i].getChildren().forEach(element => {
             
            this.physics.world.enable(element);
            //elememnt.setCircle(10);
            element.body.setImmovable(true); 
            element.body.setAllowGravity(false);
            
            //console.log(element);
            
            })
            //console.log(i);
        }


        // --- INPUT ---.
        // SIGUE AL MOUSE.
        this.input.on('pointermove', (pointer) =>
            {
                angle = Phaser.Math.Angle.BetweenPoints(cannonBase, pointer); // Ángulo cañón -> mouse.
                cannonDisparo.rotation = angle; // Pone la rotación del cañón mirando al mouse (con unos ajustes).

                // Línea gráfica de la dir.
                Phaser.Geom.Line.SetToAngle(line, cannonDisparo.x, cannonDisparo.y, angle, 128); 
                graphics.clear().strokeLineShape(line); // Limpia y redibuja la línea.

            });

        // AL HACER CLIC. DISPARO
        this.input.on('pointerup', () =>
        {
            //Randomizamos el color;
            const randomBeetle = Phaser.Math.RND.between(0, beetles.length - 1);
            //console.log(randomBeetle);
            shootingBeetle = this.physics.add.image(cannonDisparo.x, cannonDisparo.y, beetles[randomBeetle]).setScale(1); //Instancia el escarabajo             
            //console.log(beetles[randomBeetle].texture);
            console.log(shootingBeetle.texture.key);
            //Le metemos físicas
            //this.physics.world.enable(shootingBeetle);
            shootingBeetle.setCircle(22.5); //Collider circular
            // Para que no se salga de los límites del mundo.
            shootingBeetle.setBounce(1).setCollideWorldBounds(true);

            shootingBeetle.enableBody(true, cannonDisparo.x, cannonDisparo.y, true, true); // Activa la vessel y la pone donde cannonHead.

            this.physics.velocityFromRotation(angle, 1000, shootingBeetle.body.velocity); // Lanza el escarabajo con un ángulo y velocidad.
        

            // --- COLISIONES CON BORDERS ---.
            this.physics.add.collider(borders, shootingBeetle);

            // --- COLISIONES MATRIX - DISPARO ---.
            for (let i = 0; i < groupMatrix.length; i++){
                groupMatrix[i].getChildren().forEach(element => {
                //Hacemos que se llame a la función cuando se choque el escarabajo con la matriz


                this.physics.add.collider(shootingBeetle, element);
                //this.physics.add.collider(shootingBeetle, element, this.addToMatrix(shootingBeetle, element));

                //console.log(shootingBeetle);
                //console.log(element);

            })
        }
                
        });
    
    }

    //Se añade pero no se une
    addToMatrix(shootingBeetle, element){

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


    update (){
        //console.log(timer);
        //this.timer.setText(`time: ${time.ToString()}`);
    }

    createButton(text, x, y, textColor) {
        let button = this.add.text(
           x,
           y,
            text,
            {
                fontFamily: 'arabic',
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
            button.setTint(0xdfa919);
            //button.fontSize = '70px';
        });
    
        button.on('pointerout', () => // Al quitar el ratón de encima...
        {
            button.clearTint();
            //button.fontSize = '50px';
        });
    }
}


/*
Fuentes: 
https://labs.phaser.io/edit.html?src=src\physics\arcade\closest%20furthest.js
https://labs.phaser.io/edit.html?src=src\utils\array\translate%20matrix.js


*/
            