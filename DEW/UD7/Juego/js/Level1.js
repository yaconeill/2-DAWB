EnemyBird = function (index, game, x, y) {
    this.bird = game.add.sprite(x, y, 'bird');
    this.bird.anchor.setTo(0.5, 0.5);
    this.bird.name = index.toString();

    game.physics.enable(this.bird, Phaser.Physics.ARCADE);
    this.bird.body.immovable = true;
    this.bird.body.collideWorldBounds = true;
    this.bird.body.allowGravity = false;

    this.birdTween = game.add.tween(this.bird).to({
        y: this.bird.y + 200}, 2000, 'Linear', true, 0, 100, true);
};

var enemy1;
var sphere;

Game.Level1 = function (game) {};
var map;
var layer;

var player;
var controls = {};
var playerSpeed = 150;
var jumpTimer = 0;
var button;

var shootTime = 0;
var nuts;

var respawn;

var playerXP = 15;
var gameXPsteps = 0;

var playerLevel = 0;

Game.Level1.prototype = {
    create: function (game) {
        this.world.setBounds(0, 0, 736, 472);
        this.physics.startSystem(Phaser.Physics.P2JS);
        this.physics.p2.setImpactEvents(true);
        this.physics.p2.defaultRestitution = 0.8;
        // Set the gravity
        this.physics.p2.gravity.y = 1000;

        this.stage.backgroundColor = '#3A5963';

        // this.physics.arcade.gravity.y = 1400;

        respawn = game.add.group();

        map = this.add.tilemap('map');

        map.addTilesetImage('tileset', 'tileset');

        var playerCG = this.physics.p2.createCollisionGroup();
        var wallsCG =  this.physics.p2.createCollisionGroup();
        var sphereCG = this.physics.p2.createCollisionGroup();
        
        var walls = game.physics.p2.convertCollisionObjects(map, "Collisions", true);   
        for(var wall in walls)
        {
          walls[wall].setCollisionGroup(wallsCG);
          walls[wall].collides(playerCG);
        }
        layer = map.createLayer('field');

        map.setTileIndexCallback(6, this.spawn, this);
        // map.setTileIndexCallback(9, this.speedPowerUp, this);
        map.createFromObjects('spawn', 11, '', 0, true, false, respawn);

        // sphere = this.add.sprite(200, 0, 'sphere');
        // this.physics.p2.enable(sphere, true);
        // // sphere.body.setCircle(58);
        // // sphere.body.clearShapes();
        // // sphere.body.loadPolygon('sprite_physics', 'sphere');
        // sphere.anchor.setTo(0.5, 0.5);

        balls = game.add.group();
        balls.enableBody = true;
        balls.physicsBodyType = Phaser.Physics.P2JS;

        sphere = balls.create(180, 0, 'sphere');
        sphere.body.setCircle(28);
        // sphere.body.clearShapes();
        // sphere.body.loadPolygon('sprite_physics', 'sphere');
        // sphere.body.setCollisionGroup(sphereCG);
        // sphere.body.collides(playerCG);
        // sphere.body.collides(wallsCG);

        player = this.add.sprite(0, 0, 'player');
        this.physics.p2.enable(player, true);
        player.frame = 1;  
        player.body.setRectangle(70,110);
        // player.body.clearShapes();
        // player.body.loadPolygon('sprite_physics', 'player');
        player.anchor.setTo(0.5, 0.5);

        player.body.setCollisionGroup(playerCG);
        // player.body.collides(sphereCG);
        // player.body.collides(sphereCG, die, this);
        player.body.collides(wallsCG);
        layer.resizeWorld();

        this.spawn();

        // player.animations.add('idle', [10,11,12,13,14,15,16,17,18], 7, true);
        // player.animations.add('jump', [20,21,22,23,24,25,26,27,28, 29], 7, true);
        // player.animations.add('shoot', [30,31,32,33,34,35,36,37], 7, true);
        // player.animations.add('run', [38, 39, 40, 41, 42, 43, 44, 45], 10, true);
        // player.animations.add('die', [1, 2, 3, 4, 5, 6, 7, 8, 9], 10, true);
        player.animations.add('idle', [1, 2, 3, 4, 5, 6, 7, 8, 9], 10, true);
        this.physics.p2.enable(player);
        this.camera.follow(player);
        player.body.collideWorldBounds = true;

        controls = {
            right: this.input.keyboard.addKey(Phaser.Keyboard.D),
            left: this.input.keyboard.addKey(Phaser.Keyboard.A),
            up: this.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR),
            shoot: this.input.keyboard.addKey(Phaser.Keyboard.ENTER),
        };

        // button = this.add.button(this.world.centerX - 250, this.world.centerY + 220,
        //                     'buttons', function(){
        //                         console.log('pressed');
        //                     }, this, 2, 1 ,0);
        // button.fixedToCamera = true;

        //sphere
        // sphere = game.add.sprite(400, 200, 'sphere');
        // game.physics.p2.enable(sphere, true);

        // sphere.body.velocity.setTo(200, 200);        
        // sphere.body.collideWorldBounds = true;
        // sphere.body.bounce.set(1);
        // sphere.body.gravity.set(0, 180);
        // var me = this;
        // me.timer = game.time.events.loop(600, function() {
        //     me.spawnObjectRight();
        //     me.spawnObjectLeft();
        // });

        // enemigo
        // enemy1 = new EnemyBird(0, game, player.x + 400, player.y - 200);

        // munición
        // nuts = game.add.group();

        // nuts.enableBody = true;
        // nuts.physicsBodyType = Phaser.Physics.ARCADE;
        // nuts.createMultiple(5, 'nut');

        // nuts.setAll('anchor.x', 0.5);
        // nuts.setAll('anchor.y', 0.5);

        // nuts.setAll('scale.x', 0.5);
        // nuts.setAll('scale.y', 0.5);

        // nuts.setAll('outOfBoundsKill', true);
        // nuts.setAll('checkWorldBounds', true);

    },
    update: function () {
        // this.physics.arcade.collide(player, layer);
        // this.physics.arcade.collide(player, enemy1.bird, this.resetPlayer);

        // player.body.velocity.x = 0;

        // playerLevel = Math.log(playerXP, gameXPsteps);
        // console.log('Level: ' + Math.floor(playerLevel));

        // this.physics.arcade.collide(sphere, layer);
        // this.physics.arcade.collide(sphere,player);
        
        // if(controls.right.isDown){
        //     player.animations.play('run');
        //     player.scale.setTo(1, 1);
        //     player.body.velocity.x += playerSpeed;
        // }

        // if(controls.left.isDown){
        //     player.animations.play('run');
        //     player.scale.setTo(-1,1);
        //     player.body.velocity.x -= playerSpeed;
        // }

        // if(controls.up.isDown && (player.body.onFloor() || 
        // player.body.touching.down) && this.time.now > jumpTimer){
        //     player.body.velocity.y = - 600;
        //     jumpTimer = this.time.now + 750;
        //     player.animations.play('jump');
        // }

        if(player.body.velocity.x == 0 && player.body.velocity.y == 0)
            player.animations.play('idle');
        
        // if(controls.shoot.isDown)
        //     this.shootNut();
        
        // if (checkOverlap(nuts, enemy1.bird))
        //     enemy1.bird.kill();
    },

    createObjects: function(objectName) {
        var me = this;
    
        // Create a group to hold the collision shapes
        var objects = this.add.group();
        objects.enableBody = true;
        objects.physicsBodyType = Phaser.Physics.P2JS;
        objects.createMultiple(40, objectName);
    
        objects.forEach(function(child){
            child.body.clearShapes();
            child.body.loadPolygon('sphere_physics', objectName);
        }, me);
    
        return objects;
    },

    // spawnObject: function() {
    //     var me = this;
    
    //     // Spawn a new banana on the left and give it a random velocity
    //     var object = me.bananas.getFirstDead();
    //     object.lifespan = 6000;

    //     // Bananas collide with bananas and the player
    //     object.body.setCollisionGroup(me.bananasCollisionGroup);
    //     object.body.collides([me.bananasCollisionGroup, me.playerCollisionGroup]);

    //     return object;
    // },

    // spawnObjectLeft: function() {
    //     var me = this;
    
    //     // Spawn new object
    //     var object = me.spawnObject();
    
    //     // Set object's position and velocity
    //     object.reset(1, 600);
    //     object.body.velocity.x = me.random.integerInRange(100, 800);
    //     object.body.velocity.y = -me.random.integerInRange(1000, 1500);
    // },
    
    // spawnObjectRight: function() {
    //     var me = this;
    
    //     // Spawn new object
    //     var object = me.spawnObject();
    
    //     // Set object's position and velocity
    //     object.reset(me.game.world.width, 600);
    //     object.body.velocity.x = -me.random.integerInRange(100, 800);
    //     object.body.velocity.y = -me.random.integerInRange(1000, 1500);
    // },

    resetPlayer:function () {
        player.animations.play('die');        
        player.reset(100, 500);
    },

    getCoin:function () {
        map.putTile(-1, layer.getTileX(player.x),layer.getTileY(player.y));

        playerXP += 15;
    },
    speedPowerUp:function () {
        map.putTile(-1, layer.getTileX(player.x),layer.getTileY(player.y));
        playerSpeed += 50;
        this.time.events.add(Phaser.Timer.SECOND * 2, function () {
            playerSpeed -= 50;
        });
    },

    spawn: function () {
        respawn.forEach(function (spawnPoint) {
            player.reset(spawnPoint.x, spawnPoint.y);
        }, this);
    },

    shootNut: function () {
        if (this.time.now > shootTime) {
            nut = nuts.getFirstExists(false);
            if(nut){
                nut.reset(player.x, player.y);

                nut.body.velocity.y = -600;
                shootTime = this.time.now + 900;

                playerXP += 15;
                
            }
        }
    }
};

function checkOverlap(spriteA, spriteB) {
    var boundsA = spriteA.getBounds();
    var boundsB = spriteB.getBounds();
    return Phaser.Rectangle.intersects(boundsA, boundsB);
}