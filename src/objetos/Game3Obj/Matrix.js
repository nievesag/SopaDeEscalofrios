// Clase del Matrix del Minijuego 3. 
export default class Matrix extends Phaser.GameObjects.Container
{
  //Constructora del objeto
  constructor (scene, x, y)
  {
    super(scene, x, y, { key: "Matrix" });

    //Cualidades
    this.x = x;
    this.y = y;

    //Se añade a escena
    this.scene.add.existing(this);
    this.isDead = false;
  }

  //Destructora del objeto
  destructor ()
  {
    this.destroy();
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