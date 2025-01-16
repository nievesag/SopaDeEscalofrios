export default class Box extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y, key) {
        super(scene, x, y, key);
        this.scene = scene;
        this.x = x;
        this.y = y;
        this.key = key;
        this.setScale(0.5,.5);
        this.scene.physics.add.existing(this);
        this.body.setAllowGravity(false);
        this.body.setDrag(500); // rozamiento

        this.grabDer = false;
        this.grabIzq = false;
        this.grabAbj = false;
        this.grabArr = false;

		this.body.setSize(28, 28); // Para que entre mejor por los pasillos
    }

    preUpdate(t, dt) {
        super.preUpdate(t, dt);
    }

    setisDer(g) { this.grabDer = g; }
    setisIzq(g) { this.grabIzq = g; }
    setisAbj(g) { this.graAbj = g;  }
    setisArr(g) { this.grabArr = g; }

    getisDer() { return this.grabDer; }
    getisIzq() { return this.grabIzq; }
    getisAbj() { return this.graAbj;  }
    getisArr() { return this.grabArr; }
}