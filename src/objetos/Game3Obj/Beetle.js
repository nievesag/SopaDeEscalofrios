export default class Beetle extends Phaser.GameObjects.Sprite
{
  //Constructora del objeto
  constructor (scene, x, y, key)
  {
    super(scene, x, y, { key: "beetle" });

    this.scene = scene;
    this.scene.add.existing(this);
    this.scene.physics.world.enable(this);

    this.body.setAllowGravity(false);
    this.body.setImmovable(true);
    
    this.x = x; //Pos en x
    this.y = y; //Pos en y
    this.color = color; 
    this.removed = false; //Si se ha quitado del nivel o no
    this.shift = shift; //
    this.velocity = 0; //Velocidad 
    this.alpha = 1; //?
    this.processed = false; //Si ha sido procesado en vecinos o no
    this.type = [normal, bomb, colorbomb]; //Tipo: normal, colorBomb, normalBomb

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