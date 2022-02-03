var step =2;
var planest = 'thePlane';
var upMove = 87;
var downMove = 83;
var leftMove =65;
var rightMove =68;

var goingUp = false;
var goingDown = false;
var goingLeft = false;
var goingRight = false;
var edge_up=600;

// var Constances = {
//     STEP : 10,
//     W_KEYCODE :87,
//     edge_up:600,
//     edge_down: 10,
// }
// 后面可以使用Contances.STEP 

// 帧 24 人眼不可以分辨


function findId(id){
    return document.getElementById(id);
}

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
        // var y = findId(planest).style.bottom;
        // y = y.replace('px', '')-0;


        // var y = getY(findId(planest));
        // console.log(y+10);
        // goingUp = true;
        // if(y<600){
        //     y+=step;
            
        // }
        
        // findId(planest).style.bottom = y + 'px';
        setY(findId(planest), y);
    }
    if(a == downMove){

        var y = getY(findId(planest));

        console.log(y+10);
        if(y>10){
            y -= step;
        }
       
        setY(findId(planest), y);
    }

    if(a == leftMove){
        var y = getX(findId(planest));

        console.log(y+10);
        if(y>10){
            y -= step;
        }
       
        setX(findId(planest), y);
    }

    if(a == rightMove){
        var y = getX(findId(planest));
        console.log(y+10);
        if(y<270){
            y +=step;
        }
       
        setX(findId(planest), y);
    }

}


// 设置游戏的帧动画定时器

var gameInternel = setInterval(function(){
    if(goingUp){
        var y = getY(findId(planest));
   
        if(y <edge_up){
            y+=step;
        }
        setY(findId(planest), y);
    }
})



function keyupEvent (e){
    console.log('release');
    var ev = e || window.event;
    var keyCode = ev.keyCode;
    if(ev  = upMove){
        console.log("release")
         goingUp = false;
    }
}



//另外的定时器可以让图片爆炸并消失 类似于闭包
setInterval(function(){
    var enemies = document.getElementsByClassName('enemy');
    for(var j =0 ;j< enemies.length;j++){
        // if(enemies[i].src == "./img/boom_small.png" && enemies.length != 0){
        if(enemies[i].src.indexOf ("./img/boom_small.png" && enemies.length != 0)){
            findId('galax').removeChild(enemies[i]);
        }

    }


}, 2000)

//扫描全局的子弹



