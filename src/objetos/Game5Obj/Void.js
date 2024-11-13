import Mirror from './Mirror.js';

export default class Void extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y, tileSize) {
        super(scene, x, y, 'VacioTablero');
        scene.add.existing(this);

        this.setInteractive();
        this.tileSize = tileSize;
        
        this.on('pointerdown', () => {
            this.createMirror(scene);
        });
    }
    createMirror(scene) {
        const mirror = new Mirror(scene, this.x, this.y, 'left', 'up');
        scene.mirrors.push(mirror);
        this.destroy();
    }
}
