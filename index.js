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
    }
    isTouching(x,y)
    {
        return (Math.sqrt(Math.pow(this.x-x,2)+Math.pow(this.y-y,2))<this.size);
    }
}
class EnemyBasic extends Enemy
{
    paint()
    {
        ctx.beginPath();
        ctx.ellipse(this.x, this.y, this.size, this.size, 0, 0, 2 * Math.PI);
        ctx.fill();
    }
}
class Character
{
    constructor(x,y,damage,attackSpeed,size,health)
    {
        this.x=x;
        this.y=y;
        this.health=health;
        this.damage=damage;
        this.attackSpeed=attackSpeed;
        this.hover=true;
        this.size=size;
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
    
}
class Earth1 extends Character
{
    constructor(x,y)
    {
        super(x,y,1,2,35,10);
        this.cost=100;
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
        ctx.fillStyle="brown";
        ctx.arc(this.x, this.y, this.size, 0, 2 * Math.PI);
        ctx.fill();
        ctx.globalAlpha = 1;
        ctx.fillStyle="black";
    }
}
class Earth2 extends Character
{
    constructor(x,y)
    {
        super(x,y,5,3,45,55);
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
        ctx.fillStyle="brown";
        ctx.arc(this.x, this.y, this.size, 0, 2 * Math.PI);
        ctx.fill();
        ctx.globalAlpha = 1;
        ctx.fillStyle="black";
    }
}
class Earth3 extends Character
{
    constructor(x,y)
    {
        super(x,y,1,.5,35,20);
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
        ctx.fillStyle="brown";
        ctx.arc(this.x, this.y, this.size, 0, 2 * Math.PI);
        ctx.fill();
        ctx.globalAlpha = 1;
        ctx.fillStyle="black";
    }
}


let inMenu=true;
let mouseX=-1;
let mouseY=-1;
let live=10;
let money=500000;
let buyMenu=false;
addEventListener("click",onClick);
addEventListener("mousemove",onMouseMove);
let levels=[
    new Level(500,500,150,400.0,1,1,1,5,1000,850)
];
let characters=[];
let characterHover=null;
goToMap();
function onMouseMove(event)
{
    mouseX=event.clientX;
    mouseY=event.clientY;
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
        
        if (e.clientX-8>=1763&&e.clientX-8<=1812&&e.clientY-8>=400&&e.clientY-8<=500&&money>=100)//buy Earth 1
            characterHover = new Earth1(mouseX,mouseY);

        if (e.clientX-8>=1813&&e.clientX-8<=1862&&e.clientY-8>=400&&e.clientY-8<=500&&money>=100)//buy Earth 2
            characterHover = new Earth2(mouseX,mouseY);
        
        if (e.clientX-8>=1863&&e.clientX-8<=1912&&e.clientY-8>=400&&e.clientY-8<=500&&money>=100)//buy Earth 3
            characterHover = new Earth3(mouseX,mouseY);
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
    setInterval(function(){onTick(level)},20);
}
function onTick(level)
{
    paintBackgroundLevel();
    if (level.duration>0&&level.enemyBasic>0)
        spawn(level);
    level.enemy.forEach(a=>moveEnemy(a,level));
    paintEnemy(level);
    moveCharacters();
    paintCharacters();
    paintMenu();
}
function paintMenu()
{
    if (buyMenu)
    {
        ctx.beginPath();
        ctx.strokeStyle="brown";
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
    let cc=characters[0];
    characters.forEach(a=>
    {
        if (Math.sqrt(Math.pow(enemy.y-a.y,2)+Math.pow(enemy.x-a.x,2))<Math.sqrt(Math.pow(enemy.y-cc.y,2)+Math.pow(enemy.x-cc.x,2)))
            cc=a;
    }
    );
    console.log(cc);
    if (cc!=null&&Math.sqrt(Math.pow(enemy.y-cc.y,2)+Math.pow(enemy.x-cc.x,2))<225)//pull distance
        angle = Math.atan2(cc.y-enemy.y,cc.x-enemy.x);
    else
        angle = Math.atan2(level.targetY-enemy.y,level.targetX-enemy.x);
    enemy.x+=enemy.speed*Math.cos(angle);
    enemy.y+=enemy.speed*Math.sin(angle);
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
            level.enemy.push(new EnemyBasic(Math.random()*1800.0,-50.0,1*level.damageMult*timeMult,.75*level.speedMult,10*level.healthMult*timeMult));
        else if (Math.random()>=.5)
            level.enemy.push(new EnemyBasic(-50.0,Math.random()*600.0,1*level.damageMult*timeMult,.75*level.speedMult,10*level.healthMult*timeMult));  
        else
            level.enemy.push(new EnemyBasic(2000.0,Math.random()*600.0,1*level.damageMult*timeMult,.75*level.speedMult,10*level.healthMult*timeMult));
    }
    level.timeLastSpawn+=.08;
    level.duration-=.02;
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