export default class Matrix extends Phaser.GameObjects.Sprite
{
  //Constructora del objeto
  constructor (scene, x, y)
  {
    super(scene, x, y);

    //Inicializa escena
    this.scene = scene;
    this.scene.add.existing(this);

    //Inicializa posicion inicial
    this.x = x; 
    this.y = y;

    //Origen arriba izquierda
    this.setOrigin(0, 0); 

    this.lvl = []; //Array bidimensional en el que guardaremos MatrixBeetles
    this.cols = 13; //Columnas totales
    this.fils = 13; //Filas totales 
    this.filIni = 3; //Filas que se instancian al principio. Dependen de la dificultad
    this.height = 45; //Alto beetle
    this.width = 45; //Ancho beetle
    this.freeBeetle = false; //Si hay beetle sin engancharse
  }
}
