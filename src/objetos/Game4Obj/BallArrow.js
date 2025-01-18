import Arrow from '../Game4Obj/Arrow.js';

export default class BallArrow extends Arrow {
    constructor(scene, x, y) {
        super(scene, x, y, 'arrow3');
        this.type = 'ball';  
    }

    transformToBall() {  //Transofrma la pelota en una bola que rebota

        console.log(this.scene);
       
        const posX = this.x;
        const posY = this.y;
        let velX = this.getVelX();
        let velY = this.getVelY();
        const auxAngle = this.angle;

      
         const angleToGround = Math.atan2(velY, velX); 
         const gravityFactor = -0.1; 

        velY = Math.sin(angleToGround) * gravityFactor * Math.abs(velX);  
        velX = Math.cos(angleToGround) * Math.abs(velX);  

     
        this.arrowBall = this.scene.add.sprite(posX, posY, 'bola'); 
        this.arrowBall.setScale(0.5);  
        this.scene.physics.world.enable(this.arrowBall);
        this.arrowBall.body.setCircle(150); 
        this.arrowBall.body.setBounce(1);  


        this.arrowBall.body.setCollideWorldBounds(true);
        this.arrowBall.body.setVelocity(velX, velY);
        this.arrowBall.setRotation(auxAngle);


        this.scene.physics.add.collider(this.arrowBall, this.scene.ground);  //Colision con el suelo
    
        this.scene.enemiesPool.forEach(enemy => {  //Colisiones con los enemigos
            enemy.checkCollisionWithArrow(this, this.arrowBall);

        });


        //Colisiones con los obstaculos
        this.scene.physics.add.collider(this.arrowBall, this.scene.obstaclePool, (arrowBall, obstacle) => {
            const bounceFactor = 2; // Factor de rebote personalizado
            const newVelX = arrowBall.body.velocity.x * bounceFactor;
            const newVelY = arrowBall.body.velocity.y * bounceFactor;
            arrowBall.body.setVelocity(newVelX, newVelY);
        });
    
        this.scene.activeArrowsPool.push(this.arrowBall);


        //Se destruye a los 4 segundos de lanzarla
        this.scene.time.delayedCall(4000, () => {
            if (this.arrowBall) {
                this.arrowBall.destroy(); 
            }
        });

         this.destroy(); 

    }
}
