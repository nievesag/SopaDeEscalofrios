export default class MainMenu extends Phaser.Scene {
	constructor() {
		super({ key: 'MainMenu'});
	}

	preload () {
		this.load.image("mainMenu", "./assets/images/mainMenu.jpg");
		this.load.image("startButton", "./assets/images/startButton.jpg");
		this.load.audio("f3ale", "./assets/images/f3ale.mp3");
	}

	create () {
		this.crateButton();
	}
  }