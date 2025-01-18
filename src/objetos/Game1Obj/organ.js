import Movable from './movable.js'

export default class Organ extends Movable {
    constructor(scene, x, y, key) {
        super(scene, x, y, key);

        this.setScale(0.5,.5);
        // this.body.setDrag(20,20); // rozamiento
        this.body.setBounce(0,0); // rebote con colisiones

        this.body.pushable = true;
		this.body.setSize(28, 28); // Para que entre mejor por los pasillos
    }
}