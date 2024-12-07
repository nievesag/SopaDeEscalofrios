// Clase del Beetle del Minijuego 3. 
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
    
    this.velX = 0;
    this.velY = 0;
    this.setDisplaySize(100, 20);
    this.body.onCollide = true;

    // Posibles beetles
    this.beetlesColor = ['RedBeetle', 'OrangeBeetle', 'YellowBeetle', 'GreenBeetle', 'CianBeetle', 'BlueBeetle', 'PurpleBeetle', 'BlackBeetle', 'GoldenBeetle'];

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
      GOLDEN: 'GOLDEN'
    } //Se accede como color.RED...
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