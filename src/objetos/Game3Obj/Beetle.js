export default class Beetle extends Phaser.GameObjects.Sprite
{
  //Constructora del objeto
  constructor(scene, x, y) {
    super(scene, x, y)

    this.scene = scene;
    this.scene.add.existing(this);

    this.x = x;
    this.y = y;

    this.beetles = ['RedBeetle', 'OrangeBeetle', 'YellowBeetle', 'GreenBeetle', 'CianBeetle', 'BlueBeetle', 'PurpleBeetle'];
    this.setTexture(this.beetles[Phaser.Math.RND.between(0, this.beetles.length - 1)]);

    this.isDead = false;
  }

  //Destructora del objeto
  selfDestroy ()
  {
    this.destroy();
  }

}