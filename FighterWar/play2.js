var step =8;
var  bulletStep = 8;
var planest = 'thePlane';
var upMove = 87;
var downMove = 83;
var leftMove =65;
var rightMove =68;

var goingUp = false;
var goingDown = false;
var goingLeft = false;
var goingRight = false;
var edge_up=700;
var enemyWidth = 50;
var enemyHeight = 40;
var bullethight= 6;
var bulletwidth = 12;
var enemyStep = 2;
var time = 0;


function findId(id){
    return document.getElementById(id);
}
// function findClass(id){
//     return document.getElementsByClassName(id);
// }

function getY(findid){
   return findid.style.bottom.replace('px','')-0;
}

function getX(findid){
    return findid.style.left.replace('px','')-0;
 }
 
 function setY(findid, y){
     return findid.style.bottom = y +'px';
 }

 function setX(findid, y){
    return findid.style.left = y +'px';
}



function keydownEvent (e){
    // console.log(Event);
    // alert('aaaa');
    // var ev =  e || event ;
    var ev = e || window.event;
    // console.log(ev);
    var a = ev.keyCode;
    console.log(a);

    if(a == upMove){
        goingUp = true;
    }
    if(a == downMove){

        goingDown = true;
    }

    if(a == leftMove){

        goingLeft = true;
    }

    if(a == rightMove){
        goingRight = true;
 
    }

}







// 设置游戏的帧动画定时器
var gameInternel = setInterval(function(){
    if(goingUp){
        var y = getY(findId(planest));
   
        if(y<edge_up){
            y+=step;
        }
        setY(findId(planest), y);
    }
    if(goingDown){
        var y = getY(findId(planest));
   
        if(y>10){
            y-=step;
        }
        setY(findId(planest), y);
    }
    if(goingLeft){
        var y = getX(findId(planest));

        if(y>10){
            y -= step;
        }
        setX(findId(planest), y);
    }
    if(goingRight){
        var y = getX(findId(planest));

        if(y<250){
            y +=step;

        }
        setX(findId(planest), y);
    }
    
    // 发送子弹
    var bullets = document.getElementsByClassName('bullet'); //得到array
    if(bullets){
        for(var i =0; i < bullets.length; i++){
        //    setY (bullets[i],getY(bullets[i])+bulletStep);
        var y = getY(bullets[i])+bulletStep;
        // console.log('getX(bullets[i])'+getX(bullets[i]));
        //    销毁子弹
        if(y > edge_up){
            //注意，是removeChild
            findId('galax').removeChild(bullets[i]);
            continue;
        }
        setY(bullets[i], y);

        //碰撞检测+子弹+飞机
        var enemies = document.getElementsByClassName('enemy');
        for(var j =0 ;j< enemies.length;j++){
                var x1 = getX(enemies[j]);
                var y1 = getY(enemies[j]);
                var x2 = getX(bullets[i]);
                // console.log(getX(bullets[i]));
                var y2 = y;
                console.log(x1+'  '+x2);
                // console.log(Math.abs(x1-x2))
                // 两数相减==enemy的width
                var x_dis =Math.abs(x1-x2);

                //无敌 || false
                if( x_dis< enemyWidth && Math.abs(y-y1)<bullethight){
                    // alert();
                    console.log('touch');
                    enemies[j].src ="./img/boom_small.png";
                    // findId('galax').removeChild(enemies[j]);
                   
                   
                    //1000ms 之后已经找不到了，interval为42ms
                    // lock the enemies[j]
                    (function(enemy){
                    setTimeout(function(){
                        
                        if (enemies.length > 0){
                            console.log('come in the boom');
                            findId('galax').removeChild(enemy);
                        }
                        
                    },50); })(enemies[j]);
                    //闭包
                    //也可以在setInterval外面，设置一个setInterval，每100s去做remove
    
                }
            }
        }
    }
    time += 0.05;

}, 42)

function keyupEvent (e){

    var ev = e || window.event;
    var keyCode = ev.keyCode;
    if(ev  = upMove){

         goingUp = false;
    }
    if(ev  = downMove){
         goingDown = false;
    }
    if(ev  = leftMove){
         goingLeft = false;
    }
    if(ev  = rightMove){
         goingRight = false;
    } 
    
}


// setTimeout only once 
// 产生子弹

setInterval(function(){
    var bulletX = getX(findId(planest))+28;
    // console.log('bulletX'+bulletX);
    var bulletY = getY(findId(planest))+48;

    // findId(planest).innerHTML += " <img class=\"bullet\" style=\"width:20%; position: absolute;left:22px;bottom: "+bulletY+"px;\"src=\"img/shell.png\">";
    // 也可以用.appendChild
    findId('galax').innerHTML += " <img class=\"bullet\" style=\"width:2%; position: absolute;left:"+ bulletX+"px;bottom: "+bulletY+"px;\"src=\"img/shell.png\">";
    // console.log('not success')
}, 500)

// enemyMove
setInterval(function(){
    var enemies = document.getElementsByClassName('enemy');
    for(var i = 0; i < enemies.length; i++){
        var y = getY(enemies[i]) - enemyStep;
        setY(enemies[i], y);
        if(y < 0 - enemyHeight ){
            findId('galax').removeChild(enemies[i]);
            // return;
        }

        //     var x = getX(enemies[i]);
        //     x = x+ 11* Math.sin(time); 
        //     setX(enemies[i], x);     
        // // 问题在于没有确定是哪个enemy，所以所有的enemy会一起移动
        // // if(Math.sin(Math.random()*100)>0){
        // //     var x = getX(enemies[i]);
        // //     x = x+ 11* Math.sin(time); 
        // //     setX(enemies[i], x);          
        // // }

       
    }
    var suiji= Math.floor(Math.abs(10*Math.random()));
    var suiji2 = suiji%2; 
    // var suiji = Math.sin(Math.random());
    if(enemies[suiji] && suiji2 ==1){
        var x = getX(enemies[suiji]);
        x = x+ 30* Math.cos(time); 
        setX(enemies[suiji], x);  
       
        (function(enemy){
            setTimeout(function(){
                var x = getX(enemies[suiji]);
                x = x+ 30* Math.cos(time); 
                setX(enemies[suiji], x);  
                
            },50); })(enemies[suiji]);

            if (suiji %2 ==0){
                (function(enemy){
                    setTimeout(function(){
                        var x = getX(enemies[suiji]);
                        x = x+ 30* Math.cos(time); 
                        setX(enemies[suiji], x);  
                        
                    },50); })(enemies[suiji]);
            }
    }
}, 40)





// //另外的定时器可以让图片爆炸并消失 类似于闭包
// setInterval(function(){
//     var enemies = document.getElementsByClassName('enemy');
//     for(var j =0 ;j< enemies.length;j++){
//         // if(enemies[i].src == "./img/boom_small.png" && enemies.length != 0){
//             console.log('炸到了'+enemies[j].src.indexOf("./img/boom_small.png"));
//         if(enemies[j].src.indexOf("./img/boom_small.png") ){
//             findId('galax').removeChild(enemies[j]);
//             console.log('炸到了啊啊啊啊啊啊');
//         }

//     }


// }, 1000)

// //扫描全局的子弹

//多个飞机
setInterval(function(){
    var x = Math.floor(300*Math.random());
    // var roll = true;
    // if(Math.floor(Math.random()*100)){
    //     roll = false;
    // }else{
    //     roll = true;
    // }
    // console.log(roll);
    // findId ('galax').innerHTML += "<img roll=\""+roll+"\" class=\"enemy\" style=\"left: "+x+"px;z-index: 1;bottom: 600px; width: 50px;\" src=\"./img/enemy_small.png\"/>";
    findId ('galax').innerHTML += "<img class=\"enemy\" style=\"left: "+x+"px;z-index: 1;bottom: 600px; width: 50px;\" src=\"./img/enemy_small.png\"/>";
}, 1000)

// // ——————————另一种飞行的飞机————————
// setInterval(function(){
//     var enemies = document.getElementsByClassName('enemy2');
//     for(var i = 0; i < enemies.length; i++){
//         var y = getY(enemies[i]) - enemyStep;
//         setY(enemies[i], y);
//         if(y < 0 - enemyHeight ){
//             findId('galax').removeChild(enemies[i]);
//             // return;
//         }   
//     }
//     var suiji= Math.floor(Math.abs(10*Math.random()));
//     var suiji2 = suiji%2; 
//     // var suiji = Math.sin(Math.random());
//     if(enemies[suiji] && suiji2 ==1){
//         var x = getX(enemies[suiji]);
//         x = x+ 30* Math.cos(time); 
//         setX(enemies[suiji], x);  
       
//         (function(enemy){
//             setTimeout(function(){
//                 var x = getX(enemies[suiji]);
//                 x = x+ 30* Math.cos(time); 
//                 setX(enemies[suiji], x);  
                
//             },50); })(enemies[suiji]);

//             if (suiji %2 ==0){
//                 (function(enemy){
//                     setTimeout(function(){
//                         var x = getX(enemies[suiji]);
//                         x = x+ 30* Math.cos(time); 
//                         setX(enemies[suiji], x);  
                        
//                     },50); })(enemies[suiji]);
//             }
//     }

    

// }, 55)

// //多个飞机
// setInterval(function(){
//     var x = Math.floor(300*Math.random());

//     findId ('galax').innerHTML += "<img class=\"enemy2\" style=\"left: "+x+"px;z-index: 1;bottom: 600px; width: 50px;\" src=\"./img/boom_big.png\"/>";
// }, 1000)