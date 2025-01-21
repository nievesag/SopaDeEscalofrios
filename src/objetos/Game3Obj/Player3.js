export default class Player3 extends Phaser.GameObjects.Sprite
{
  //Constructora del objeto
  constructor (scene, x, y)
  {
    super(scene, x, y, 'player3');

    //Inicializa escena
    this.scene = scene;
    this.scene.add.existing(this);

    this.x = x; //Pos en x
    this.y = y; //Pos en y
    this.angle = 0; //Angulo de disparo
    this.scale = 0.3; //Escala del sprite

    //Textura del sprite
    this.setTexture('player3').setDepth(2);
  }
  
  //Dispara en la dirección del input
  shoot(beetle)
  {
    //Disparamos segun la rotacion del player
    this.scene.physics.velocityFromRotation(this.rotation - 1.57, beetle.speed, beetle.body.velocity); 
  }

}