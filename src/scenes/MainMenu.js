export default class MainMenu extends Phaser.Scene {
	constructor() {
		super({ key: 'MainMenu'});
	}

	preload () {
		
	}

	create (){
		this.add.image(500, 250, 'bgProvisional');

		this.crateButton();
	}
  }