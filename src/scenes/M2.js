export default class M2 extends Phaser.Scene {
	constructor() {
		super({ key: 'Vasija'});
	}

	preload () {
		
	}

	create ()
    {
        let a = new Phaser.GameObjects.Container(this, 10, 10); // Martian es un Sprite
        let b = new Martian('phaser');
        a.add(b); // hacemos que `b` sea hijo de `a`
        b.y = 10; // relativo a `a`
        this.add.existing(a); // lo metemos en la escena
	}
  }