import Arrow from '../Game4Obj/Arrow.js';

export default class ExplosiveArrow extends Arrow {
    constructor(scene, x, y) {
        super(scene, x, y, 'arrow4'); 
        this.type = 'explosive';
        this.scene = scene;
    }

    
    handleCollision(obstacle) {  //Gestiona la explosion de la flecha explosiva
      
        this.body.setVelocity(0);
        this.body.setAllowGravity(false);
        this.body.setImmovable(true);
        obstacle.body.setVelocity(0);

        this.explode()
      
    }

 
    explode() {  //Efecto de la explosion de la flecha
        const explosionRadius = 120; 
        
        const obstaclesToDestroy = this.scene.obstaclePool.filter(obstacle => {
            const distance = Phaser.Math.Distance.Between(this.x, this.y, obstacle.x, obstacle.y);
            return distance <= explosionRadius && !obstacle.isDead;
        });

   

        this.scene.time.delayedCall(2000, () => {
            obstaclesToDestroy.forEach(obstacle => {
                obstacle.breakApart();

              

            });
            this.explosionAnim();
           
        });


      
    }


    explosionAnim() { //Animacion de explosion
        console.log(this.scene);
        const explosionSprite = this.scene.add.sprite(this.x, this.y, 'explosion'); 
        explosionSprite.setScale(0.5); 

        this.scene.time.delayedCall(150, () => {
           
            explosionSprite.destroy();
            this.destroy();
        });
    }
}
