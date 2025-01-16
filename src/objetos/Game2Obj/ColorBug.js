export default class ColorBug extends Phaser.GameObjects.Sprite{
    constructor(scene){
        super(scene, 90, 80, 'player3');
        
        this.scene = scene;

        // añadir el objeto a la escena.
        scene.add.existing(this); 

        // config de las físicas.
        this.setScale(0.2); // Le pone el tamaño.
        this.setDepth(5); // siempre delante de todo.
        this.setScrollFactor(0); // sigue la cámara

        // TEXTO DE FEEDBACK.
         this.feedbackText = this.scene.add.text(
            this.x + 80, 
            this.y - 35,
            'Haz clic\npara lanzar',
            {
                fontSize: '24px',
                color: 'white',
                fontFamily: 'yatra'
            }
        ).setDepth(10).setScrollFactor(0); // pq es UI.
        
    }

    bugColor(launchVelocity){
        // FEEDBACK DE FUERZA DE LANZADO.
            if(launchVelocity === 100 || launchVelocity === 300){ // 0 -> poca fuerza.
                // Verde.
                this.setTexture('GreenBeetle').setScale(2);
                this.feedbackText.setText('Apenas\nfuerza');
            }
            else if(launchVelocity === 500){ // 2 -> ni mas ni menos.
                // Amarillo.
                this.setTexture('YellowBeetle').setScale(2);
                this.feedbackText.setText('Poca\nfuerza');
            }
            else if(launchVelocity === 700){ // 3 -> va folledo.
                // Naranja
                this.setTexture('OrangeBeetle').setScale(2);
                this.feedbackText.setText('Bastante\nfuerza');
            }
            else if(launchVelocity === 900){ // 4 -> joder lo folledo que va.
                // Rojo.
                this.setTexture('RedBeetle').setScale(2);
                this.feedbackText.setText('Muchísima\nfuerza');
            }
            else if(launchVelocity === 1200){
                this.setTexture('PurpleBeetle').setScale(2);
                this.feedbackText.setText('NITRO');
            }
        
        
    }

    update(){  
        this.setRotation(this.rotation+0.01);
    }
}