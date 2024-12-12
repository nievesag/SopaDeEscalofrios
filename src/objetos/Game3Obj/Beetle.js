export default class Beetle extends Phaser.GameObjects.Sprite
{
  //Constructora del objeto
  constructor(scene, x, y, type, texture) {
    super(scene, x, y, type, texture)

    this.scene = scene;
    this.scene.add.existing(this);
    this.setOrigin(0.5, 0.5); 
    this.x = x;
    this.y = y;
    this.type = type; //"normal", "bomb", "colorbomb"
    this.sprite = scene.add.sprite(x, y, texture);
    this.velocity = { x: 0, y: 0 };
    this.force = 1000;

    this.removed = false; //Si se ha quitado del nivel o no
    this.processed = false; //Si ha sido procesado en vecinos o no

    this.scene.physics.world.enable(this);
    this.body.setCollideWorldBounds(true); // Para que no se salga de los límites del mundo.
    this.body.setBounce(1); // rebote con colisiones.
    this.body.setAllowGravity(true);
    this.body.setImmovable(false);
    this.isDead = false;
  }

  create(){
    
  }

  //Destructora del objeto
  destructor ()
  {
    this.destroy();
  }

  //Maneja el disparo de los escarabajos. 
  //Este método es llamado desde Player3, con el ángulo del pointer del ratón en dado momento. 
  shoot(angle) {
    const velocity = this.scene.physics.velocityFromAngle(angle, this.force);
    this.setVelocity(velocity.x, velocity.y);
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

  setTexture(texture){
    this.texture = texture;
  }

}