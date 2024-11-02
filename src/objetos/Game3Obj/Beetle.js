// Clase del Beetle del Minijuego 3. 
export default class Beetle extends Phaser.GameObjects.Container
{
  //Constructora del objeto
  constructor (scene, x, y, sprite, color)
  {
    super(scene, x, y, { key: "Beetle" });

    //Cualidades
    this.x = x;
    this.y = y;
    this.sprite = sprite;
    this.color = color;

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

  //Define si se ha visitado
  isVisited()
  {
    return true;
  }

  //Mira el color de los vecinos
  neighbourBeetle()
  {

  }

  //Cuando tiene 2 o más vecinos del mismo color, se eliminan los escarabajos de dicho color.
  collectBeetle()
  {
    
  }

}