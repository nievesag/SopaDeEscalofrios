import Beetle from './Beetle.js';

export default class Player3 extends Phaser.GameObjects.Sprite
{
  //Constructora del objeto
  constructor (scene, x, y)
  {
    super(scene, x, y, 'player3');

    this.scene = scene;
    this.scene.add.existing(this);

    this.x = x; //Pos en x
    this.y = y; //Pos en y
    this.angle = 90; //Angulo de disparo
    this.scale = 0.3;
    //this.speed = 1000; //Esto al bicho

    //Tiempos relativos al disparo
    this.shotTime = 0;  // Tiempo para disparar
    this.lastShotTime = 0;  // Tiempo del último disparo
    this.shootCooldown = 1000;  // Cooldown en milisegundos

    //Textura del sprite
    this.setTexture('player3').setDepth(2);

    this.beetles = ['RedBeetle', 'OrangeBeetle', 'YellowBeetle', 'GreenBeetle', 'CianBeetle', 'BlueBeetle', 'PurpleBeetle'];
  }
  
  //Dispara en la dirección del input
  shoot(beetle)
  {
    //Disparamos
    this.scene.physics.velocityFromRotation(this.rotation - 1.57, beetle.speed, beetle.body.velocity); 
  }

}