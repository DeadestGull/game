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
        this.timeLastSpawn=20;
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
    paint()
    {
    
        ctx.beginPath();
        ctx.ellipse(this.x, this.y, this.size, this.size, 0, 0, 2 * Math.PI);
        ctx.fill();
    }
    isTouching(x,y)
    {
        return (Math.sqrt(Math.pow(this.x-x,2)+Math.pow(this.y-y,2))<this.size);
    }
}
let inMenu=true;
let mouseX=-1;
let mouseY=-1;
let live=10;
addEventListener("click",onClick);
addEventListener("mousemove",onMouseMove);
let levels=[
    new Level(500,500,100,400.0,1,1,1,5,900,500)
];
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
}
function goToMap()
{
    paintBackgroundMenu();
}
function startLevel(level)
{
    inMenu=false;
    ctx.clearRect(0,0,c.clientWidth,c.clientHeight);
    setInterval(function(){onTick(level)},50);
}
async function onTick(level)
{
    paintBackgroundLevel();
    if (level.duration>0&&level.enemyBasic>0)
        spawn(level);
    level.enemy.forEach(a=>moveEnemy(a,level));
    paintEnemy(level);
}
function moveEnemy(enemy,level)
{
    
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
    let spawnOdds = level.enemyBasic*level.timeLastSpawn/Math.pow(level.duration,2);
    if (Math.random()<spawnOdds)
    {
        timeMult=(400-level.duration)/level.maxDuration*(level.maxTimeMult-1)+1;
        console.log(level.duration);
        level.enemyBasic-=1;
        level.timeLastSpawn=0;
        if (Math.random()>=.5)
            level.enemy.push(new Enemy(Math.random()*1910.0,0.0,1*level.damageMult*timeMult,2*level.speedMult,10*level.healthMult*timeMult));
        else
            level.enemy.push(new Enemy(-50.0,Math.random()*900.0,1*level.damageMult*timeMult,2*level.speedMult,10*level.healthMult*timeMult));
        
    }
    level.timeLastSpawn+=.2;
    level.duration-=.05;
}
function paintBackgroundLevel()
{
    ctx.clearRect(0,0,c.clientWidth,c.clientHeight);
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
