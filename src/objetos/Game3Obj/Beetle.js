export default class Beetle extends Phaser.GameObjects.Sprite
{
  //Constructora del objeto
  constructor (scene, x, y)
  {
    super(scene, x, y);

    this.scene = scene;
    this.scene.add.existing(this);
    this.scene.physics.world.enable(this);

    this.body.setAllowGravity(false);
    this.body.setImmovable(true);
    
    this.x = x; //Pos en x
    this.y = y; //Pos en y
    this.removed = false; //Si se ha quitado del nivel o no
    this.velocity = 0; //Velocidad 
    this.processed = false; //Si ha sido procesado en vecinos o no
    this.type = ["normal", "bomb", "colorbomb"]; 
    this.beetles = []; //Array de colores disponibles


    //Se añade a escena
    this.scene.add.existing(this);
    this.isDead = false;
  }

  create(){
    
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