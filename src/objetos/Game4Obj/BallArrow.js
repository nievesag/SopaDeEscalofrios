import Arrow from '../Game4Obj/Arrow.js';

export default class BallArrow extends Arrow {
    constructor(scene, x, y) {
        super(scene, x, y, 'arrow3');
        this.type = 'ball';  
    }

    transformToBall() {
        if (!this.scene) {
            console.error("Scene is undefined!");
            return; 
        }

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

     
        this.arrowBall = this.scene.add.circle(posX, posY, 100, 0x740101);
        this.scene.physics.world.enable(this.arrowBall);
        //this.arrowBall.setFillStyle(0x740101);  
        this.arrowBall.setSize(80, 80);  
        this.arrowBall.body.setCircle(100);  

        this.arrowBall.body.setBounce(0);  

        this.arrowBall.body.setCollideWorldBounds(true);

      
        this.arrowBall.body.setVelocity(velX, velY);
        this.arrowBall.setRotation(auxAngle);

        this.scene.physics.add.collider(this.arrowBall, this.scene.ground, () => {
           // this.arrowBall.body.setVelocityX(0); 
            this.arrowBall.body.setVelocityY(0); 
        });
    
        this.scene.enemiesPool.forEach(enemy => {
            enemy.checkCollisionWithArrow(this, this.arrowBall);

        });
    
        this.scene.activeArrowsPool.push(this.arrowBall);

        this.scene.time.delayedCall(4000, () => {
            if (this.arrowBall) {
                this.arrowBall.destroy(); 
            }
        });

         this.destroy(); 

    }
}
