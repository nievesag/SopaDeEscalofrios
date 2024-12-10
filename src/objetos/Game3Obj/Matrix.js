// Clase del Matrix del Minijuego 3. 
import Beetle from './Beetle.js';

export default class Matrix extends Phaser.GameObjects.Container
{
  //Constructora del objeto
  constructor (scene, x, y, key)
  {
    super(scene, x, y, { key: "Matrix" }, nColors);

    //Cualidades del nivel
    this.x = 185.5; //Pos en x
    this.y = 10; //Pos en y
    this.width = 0; //Lo calcularemos luego
    this.height = 0; //Lo calcularemos luego
    this.columns = 11; //Total columnas
    this.rows = 15; //Total filas
    this.cellWidth = 55; //Ancho celda
    this.cellHeight = 75; //Alto celda
    this.cells = []; //Matrix bidimensional celdas
    this.EvenRowOffset = 0; //Donde empiezan las filas pares

    //Para mirar vecinos
    let neighborsoffsets = [[[1, 0], [0, 1], [-1, 1], [-1, 0], [-1, -1], [0, -1]], // Even row tiles
    [[1, 0], [1, 1], [0, 1], [-1, 0], [0, -1], [1, -1]]];  // Odd row tiles

    //Para romper grupos
    //var showcluster = false;
    var beetlesGroup = [];
    var savedBeetlesGroup = [];

    //Se añade a escena
    this.scene.add.existing(this);
    this.isDead = false;
  }

  //Destructora del objeto
  destructor ()
  {
    this.destroy();
  }

  createLevel (nColors) {
    if (nColors == 5) //Dia 1 y 2 
    {

    } 
    else if (nColors == 6) //Dia 3 y 4
    {

    }
    else if (nColors == 7) //Día 5
    {

    }
  }


  //Colisiones círculo
  colisions() 
  {
    container.setInteractive(new Phaser.Geom.Circle(0, 0, radius), Phaser.Geom.Circle.Contains);
    // container.setInteractive(false); // disable
  }

  //Visita los escarabajos vecinos
  visitNeighbours()
  {
    return true;
  }

  //Bajará una fila de la matriz. 
  //Requiere de método rellenaMatrix()
  bajaMatrix()
  {

  }

  //Se encarga de poner más escarabajos en la fila superior. 
  //Auxiliar de bajaMatrix()
  rellenaMatrix()
  {

  }

  //Saca un color random para rellenaMatrix()
  randomBeetles()
  {

  }

  //Evalúa si la matríz está vacía. 
  //En caso true, termina el juego
  //En caso falso, sigue el juego
  emptyMatrix()
  {
    
  }

}