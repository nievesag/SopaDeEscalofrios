export default class Movable extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y, key) {
        super(scene, x, y, key);
        this.scene = scene;
        this.x = x;
        this.y = y;
        this.key = key;

        this.scene.physics.add.existing(this);
        this.body.setAllowGravity(false);

        this.grabDer = false;
        this.grabIzq = false;
        this.grabAbj = false;
        this.grabArr = false;

        // hola
        this.player = undefined;
        this.touched = false;
    }

    preUpdate(t, dt) {
        super.preUpdate(t, dt);
    }

    update = () => { // hola otra vez que paza pisha
        if (this.range == undefined) return;

        this.range.x = this.x;
        this.range.y = this.y;

        if (!this.scene.physics.world.overlap(this.player, this.range)) 
            this.touched = false;
        
        if (!this.touched)
            this.body.setDrag(10000); 
        else 
            this.body.setDrag(0);
    };

    setRangeUp() {
        this.range = this.scene.physics.add.sprite(this.x, this.y, null);
        this.range.body.setAllowGravity(false).setSize(32, 32); // Width / Height
        this.range.visible = false;
    }
    setTouched(t) { this.touched = t; }
    setPlayer(p) { this.player = p; }

    setisDer(g) { this.grabDer = g; }
    setisIzq(g) { this.grabIzq = g; }
    setisAbj(g) { this.graAbj = g;  }
    setisArr(g) { this.grabArr = g; }

    getisDer() { return this.grabDer; }
    getisIzq() { return this.grabIzq; }
    getisAbj() { return this.graAbj;  }
    getisArr() { return this.grabArr; }
}