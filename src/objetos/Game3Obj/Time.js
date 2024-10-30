// Clase del Time del Minijuego 3. 
export default class Time extends Phaser.GameObjects.Container
{
  //Constructora del objeto
  constructor (scene, x, y)
  {
    super(scene, x, y, { key: "Beetle" });

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

  //Reduce tiempo. A lo largo del tiempo, se va reduciendo
  minusTime()
  {
  
  }

  //Suma tiempo. Si se consigue un bonus de más de 5 escarabajos, suma tiempo
  plusTime()
  {

  }

  //Al acabar. Pone fin al juego
  endTime()
  {

  }

}