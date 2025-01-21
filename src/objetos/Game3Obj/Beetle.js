export default class Beetle extends Phaser.GameObjects.Sprite
{
  //Constructora del Beetle en general. 
  //Clase padre de MatrixBeetle y ShootingBeetle
  constructor(scene, x, y) {
    super(scene, x, y)

    //Inicializa escena
    this.scene = scene;
    this.scene.add.existing(this);

    //Inicializa posicion inicial
    this.x = x;
    this.y = y;

    //Array de posibles texturas
    this.beetles = ['RedBeetle', 'OrangeBeetle', 'YellowBeetle', 'GreenBeetle', 'CianBeetle', 'BlueBeetle', 'PurpleBeetle'];
    //Textura inicial aleatoria
    this.setTexture(this.beetles[Phaser.Math.RND.between(0, this.beetles.length - 1)]);
  }

  //Destructora del objeto
  selfDestroy ()
  {
    this.destroy();
  }

}