const c = document.getElementById("canvas");
const ctx = c.getContext("2d");
class Level
{
    constructor(x,y,enemyb,duration,healthMult,speedMult,damageMult,maxTimeMult,tx,ty)
    {
        this.targetX=tx;
        this.targetY=ty;
        this.maxTimeMult=maxTimeMult;
        this.healthMult=healthMult;
        this.speedMult=speedMult;
        this.damageMult=damageMult;
        this.duration=duration;
        this.enemyBasic=enemyb;
        this.maxDuration=duration;
        this.menuX=x;
        this.menuY=y;
        this.isFinished=false;
        this.timeLastSpawn=100;
        this.size=25;
        this.enemy=[];
    }
    drawUnfinishedLevel()
    {
        ctx.beginPath();
        ctx.strokeStyle = "black";
        ctx.ellipse(this.menuX, this.menuY, this.size, this.size, 0, 0, 2 * Math.PI);
        ctx.fill();
        //do this
    }
    drawFinishedLevel()
    {
        ctx.beginPath();
        ctx.strokeStyle = "black";
        ctx.ellipse(this.menuX, this.menuY, this.size, this.size, 0, 0, 2 * Math.PI);
        ctx.stroke();
        //do this as well
    }
}
class Enemy
{
    constructor(x,y,damage,speed,health)
    {
        this.x=x;
        this.y=y;
        this.damage=damage;
        this.speed=speed;
        this.health=health;
        this.size=40;
        this.knockBackX=0;
        this.knockBackY=0;
    }
    isTouching(x,y)
    {
        return Math.hypot(this.x-x,this.y-y)<this.size;
    }
    isWithin(x,y,range)
    {
        return Math.hypot(this.x-x,this.y-y)<this.size+range;
    }
    checkDeath()
    {
        return this.health<=0;
    }
    is 
}
class EnemyBasic extends Enemy
{
    img = new Image(); 
    constructor(x,y,damage,speed,health)
    {
        super(x,y,damage,speed,health)
        this.img.src="images/roughdraft.png";
    }
    paint()
    {
        ctx.beginPath();
        ctx.drawImage(this.img,this.x-this.size,this.y-this.size);
        ctx.fill();
    }
}
class Character
{
    constructor(x,y,damage,attackSpeed,size,health,attackRange)
    {
        this.x=x;
        this.y=y;
        this.health=health;
        this.damage=damage;
        this.attackSpeed=attackSpeed;
        this.coolDown=0;
        this.hover=true;
        this.size=size;
        this.attackRange=attackRange;
    }
    canPlace()
    {
        let bool=true;
        characters.forEach(a=>
        {
            if (Math.sqrt(Math.pow(a.x-this.x,2)+Math.pow(a.y-this.y,2))<(this.size+a.size+25))
                bool=false;
        }    
        );
        return bool;
    }
    attacked(enemy)
    {
        this.health-=enemy.damage;
        return this.health<=0;
    }
    mouseHovered()
    {

        ctx.beginPath();
        ctx.globalAlpha =.4;
        ctx.fillStyle="grey";
        ctx.arc(this.x, this.y, this.attackRange, 0, 2 * Math.PI);
        ctx.fill();
        ctx.fillStyle="black";
        ctx.globalAlpha = 1;
    }
    canAttack(enemys)
    {
        let possibleAttack=[]
        if (this.coolDown<=0)
        {
        enemys.forEach(enemy=>
        {
            if (enemy.isWithin(this.x,this.y,this.attackRange))
            {
                possibleAttack.push(enemy);
            }
        });
        possibleAttack=possibleAttack.sort((enemy1,enemy2)=>{return Math.hypot(enemy1.x-this.x,enemy1.y-this.y)-Math.hypot(enemy2.x-this.x,enemy2.y-this.y);});
        if (this.coolDown<0)
            this.coolDown=0;
            if (possibleAttack.length>0){
                this.coolDown=this.attackSpeed;
                return possibleAttack[0];
            }
        }
        this.coolDown-=tickRate;
        return null;
    }
    
}

class Air1 extends Character
{
    constructor(x,y)
    {
        super(x,y,1,4,35,4,400);
        this.cost=100;
        this.pierce=2;
        this.knockback=17;
    }
    paint()
    {
        if (this.hover)
            ctx.globalAlpha =.4;
        /*let img = new Image();
        img.src="images/imageTest.png";
        ctx.drawImage(img,this.x,this.y);
        */
       ctx.beginPath();
        ctx.fillStyle="blue";
        ctx.arc(this.x, this.y, this.size, 0, 2 * Math.PI);
        ctx.fill();
        ctx.globalAlpha = 1;
        ctx.fillStyle="black";
    }
    attack(enemy)
    {
        let dir = Math.atan2(enemy.y-this.y,enemy.x-this.x);
        projectile.push({
            moveX:Math.cos(dir)*25,
            moveY:Math.sin(dir)*25,
            x: this.x,
            y: this.y,
            damage : this.damage,
            size : 50,
            avoid : [],
            pierce : this.pierce,
            knockBackX : Math.cos(dir)*this.knockback,
            knockBackY : Math.sin(dir)*this.knockback,
            use : function(enemy){
                enemy.knockBackX+=this.knockBackX;
                enemy.knockBackY+=this.knockBackY;
                enemy.health-=this.damage;
            },
            paint : function(){
                ctx.beginPath();
                ctx.fillStyle="blue";
                ctx.arc(this.x, this.y, this.size, 0, 2 * Math.PI);
                ctx.fill();
                ctx.fillStyle="black";
            },
        });
    }
}

class Air2 extends Character
{
    constructor(x,y)
    {
        super(x,y,5,3,45,55,250);
        this.cost=250;
    }
    paint()
    {
        if (this.hover)
            ctx.globalAlpha =.4;
        /*let img = new Image();
        img.src="images/imageTest.png";
        ctx.drawImage(img,this.x,this.y);
        */
       ctx.beginPath();
        ctx.fillStyle="blue";
        ctx.arc(this.x, this.y, this.size, 0, 2 * Math.PI);
        ctx.fill();
        ctx.globalAlpha = 1;
        ctx.fillStyle="black";
    }
    attack(enemy)
    {

    }
}
class Air3 extends Character
{
    constructor(x,y)
    {
        super(x,y,1,.5,35,20,200);
        this.cost=250;
    }
    paint()
    {
        if (this.hover)
            ctx.globalAlpha =.4;
        /*let img = new Image();
        img.src="images/imageTest.png";
        ctx.drawImage(img,this.x,this.y);
        */
       ctx.beginPath();
        ctx.fillStyle="blue";
        ctx.arc(this.x, this.y, this.size, 0, 2 * Math.PI);
        ctx.fill();
        ctx.globalAlpha = 1;
        ctx.fillStyle="black";
    }
    attack(enemy)
    {

    }
}


let inMenu=true;
let mouseX=-1;
let mouseY=-1;
let live=10;
let money=500000;
let buyMenu=false;
let tickRate=.03;
addEventListener("click",onClick);
addEventListener("mousemove",onMouseMove);
let levels=[
    new Level(500,500,150,400.0,1,1,1,5,1000,850)
];
let characters=[];
let projectile=[];
let characterHover=null;
goToMap();
function onMouseMove(event)
{
    mouseX=event.clientX-8;
    mouseY=event.clientY-8;
}
function onClick(event)
{
    if (inMenu)
    {
        levels.forEach(a=>
        {
            if (Math.pow(a.menuX-event.clientX,2)+Math.pow(a.menuY-event.clientY,2)<=a.size*a.size)
            {
                //start Level
                startLevel(a);
            }
        }
        );
    }
    else
    {
        if (characterHover!=null)
        {
            if (characterHover.canPlace())
            {
                characters.push(characterHover);
                characterHover.hover=false;
                money-=characterHover.cost;
                characterHover=null;

            }
        }
        checkBuy(event);
    }
}
function checkBuy(e)
{
    if (buyMenu)
    {
        if (e.clientX-8>=1712&&e.clientX-8<=1762&&e.clientY-8>=375&&e.clientY-8<=525)//closeMenu
            buyMenu=false;
        
        if (e.clientX-8>=1763&&e.clientX-8<=1812&&e.clientY-8>=400&&e.clientY-8<=500&&money>=100)//buy Air 1
            characterHover = new Air1(mouseX,mouseY);

        if (e.clientX-8>=1813&&e.clientX-8<=1862&&e.clientY-8>=400&&e.clientY-8<=500&&money>=100)//buy Air 2
            characterHover = new Air2(mouseX,mouseY);
        
        if (e.clientX-8>=1863&&e.clientX-8<=1912&&e.clientY-8>=400&&e.clientY-8<=500&&money>=100)//buy Air 3
            characterHover = new Air3(mouseX,mouseY);
    }
    else
    {
        if (e.clientX-8>=1862&&e.clientX-8<=1912&&e.clientY-8>=375&&e.clientY-8<=525)//openMenu
            buyMenu=true;
    }
}
function goToMap()
{
    paintBackgroundMenu();
}
function startLevel(level)
{
    inMenu=false;
    ctx.reset();
    setInterval(function(){onTick(level)},30);
}
function onTick(level)
{
    paintBackgroundLevel();
    mouseOverCharacter();
    if (level.duration>0&&level.enemyBasic>0)
        spawn(level);
    level.enemy.forEach(a=>moveEnemy(a,level));
    paintEnemy(level);
    moveCharacters();
    attackWithCharacters(level);
    useProjectiles(level);
    paintCharacters();
    paintProjectiles();
    paintMenu();
}
function mouseOverCharacter()
{
    characters.forEach(character=>{
            if (Math.hypot(character.x-mouseX,character.y-mouseY)<character.size)
                character.mouseHovered();
        }
    )
}
function paintProjectiles()
{
    projectile.forEach(p=>
    {
        p.paint();
    });
}
function useProjectiles(level)
{
    projectile.forEach(p=>
    {
        p.x+=p.moveX;
        p.y+=p.moveY;
        if (p.x>c.clientWidth+100||p.y>c.clientHeight+100||p.x<-100||p.y<-100)
        {
            projectile.splice(projectile.indexOf(p),1);
        }
    });
    //attacking
    projectile.forEach(p=>
    {
            level.enemy.forEach(e=>
                {
                    if (e.isWithin(p.x,p.y,p.size)&&!p.avoid.includes(e))
                    {
                        p.pierce-=1;
                        p.use(e);
                        p.avoid.push(e);

                    }
                }
            );
            if (p.pierce<=0)
                projectile.splice(projectile.indexOf(p),1);
    });
}
function attackWithCharacters(level)
{
    characters.forEach(character=>
    {
        let enemy=character.canAttack(level.enemy);
        if (enemy!=null)
            character.attack(enemy);
    });
}
function paintMenu()
{
    if (buyMenu)
    {
        ctx.beginPath();
        ctx.strokeStyle="blue";
        ctx.rect(1863,400,50,100);
        ctx.rect(1813,400,50,100);
        ctx.rect(1763,400,50,100);
        ctx.stroke();
        ctx.beginPath();
        ctx.strokeStyle="black";
        ctx.rect(1863,500,50,100);
        ctx.rect(1813,500,50,100);
        ctx.rect(1763,500,50,100);
        ctx.rect(1863,300,50,100);
        ctx.rect(1813,300,50,100);
        ctx.rect(1763,300,50,100);
        ctx.stroke();
        ctx.fillRect(1712,375,50,150);
    }
    else
    {
        ctx.beginPath();
        ctx.rect(1862,375,50,150);
        ctx.fill();
    }
}
function moveCharacters()
{
    if (characterHover!=null)
    {
        characterHover.x=mouseX;
        characterHover.y=mouseY;
    }
}
function paintCharacters()
{
    characters.forEach(a=>a.paint());
    if (characterHover!=null)
        characterHover.paint();
}
function moveEnemy(enemy,level)
{
    if (enemy.checkDeath())
        level.enemy.splice(level.enemy.indexOf(enemy),1);
    if (enemy.knockBackX>1)
        enemy.knockBackX-=1;
    else if (enemy.knockBackX<-1)
        enemy.knockBackX+=1;
    else
        enemy.knockBackX=0;
    if (enemy.knockBackY>1)
        enemy.knockBackY-=1;
    else if (enemy.knockBackY<-1)
        enemy.knockBackY+=1;
    else
        enemy.knockBackY=0;
    let cc=characters[0];
    characters.forEach(a=>
    {
        if (Math.sqrt(Math.pow(enemy.y-a.y,2)+Math.pow(enemy.x-a.x,2))<Math.sqrt(Math.pow(enemy.y-cc.y,2)+Math.pow(enemy.x-cc.x,2)))
            cc=a;
    }
    );
    if (cc!=null&&Math.sqrt(Math.pow(enemy.y-cc.y,2)+Math.pow(enemy.x-cc.x,2))<225)//pull distance
        angle = Math.atan2(cc.y-enemy.y,cc.x-enemy.x);
    else
    {
        angle = Math.atan2(level.targetY-enemy.y,level.targetX-enemy.x);
        cc=null;
    }    
    enemy.x+=enemy.speed*Math.cos(angle)+enemy.knockBackX;
    enemy.y+=enemy.speed*Math.sin(angle)+enemy.knockBackY;
    if (cc!=null&&enemy.isWithin(cc.x,cc.y,cc.size))
    {
        if (cc.attacked(enemy))
            characters.splice(characters.indexOf(cc),1);
        enemy.x-=enemy.speed*Math.cos(angle)*50;
        enemy.y-=enemy.speed*Math.sin(angle)*50;
    }
    if (enemy.isTouching(level.targetX,level.targetY))
    {
        live-=1;
        level.enemy.splice(level.enemy.findIndex( a=> a==enemy),1);
    }
}
function spawn(level)
{
    let spawnOdds = level.enemyBasic*level.timeLastSpawn/Math.pow(level.duration,2.25);
    
    if (Math.random()<spawnOdds)
    {
        timeMult=(400-level.duration)/level.maxDuration*(level.maxTimeMult-1)+1;
        level.enemyBasic-=1;
        level.timeLastSpawn=0;
        if (Math.random()>=.5)
            level.enemy.push(new EnemyBasic(Math.random()*1800.0,-50.0,2*level.damageMult*timeMult,1.5*level.speedMult,10*level.healthMult*timeMult));
        else if (Math.random()>=.5)
            level.enemy.push(new EnemyBasic(-50.0,Math.random()*600.0,2*level.damageMult*timeMult,1.5*level.speedMult,10*level.healthMult*timeMult));  
        else
            level.enemy.push(new EnemyBasic(2000.0,Math.random()*600.0,2*level.damageMult*timeMult,1.5*level.speedMult,10*level.healthMult*timeMult));
    }
    level.timeLastSpawn+=tickRate*4;
    level.duration-=tickRate;
}
function paintBackgroundLevel()
{
    ctx.reset();
    
    //draw background here
   

    
    
}
function paintEnemy(level)
{  
    level.enemy.forEach(a=>a.paint());
}
function paintBackgroundMenu()
{
    //drawBackground here
    levels.forEach(a=>
    {
        if (levels.isFinished)
            a.drawFinishedLevel();
        else
            a.drawUnfinishedLevel();
    }
    );
}