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
    this.velocity = 1000; //Velocidad 
    this.processed = false; //Si ha sido procesado en vecinos o no
    this.type = ["normal", "bomb", "colorbomb"]; 

    this.body.setCollideWorldBounds(true); // Para que no se salga de los límites del mundo.
    this.body.setBounce(1); // rebote con colisiones.
    this.body.setAllowGravity(true);
    this.body.setImmovable(false);

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

  shoot(key, angle){
    //this.body.velocityFromRotation(angle, 1000, shootingBeetle.body.velocity); 
    //this.shootingBeetle = this.body.add.image(this.x, this.y, key).setScale(1); //Instancia el escarabajo
    //console.log(shootingBeetle.texture.key);
    //Le metemos físicas
    this.physics.world.enable(this);
    //shootingBeetle.setCircle(10);
    this.shootingBeetle.enableBody(true, this.x, this.y, true, true); // Activa la vessel y la pone donde cannonHead.

    this.physics.velocityFromRotation(angle, 1000, shootingBeetle.body.velocity); // Lanza el escarabajo con un ángulo y velocidad.
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