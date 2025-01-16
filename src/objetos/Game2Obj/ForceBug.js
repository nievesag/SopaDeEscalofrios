export default class ForceBug extends Phaser.GameObjects.Sprite{
    constructor(scene, cannon, vessel){
        super(scene, 90, 80, 'player3');
        
        this.scene = scene;
        this.cannon = cannon;
        this.vessel = vessel

        // añadir el objeto a la escena.
        scene.add.existing(this); 

        // config de las físicas.
        this.setScale(0.2); // Le pone el tamaño.
        this.setDepth(5); // siempre delante de todo.
        this.setScrollFactor(0); // sigue la cámara
    }

    bugColor(){
        // FEEDBACK DE FUERZA DE LANZADO.
        if(this.vessel.isLaunched){
            if(this.cannon.powerColor === 0 || this.cannon.powerColor === 1){ // 0 -> poca fuerza.
                // Verde.
                this.setTexture('GreenBeetle');
            }
            else if(this.cannon.powerColor === 2){ // 2 -> ni mas ni menos.
                // Amarillo.
                this.setTexture('YellowBeetle');
            }
            else if(this.cannon.powerColor === 3){ // 3 -> va folledo.
                // Naranja
                this.setTexture('OrangeBeetle');
            }
            else if(this.cannon.powerColor === 4 || this.cannon.powerColor === 5){ // 4 -> joder lo folledo que va.
                // Rojo.
                this.setTexture('RedBeetle');
            }
        }
        
    }

    update(){  
        this.bugColor();
        this.setRotation(this.rotation+0.01);
    }
}