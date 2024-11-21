export default class Maelstrom{
    constructor(scene){ // Ponerle tambien obsGen aqui.
        this.scene = scene;
        //this.obstacleGenerator = obstacleGenerator;

        // ---MAELSTROM---.
        // NOTA (A FUTURO): al principio la pondremos en el centro, pero luego habrá que ponerlo donde (this.obstacleGenerator.x, this.obstacleGenerator.y) para que aparezca en esa ubi.
        // this.maelstrom = this.scene.physics.add.image(this.obstacleGenerator.x, this.obstacleGenerator.y, 'maelstrom') 

        this.maelstrom = this.scene.physics.add.image(0, 0, 'maelstrom') 
    }

    
}