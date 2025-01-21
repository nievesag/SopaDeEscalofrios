import Player from '../objetos/Game3Obj/Player3.js';
import Matrix from '../objetos/Game3Obj/Matrix.js';
import ShootingBeetle from '../objetos/Game3Obj/ShootingBeetle.js';
import MatrixBeetle from '../objetos/Game3Obj/MatrixBeetle.js';

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
        this.cameras.main.setBackgroundColor(0x181818);
        // si es la primera vez q se inicia...
        if(!this.gameState.hasStartedBefore[2]){
            this.gameState.hasStartedBefore[2] = true; // ala ya ha salio el tutorial.
            this.createTanqiaPopUp();
        }
        else{ // si ya se ha iniciado anteriormente...
            this.startGame(); // empieza el game directamente.
        }
    }

    createTanqiaPopUp()
    {
        let tanqiaText = this.add.text(
            this.cameras.main.centerX, 
            this.cameras.main.centerY - 100, 
            'Jepri, el dios del sol autocreado, sufre de una fuerte tristeza: sus adorados ahijados, los escarabajos de todo Egipto, han sido capturados.Para contentarle de nuevo, y evitar su ira, deberás rescatar al mayor número de escarabajos posibles, en el menor tiempo posible.',
            {
                fontSize: '20px',
                color: '#ffffff',
                align: 'center',
                fontFamily: 'yatra',
                wordWrap: {width: 500},
                wordWrapUseAdvanced: true,
            }
        ).setOrigin(0.5).setDepth(5); // danzhu lo tenia y funciona.

        let tanqia = this.add.image(
            this.cameras.main.centerX, 
            this.cameras.main.centerY + 175, 
            'Icon3'
        ).setScale(1.5, 1.5).setInteractive().setDepth(4); // x, y, tag.

        tanqia.on('pointerover', () => // Al pasar el ratón por encima...
        {
            tanqia.setTint(0x8a9597);
        });

        tanqia.on('pointerout', () => // Al quitar el ratón de encima...
        {
            tanqia.clearTint();
        });

        tanqia.on('pointerdown', ()=>{
            // Destruye todo y pone el juego a funcionar.
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
            key: 'Tuto3',
        }).setDepth(5);

        let tuto3Text = this.add.text( // diapo 1 text.
            this.cameras.main.width - 30, 
            this.cameras.main.scrollY + 30, 
            'X',
            {
                fontSize: '40px',
                color: '#181818',
                align: 'center',
                fontFamily: 'yatra',
            }
        ).setOrigin(0.5).setInteractive().setDepth(6);

        tuto3Text.on('pointerdown', ()=>{
            // Destruye todo y pone el juego a funcionarch.
            tutoImage.destroy();
            tuto3Text.destroy();
            this.startGame();
        });

        tuto3Text.on('pointerover', () => // Al pasar el ratón por encima...
        {
            tuto3Text.setColor('#0032c3');
        });

        tuto3Text.on('pointerout', () => // Al quitar el ratón de encima...
        {
            tuto3Text.setColor('#181818');
        });
    }

    startGame()
    {
        // --- TIEMPO ---.
        this.shootTime = 10;
        this.timeUI = this.add.text(
        30, 
        50,
        'Tiempo\n10',
        {
            fontSize: 40,
            color: 'white',
            fontFamily: 'yatra'
        }).setDepth(3).setVisible(true);

        // --- OBJETIVO ---.
        this.victory = 2000;
        this.goalUI = this.add.text(
        835, 
        50,
        'Objetivo\n0',
        {
            fontSize: 40,
            color: 'white',
            fontFamily: 'yatra'
        }).setDepth(3).setVisible(true);

        // --- PUNTUACIÓN ---.
        this.points = 0;
        this.pointUI = this.add.text(
        835, 
        200,
        'Puntos\n0',
        {
            fontSize: 40,
            color: 'white',
            fontFamily: 'yatra'
        }).setDepth(3).setVisible(true);

        //Desactiva el click al principio
        //Evita que se lance el primer beetle al quitar el tutorial
        this.input.mouse.enabled = false;
        // durante 100 milisegs bloquea el input.
        this.time.delayedCall(100, ()=>{
            this.input.mouse.enabled = true;
        })

        // --- TIME SOUND ---.
        this.beep = this.sound.add('beep');
        // Encendemos el pitidito
        this.beep.play();
        //Cronómetro del lanzamiento
        this.updateTime();
    
        // --- BACKGROUND ---.
        this.add.image(this.cameras.main.centerX, this.cameras.main.centerY, 'bg3')
        .setOrigin(0.5, 0.5)
        .setDisplaySize(this.cameras.main.width, this.cameras.main.height); 

        // --- BORDERS ---.
        this.borderLeft = this.add.rectangle(92, 385, 200, 775, 0x181818, 10);
        this.borderRight = this.add.rectangle(925, 385, 230, 775, 0x181818, 10);
        this.borderUp = this.add.rectangle(550, 5, 1100, 10, 0x181818, 10);
        this.borderDown = this.add.rectangle(550, 765, 1100, 10, 0x181818, 10);
        this.borders = [this.borderLeft, this.borderRight, this.borderUp, this.borderDown];
        // Fisicas para bordes
        for (let i = 0; i < this.borders.length; i++){
            this.physics.world.enable(this.borders[i]);
            this.borders[i].body.setImmovable(true); // El suelo no se moverá
            this.borders[i].body.setAllowGravity(false); // No tendrá gravedad
        }
        //Línea GameOver
        const gameOverLine = this.add.rectangle(550, 630, 1100, 0.5, 0x181818, 1);

        // --- PLAYER ---.
        this.player = new Player(this, 500, 775);
        // Línea de input
        const graphics = this.add.graphics({ lineStyle: { width: 10, color: 0xffffff , alpha: 0.5 } });
        const line = new Phaser.Geom.Line(); 

        // --- SHOOTING BEETLE ---.   
        this.shootingBeetle = new ShootingBeetle(this, this.player.x, this.player.y - 28).setDepth(5).setScale(1.25);

        // --- GRID DE BEETLE ---.
        this.level = new Matrix(this, 220, 40);
        //La dificultad
        this.setDifficulty();
        //Creamos el nivel en base a esos parámetros
        this.createLevel();
        //Ponemos el texto del objetivo
        this.goalUI.setText('Objetivo\n' + this.victory)

        // --- GESTION VECINOS ---
        //Creamos un array de visitados
        this.visitados = [];
        //Iniciamos los índices en 0
        this.final = 0;
        this.pendientes = 0;

        // --- GESTION SUELTOS ---
        //Creamos un arrays de posibles sueltos
        this.posiblesSueltos = [];
        //Iniciamos los índices en 0
        this.finSueltos = 0;
        this.pendSueltos = 0;
        
        // --- COLISIONES SHOOTING BEETLE - BEETLES DE LA MATRIZ ---
        this.colisionesShootingBeetleLevel();
        
        // --- INPUT ---.
        // SIGUE AL MOUSE.
        this.input.on('pointermove', (pointer) =>
        {
            //Sigue el ratón en función del puntero
            this.followMouse(pointer);
            // Línea de lanzamiento 
            Phaser.Geom.Line.SetToAngle(line, this.player.x, this.player.y, (this.player.rotation - 1.57), 200); 
            graphics.clear().strokeLineShape(line); // Limpia y redibuja la línea.
        });
        // AL HACER CLIC. DISPARO
        this.input.on('pointerup', () =>
        {
            //Paramos el pitidito
            this.beep.stop();
            //Bloquea el input para que no se pueda mover el beetle en el aire
            this.input.mouse.enabled = false;
            //Disparamos
            this.player.shoot(this.shootingBeetle);
            // --- COLISIONES CON BORDERS ---.
            this.physics.add.collider(this.borders, this.shootingBeetle);
            //Reseteamos el tiempo de disparo
            this.shootTime = 11; 
            //Bloquea el disparo porque ya hay uno disparado
            this.level.freeBeetle = true;
        })

    }

    //Metodo para gestionar el temporizador de disparo
    updateTime(){ 
        const updateTimer = () => {
            //Si no se ha disparado, va decreciendo
            if (this.shootTime > 0 && !this.level.freeBeetle){
                this.shootTime -= 1; 
                this.timeUI.setText('Tiempo\n' + this.shootTime);
            }
            //Si llega a cero, realiza un disparo automático y se resetea
            else if (this.shootTime == 0) { 
                // Paramos el pitido
                this.beep.stop();
                // Dispara
                this.player.shoot(this.shootingBeetle);
                // --- COLISIONES CON BORDERS ---.
                this.physics.add.collider(this.borders, this.shootingBeetle);
                this.level.freeBeetle = true;
                this.shootTime = 10;
            } 

        };

        // temporizador
        this.time.addEvent({
            delay: 1000,
            loop: true,
            callback: updateTimer,
            callbackScope: this
        });

    }

    //Metodo que añade posibilidad de colision entre el ShootingBeetle
    //y cada uno de los MatrixBeetles de la matriz Level
    colisionesShootingBeetleLevel()
    {
        for (let j = 0; j < this.level.fils; j++)
        {
            for (let i = 0; i < this.level.cols; i++) 
            {
                //Si no es vacío, habrá colisión
                if (this.level.lvl[j][i].texture.key != "EmptyBeetle")
                {
                    //Si hay colisión, llama al metodo addToMatrix()
                    this.physics.add.collider(this.level.lvl[j][i], this.shootingBeetle, null, this.addToMatrix, this);
                }
            }
        }
    }

    //Metodo para definir la rotacion del player segun el puntero del mouse
    followMouse(pointer)
    {
        //Define el ángulo entre el punto del player y el puntero
        this.player.angle = Phaser.Math.Angle.BetweenPoints(this.player, pointer);
        // Pone la rotación del player mirando al puntero en radianes
        this.player.rotation = this.player.angle + 1.5708;
    }

    //Gestiona la dificultad del nivel segun el dia en el juego. 
    //Modifica la cantidad de filas iniciales del nivel y el objetivo a alcanzar
    setDifficulty() 
    {
        //Muestra el temporizador del disparo
        this.timeUI.setVisible(true);
        //Muestra el marcador de puntos
        this.pointUI.setVisible(true);
        //Muestra el marcador de objetivo
        this.goalUI.setVisible(true);

        if(this.gameState.currentDay == 1)
        {
            this.victory = 3000;
            this.level.filIni = 3;
        }
        else if (this.gameState.currentDay == 2)
        {
            this.victory = 4000;
            this.level.filIni = 4;
        }
        else if(this.gameState.currentDay == 3)
        {
            this.victory = 5000;
            this.level.filIni = 5;
        }
        else if(this.gameState.currentDay == 4)
        {
            this.victory = 5500;
            this.level.filIni = 6;
        }
        else if(this.gameState.currentDay == 5)
        {
            this.victory = 6000;
            this.level.filIni = 7;
        }
    }

    //Metodo para crear la matriz del nivel en cuestion de la dificultad
    createLevel(){
        for (let j = 0; j <  this.level.fils; j++){
            this.level.lvl[j] = []; 
            //En las filas impares
            if (j % 2 == 1)
            {
                //Añadimos un offset
                this.level.x += this.level.width / 2;
            }
            for (let i = 0; i < this.level.cols; i++)
            {
                //Color random
                if (j < this.level.filIni)
                {
                    this.level.lvl[j][i] = new MatrixBeetle(this, this.level.x + this.level.width * i,  this.level.y, i, j).setScale(1.25);
                }
                //Color Empty
                else 
                {
                    this.level.lvl[j][i] = new MatrixBeetle(this, this.level.x + this.level.width * i,  this.level.y, i , j).setScale(1.25);
                    this.level.lvl[j][i].setTexture("EmptyBeetle");
                }
            }

            //Reseteamos la x y modificamos la y a la siguiente fila
            this.level.x = 220;
            this.level.y += this.level.height;
        }
    }

    //Cuando un shootingBeetle colsiona con un MatrixBeetle de la matriz level, lo añade a la matriz
    addToMatrix(level, shootingBeetle)
    {
        //Fila en la que toca anadirlo 
        let j = 0;
        //Arriba
        if (shootingBeetle.y < level.y - this.level.height/2)
        {
            j = level.j - 1;
            //Forzamos por el límite superior
            if (j < 0) j = 0;
        }
        //Abajo
        else if (shootingBeetle.y > level.y + this.level.height/2)
        {
            j = level.j + 1;
            //Aquí no hay límite inferior, porque es la derrota
        }
        //Misma
        else
        {
            j = level.j;
        }

        //Columna en la que toca anadirlo
        let i = 0;
        //Impares
        if (j % 2 == 1){
            if (shootingBeetle.x > level.x)
            {
                i = level.i;
            }
            else 
            {
                i = level.i - 1;
                //Forzamos por el límite izquierdo
                if (i < 0) i = 0;
            }
        }
        //Pares
        else{
            if (shootingBeetle.x > level.x)
                {
                    i = level.i + 1;
                    //Forzamos por el límite derecho
                    if (i>12) i = 12;
                }
                else 
                {
                    i = level.i;
                }
        }

        //Si llega al límite por abajo
        if (j == this.level.fils)
        {
            //Derrota
            this.endGame(false);
        }
        else 
        {
            //Si el hueco está vacío
            if (this.level.lvl[j][i].texture.key == "EmptyBeetle") 
            {    
                //Destruye lo que había antes
                this.level.lvl[j][i].selfDestroy();
                //Añade otro sprite 
                this.level.lvl[j][i] = new MatrixBeetle(this, this.level.lvl[j][i].x, this.level.lvl[j][i].y, i, j).setScale(1.25);
                this.level.lvl[j][i].setTexture(this.shootingBeetle.texture);
                //Destruimos el lanzado
                this.shootingBeetle.selfDestroy();
                //Ya no hay beetle suelto
                this.level.freeBeetle = false;
                //Volvemos a activar el input
                this.input.mouse.enabled = true;
                //Creamos el siguiente beetle  
                this.shootingBeetle = new ShootingBeetle(this, this.player.x, this.player.y - 28).setDepth(5).setScale(1.25);
                //Reseteamos los coliders para el nuevo shooting beetle
                this.colisionesShootingBeetleLevel();
                //Destruimos vecinos del mismo color, y como consecuencia, los posibles sueltos
                this.processNeighbours(this.level.lvl[j][i]);
            }
        }

    }

    // --- METODOS PARA VECINOS ---
    // Determina si el beetle está en la estructura de beetles visitados
    visitedNeighbour(beetle)
    {
        //Damos por hecho que inicialmente no se ha visitado
        let visitado = false;

        //Buscamos pos en el array de posiciones visitadas
        let i = 0;
        //Buscará hasta que llegue al final del array o encuentre el beetle
        while (i < this.final && this.visitados[i] != beetle)
        { 
            i++;
        }

        //Si coinciden ambas coordenadas de la posicion
        if (this.visitados[i] == beetle)
        {
            //Significara que dicha posición se ha visitado
            visitado = true;
        }
        //Si no, seguirá como al principio

        //Devolvemos visitado
        return visitado;
    }

    //Añade al array visitados las posiciones adyacentes al beetle actual que aun no han sido visitadas
    addNeighbours(beetle){
        let j = beetle.j;
        let i = beetle.i;

        //Miraremos si han sido visitados los vecinos adyacentes, y si no lo han sido, se añadirán al array para procesarlos
        //Fila impar
        if (j % 2 == 1)
        {
            //Arriba-Dcha
            if ((j-1) >= 0 && (i+1) < this.level.cols 
            && !this.visitedNeighbour(this.level.lvl[j-1][i + 1])
            && this.level.lvl[j-1][i + 1].texture.key != "EmptyBeetle") 
            {    
                this.visitados.push(this.level.lvl[j-1][i + 1]);
                //Se aumenta el índice de fin
                this.final++;
            }

            //Abajo-Dcha
            if ((j+1) < this.level.fils && (i+1) < this.level.cols 
            && !this.visitedNeighbour(this.level.lvl[j+ 1][i + 1])
            && this.level.lvl[j+ 1][i + 1].texture.key != "EmptyBeetle") 
            {    
                this.visitados.push(this.level.lvl[j+ 1][i + 1]);
                //Se aumenta el índice de fin
                this.final++;
            }
        }
        //Fila par
        else
        {
            //Arriba-Izqd
            if ((j-1) >= 0 && (i-1) >= 0 
            && !this.visitedNeighbour(this.level.lvl[j-1][i - 1])
            && this.level.lvl[j-1][i - 1].texture.key != "EmptyBeetle") 
            {    
                this.visitados.push(this.level.lvl[j-1][i - 1]);
                //Se aumenta el índice de fin
                this.final++;
            }
            //Abajo-Izqd
            if ((j+1) < this.level.fils && (i-1) >= 0 
            && !this.visitedNeighbour(this.level.lvl[j+1][i - 1])
            && this.level.lvl[j+1][i - 1].texture.key != "EmptyBeetle" )
            {    
                this.visitados.push(this.level.lvl[j+1][i - 1]);
                //Se aumenta el índice de fin
                this.final++;
            }
        }

        //Arriba
        if ((j-1) >= 0 && !this.visitedNeighbour(this.level.lvl[j-1][i])
        && this.level.lvl[j-1][i].texture.key != "EmptyBeetle" )
        {    
            this.visitados.push(this.level.lvl[j-1][i]);
            //Se aumenta el índice de fin
            this.final++;
        } 
        //Abajo
        if ((j+1) < this.levelfils && !this.visitedNeighbour(this.level.lvl[j+1][i])
        && this.level.lvl[j+1][i].texture.key!= "EmptyBeetle") 
        {    
            this.visitados.push(this.level.lvl[j+1][i]);
            //Se aumenta el índice de fin
            this.final++;
        } 
        //Dcha
        if ((i+1) < this.level.cols && !this.visitedNeighbour(this.level.lvl[j][i+1])
        && this.level.lvl[j][i+1].texture.key != "EmptyBeetle") 
        {    
            this.visitados.push(this.level.lvl[j][i+1]);
            //Se aumenta el índice de fin
            this.final++;
        } 
        //Izqd
        if ((i-1) >= 0 && !this.visitedNeighbour(this.level.lvl[j][i-1])
        && this.level.lvl[j][i-1].texture.key != "EmptyBeetle")
        {    
            this.visitados.push(this.level.lvl[j][i-1]);
            //Se aumenta el índice de fin
            this.final++;
        }
    }

    //Algoritmo de propagación de los vecinos de color
    processNeighbours(beetle){
   
        //Array de beetles a destruir
        let destroyArray = [];
        
        //Añadimos el beetle actual al array
        this.visitados.push(beetle);
        //Y se le añadirá también al de para destruir
        destroyArray.push(beetle);
        //Se aumenta el índice de fin y de pendientes, porque la casilla de referencia ya está procesada
        this.final++;
        this.pendientes++;
      
        //Analizamos las adyacentes
        this.addNeighbours(beetle);
      
        //Mientras que queden pendientes por procesar
        while (this.pendientes < this.final && this.final <= (this.level.cols * this.level.fils))
        {
            //Actualizamos el beetle referencia
            let beetleVecino = this.visitados[this.pendientes];

            //Si el beetle vecino tiene el color del que lanzamos
            if (beetleVecino.texture.key == beetle.texture.key)
            {
                //se le añadirá también al de para destruir
                destroyArray.push(beetleVecino);
                //Anadimos a pendientes a sus vecinos
                this.addNeighbours(beetleVecino);
            }
      
            //Y el beetle nuevo queda procesado
            this.pendientes++;
        }

        //Si hay 3 o mas vecinos de ese color, los destruye
        if (destroyArray.length >= 3)
        {
            for (let i = destroyArray.length - 1; i >= 0; i--){
                //Suma puntos
                this.points += 100;
                this.pointUI.setText('Puntos\n' + this.points);
                //Cambiamos la textura
                destroyArray[i].setTexture("EmptyBeetle");
                //Lo eliminamos
                destroyArray[i].selfDestroy();
                //Lo sacamos del array
                destroyArray.pop(); 
            }

            //Procesamos la matriz, en busca de los que hayan podido quedar sueltos para destruirlos
            //Partimos de la fila 1, ya que los de la fila 0 sabemos que no están sueltos
            //Solo miraremos donde haya beetle. Si no lo hay no puede estar suelto
            for (let j = 1; j <  this.level.fils; j++)
            {
                for(let i = 0; i <this.level.cols; i++)
                {
                    if (this.level.lvl[j][i].texture.key != "EmptyBeetle")
                    {
                        //Destruimos los que hayan podido quedar sueltos
                        this.processSueltos(this.level.lvl[j][i]);
                    }
                }
            }
        }

        //Reiniciamos los arrays y reseteamos los valores
        else
        {
            for (let i = destroyArray.length - 1; i >= 0; i--){
                //Lo sacamos del array
                destroyArray.pop(); 
            }
        }

        for (let i = this.visitados.length - 1; i >= 0; i--){
            //Lo sacamos del array
            this.visitados.pop(); 
        }

        this.final = 0;
        this.pendientes = 0;

        //Reinicia el sonido del pitidito
        this.beep.play();

        //Si se ha llegado a los puntos objetivos, habremos ganado
        if (this.points >= this.victory){
            //Victoria
            this.endGame(true);
        }

    }

    // --- METODOS PARA SUELTOS --- 
    //Son distintos a los de los vecinos, para evitar reutilizar variables, para evitar errores

    // Determina si el beetle está en la estructura de beetles visitados
    visitedSueltos(beetle)
    {
        //Damos por hecho que inicialmente no se ha visitado
        let visitado = false;

        //Buscamos pos en el array de posiciones visitadas
        let i = 0;
        //Buscará hasta que llegue al final del array o encuentre el beetle
        while (i < this.finSueltos && this.posiblesSueltos[i] != beetle)
        { 
            i++;
        }

        //Si coinciden ambas coordenadas de la posicion
        if (this.posiblesSueltos[i] == beetle)
        {
            //Significara que dicha posición se ha visitado
            visitado = true;
        }
        //Si no, seguirá como al principio

        //Devolvemos visitado
        return visitado;
    }

    //Añade al array visitados las posiciones adyacentes al beetle actual que aun no han sido visitadas
    addSueltos(beetle){
        let j = beetle.j;
        let i = beetle.i;

        //Miraremos si han sido visitados los vecinos adyacentes, y si no lo han sido, se añadirán al array para procesarlos
        //Fila impar
        if (j % 2 == 1)
        {
            //Arriba-Dcha
            if ((j-1) >= 0 && (i+1) < this.level.cols 
            && !this.visitedSueltos(this.level.lvl[j-1][i + 1])
            && this.level.lvl[j-1][i + 1].texture.key != "EmptyBeetle") 
            {    
                this.posiblesSueltos.push(this.level.lvl[j-1][i + 1]);
                //Se aumenta el índice de fin
                this.finSueltos++;
            }

            //Abajo-Dcha
            if ((j+1) < this.level.fils && (i+1) < this.level.cols 
            && !this.visitedSueltos(this.level.lvl[j+ 1][i + 1])
            && this.level.lvl[j+ 1][i + 1].texture.key != "EmptyBeetle") 
            {    
                this.posiblesSueltos.push(this.level.lvl[j+ 1][i + 1]);
                //Se aumenta el índice de fin
                this.finSueltos++;
            }
        }
        //Fila par
        else
        {
            //Arriba-Izqd
            if ((j-1) >= 0 && (i-1) >= 0 
            && !this.visitedSueltos(this.level.lvl[j-1][i - 1])
            && this.level.lvl[j-1][i - 1].texture.key != "EmptyBeetle") 
            {    
                this.posiblesSueltos.push(this.level.lvl[j-1][i - 1]);
                //Se aumenta el índice de fin
                this.finSueltos++;
            }
            //Abajo-Izqd
            if ((j+1) < this.level.fils && (i-1) >= 0 
            && !this.visitedSueltos(this.level.lvl[j+1][i - 1])
            && this.level.lvl[j+1][i - 1].texture.key != "EmptyBeetle" )
            {    
                this.posiblesSueltos.push(this.level.lvl[j+1][i - 1]);
                //Se aumenta el índice de fin
                this.finSueltos++;
            }
        }

        //Arriba
        if ((j-1) >= 0 && !this.visitedSueltos(this.level.lvl[j-1][i])
        && this.level.lvl[j-1][i].texture.key != "EmptyBeetle" )
        {    
            this.posiblesSueltos.push(this.level.lvl[j-1][i]);
            //Se aumenta el índice de fin
            this.finSueltos++;
        } 
        //Abajo
        if ((j+1) < this.levelfils && !this.visitedSueltos(this.level.lvl[j+1][i])
        && this.level.lvl[j+1][i].texture.key!= "EmptyBeetle") 
        {    
            this.posiblesSueltos.push(this.level.lvl[j+1][i]);
            //Se aumenta el índice de fin
            this.finSueltos++;
        } 
        //Dcha
        if ((i+1) < this.level.cols && !this.visitedSueltos(this.level.lvl[j][i+1])
        && this.level.lvl[j][i+1].texture.key != "EmptyBeetle") 
        {    
            this.posiblesSueltos.push(this.level.lvl[j][i+1]);
            //Se aumenta el índice de fin
            this.finSueltos++;
        } 
        //Izqd
        if ((i-1) >= 0 && !this.visitedSueltos(this.level.lvl[j][i-1])
        && this.level.lvl[j][i-1].texture.key != "EmptyBeetle")
        {    
            this.posiblesSueltos.push(this.level.lvl[j][i-1]);
            //Se aumenta el índice de fin
            this.finSueltos++;
        }
    }

    //Algoritmo de propagación de los sueltos
    processSueltos(bettleSuelto){
        //Añadimos el beetle actual al array
        this.posiblesSueltos.push(bettleSuelto);
        //Se aumenta el índice de fin y de pendientes, porque la casilla de referencia ya está procesada
        this.finSueltos++;
        this.pendSueltos++;

        //Analizamos las adyacentes
        this.addSueltos(bettleSuelto);

        //Mientras que queden pendientes por procesar
        while (this.pendSueltos < this.finSueltos && this.finSueltos <= (this.level.cols * this.level.fils))
        {
            //Actualizamos el beetle referencia
            let beetleVecinoSuelto = this.posiblesSueltos[this.pendSueltos];
            //Anadimos a pendientes a sus vecinos
            this.addSueltos(beetleVecinoSuelto);
            //Y el beetle nuevo queda procesado
            this.pendSueltos++;    
        }

        //Recorremos posiblesSueltos en busca de algunos que esté en la fila j = 0. 
        //En ese caso, no son sueltos, y no se destruyen. En el caso contrario, se destruyen.
        let k = 0;
        //En un principio destruyo todo
        let destruir = true;
        while(k < this.posiblesSueltos.length && destruir)
        {
            //Si está en la fila 0 no hay nada que destruir
            if (this.posiblesSueltos[k].j == 0)
            {
                destruir = false;
            }
            k++;
        }

        //Se destruyen los sueltos
        if (destruir && this.posiblesSueltos.length>0)
        {
            for (let i = this.posiblesSueltos.length - 1; i >= 0; i--){
                //Suma puntos (la mitad, porque han sido liberados sin combinacion de color)
                this.points += 50;
                this.pointUI.setText('Puntos\n' + this.points);
                //Cambiamos la textura
                this.posiblesSueltos[i].setTexture("EmptyBeetle");
                //Lo destruimos
                this.posiblesSueltos[i].selfDestroy();
            }
        }

        //Lo vacíamos al final
        for (let i = this.posiblesSueltos.length - 1; i >= 0; i--){
            //Lo sacamos del array
            this.posiblesSueltos.pop(); 
        }

        //Reseteamos los valores
        this.finSueltos = 0;
        this.pendSueltos = 0;
    }

    //Gestiona el final de juego según si finish = false (derrota) o = true (victoria)
    endGame(finish){
        //Vuelve a activar el input
        this.input.mouse.enabled = true;
        let result; 
        let mode = -1;
        //Victoria, alcanzar this.victory puntos
        if (finish){
            alert('Has obtenido el logro ' + this.gameState.logros.Game3[this.gameState.currentDay - 1] + ' por enviarle una carta a Jepri el día ' + this.gameState.currentDay);
            result = 'victoria';
            mode = 0;
        }
        //Derrota si hay en la fila final 
        else {
            result = 'derrota';
            mode = 1;
        }

        //Logro
        if (result) {
            const currentDayIndex = this.gameState.currentDay - 1; 
            this.gameState.minigamesResults.Game3[currentDayIndex] = result;
        }

        // Final de nivel 
        if (mode != -1)
        {
            this.scene.start('EndLevel', {mode: mode});
        }
    }
}
