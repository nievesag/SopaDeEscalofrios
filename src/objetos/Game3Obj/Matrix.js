import Game3 from '../../scenes/Game3.js';
import Beetle from './Beetle.js';

export default class Matrix extends Phaser.GameObjects.Container
{
  //Constructora del objeto
  constructor (scene, x, y)
  {
    super(scene, x, y);

    this.scene = scene;
    this.scene.add.existing(this);
    //Cualidades del nivel
    this.x = x; 
    this.y = y;
    this.columns = 11; //Total columnas
    this.rows = 15; //Total filas
    this.cellWidth = 55; //Ancho celda
    this.cellHeight = 75; //Alto celda
    this.cells = []; //Matrix bidimensional celdas
    this.EvenRowOffset = 0; //Donde empiezan las filas pares
    this.width = this.columns * this.cellWidth + this.cellWidth / 2; //Ancho
    this.height = this.rows * this.cellHeight + this.cellHeight; //Alto

    this.key = 'beetles';
    this.frame = [ 0,1,2,3,4,5,6 ];
    this.randomKey = true;
    
    //Para mirar vecinos
    // dcha, arriba-dcha, arriba-izqd, izqd, abajo-izqd, abajo-dcha
    let neighborsoffsets = [[1, 0], [0, 1], [-1, 1], [-1, 0], [0, -1], [1, -1]]; 

    //Para romper grupos
    let showGroups = false;
    let beetlesGroup = [];
    let savedBeetlesGroup = [];
    
    this.possiblebeetles = ['RedBeetle', 'OrangeBeetle', 'YellowBeetle', 'GreenBeetle', 'CianBeetle', 'BlueBeetle', 'PurpleBeetle'];

    this.isDead = false;

  }

  //Destructora del objeto
  destructor ()
  {
    this.destroy();
  }

  // Creamos la matriz del nivel, con bichos randoms (es un cuadrado, pero lo vamos a tumbar)
  createLevel () {
    // Inicializa con escarabajos random
    for (let j = 0; j < this.rows; j++) {

      //Randomizamos el color;
      let randomBeetle = Phaser.Math.RND.between(0, this.possiblebeetles.length - 1);
      let texture =  this.possiblebeetles[randomBeetle];
      let count = 0;
      for (let i = 0; i < this.columns; i++) {
        //Máximo de 3 del mismo color seguidos
        if (count <= 2) 
        {
          // Añadimos uno
          console.log("scene: " + this.scene + " x: "+ i + " y: " + j + " cellType: " + this.cellType + " texture: " + texture);
          this.cells[i][j] = new Beetle(this.scene, i, j, "normal", texture);
          
          // Aseguramos que sea distinto del siguiente
          if ( this.cells[i][j] == this.cells[i-1][j]) 
          {
            randomBeetle = Phaser.Math.RND.between(0, this.possiblebeetles.length - 1);
            let texture =  this.possiblebeetles[randomBeetle];
            this.cells[i][j] = new Beetle(this.scene, i, j, "normal", texture);
          }
        }
        count++;

        if (count == 3) count = 0;
          
      }
    }
  }


  

  //Colisiones círculo
  colisions() 
  {
    container.setInteractive(new Phaser.Geom.Circle(0, 0, radius), Phaser.Geom.Circle.Contains);
    // container.setInteractive(false); // disable
      
  }

  addToMatrix(){

  }

  //En base a la posición de choque de 
  getMatrixPos(x, y)
  {


  }







  //Visita los escarabajos vecinos
  visitNeighbours()
  {
    return true;
  }

  //Bajará una fila de la matriz. 
  addRow() {
    // Baja una fila
    for (let i = 0; i < this.columns; i++) {
      for (let j = 0; j < this.rows - 1; j++) 
      {
        this.cells[i][j+1] = this.cells[i][j];
      }
    }
    
    // Añade una fila nueva arriba, rellena con bichos nuevos
    for (let i = 0; i < this.columns; i++) {
      randomBeetle = Phaser.Math.RND.between(0, this.possiblebeetles.length - 1);
      let texture =  this.possiblebeetles[randomBeetle];
      this.cells[i][0] = new Beetle(this.scene, i, 0, "normal", texture);
    }
  }

  //Evalúa si la matríz está vacía. 
  //En caso true, termina el juego
  //En caso falso, sigue el juego
  emptyMatrix()
  {
    //Recorre cada punto de la matriz
    for (let i = 0; i < this.columns; i++) {
      for (let j = 0; j < this.rows - 1; j++) 
      {
        //Busca algún punto que no esté vacío  
        if (this.cells[i][j].cellType != "empty") {
          return false;
        }
      }
    }
  }
}
