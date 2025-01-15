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

    //¿Esto aquí?
    this.beetles = ['RedBeetle', 'OrangeBeetle', 'YellowBeetle', 'GreenBeetle', 'CianBeetle', 'BlueBeetle', 'PurpleBeetle'];
  }

  // Time - t y DeltaTime - dt
  preUpdate(t, dt) {
    super.preUpdate(t, dt);
    //this.setProjectile(); // Inicializa el primer proyectil y el siguiente
  }

  setProjectile() {
    this.randomBeetle = Phaser.Math.RND.between(0, this.possiblebeetles.length - 1);
    this.actualBeetle = this.scene.make.image({
      x : this.x,
      y : this.y + 25,
      key: this.possiblebeetles[this.randomBeetle]
    }).setDepth(2);   

    // y preparamos el siguiente
    this.randomBeetle = Phaser.Math.RND.between(0, this.possiblebeetles.length - 1);
    this.nextBeetleBeetle = this.scene.make.image({
      x : this.x,
      y : this.y + 15,
      key: this.possiblebeetles[this.randomBeetle]
    }).setDepth(2); 
  }
  
  setNextProjectile(nextBeetle){
    //Ahora el que se dispara es el siguiente
    this.shootingBeetle = nextBeetle;
    //Y creamos un nuevo siguiente
    nextBeetle = this.add.image(this.x, this.y, beetles[randomBeetle]).setScale(1); 
  }

  //Intercambia los escarabajos dentro del cannon
  changeBeetle(actualBeetle, nextBeetle)
  {
    actualBeetle = this.actualBeetle;
    nextBeetle = this.nextBeetle;
    this.swap(actualBeetle, nextBeetle);
  }

  //Dispara en la dirección del input
  shoot(beetle)
  {
    //Disparamos
    this.scene.physics.velocityFromRotation(this.rotation - 1.57, beetle.speed, beetle.body.velocity); 
  }

  freeze(){
    this.inputEnable = false;
  }

}