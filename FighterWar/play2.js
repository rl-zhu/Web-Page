var step = 8;
var bulletStep = 8;
var planest = 'thePlane';
var upMove = 87;
var downMove = 83;
var leftMove = 65;
var rightMove = 68;
var goingUp = false;
var goingDown = false;
var goingLeft = false;
var goingRight = false;
var edge_up = 700;
var enemyWidth = 50;
var enemyHeight = 40;
var bullethight = 6;
var bulletwidth = 12;
var enemyStep = 2;
var time = 0;


function findId(id) {
    return document.getElementById(id);
}
// get the postion of objects
function getY(findid) {
    return findid.style.bottom.replace('px', '') - 0;
}

function getX(findid) {
    return findid.style.left.replace('px', '') - 0;
}

function setY(findid, y) {
    return findid.style.bottom = y + 'px';
}

function setX(findid, y) {
    return findid.style.left = y + 'px';
}


// identify the keys and align the events
function keydownEvent(e) {

    var ev = e || window.event;

    var a = ev.keyCode;
    console.log(a);

    if (a == upMove) {
        goingUp = true;
    }
    if (a == downMove) {

        goingDown = true;
    }

    if (a == leftMove) {
        goingLeft = true;
    }

    if (a == rightMove) {
        goingRight = true;

    }

}


// timer
var gameInternel = setInterval(function () {
    if (goingUp) {
        var y = getY(findId(planest));

        if (y < edge_up) {
            y += step;
        }
        setY(findId(planest), y);
    }
    if (goingDown) {
        var y = getY(findId(planest));

        if (y > 10) {
            y -= step;
        }
        setY(findId(planest), y);
    }
    if (goingLeft) {
        var y = getX(findId(planest));

        if (y > 10) {
            y -= step;
        }
        setX(findId(planest), y);
    }
    if (goingRight) {
        var y = getX(findId(planest));

        if (y < 250) {
            y += step;

        }
        setX(findId(planest), y);
    }

    // send bullets
    var bullets = document.getElementsByClassName('bullet');
    if (bullets) {
        for (var i = 0; i < bullets.length; i++) {
            var y = getY(bullets[i]) + bulletStep;
            //    destory bullets
            if (y > edge_up) {
                findId('galax').removeChild(bullets[i]);
                continue;
            }
            setY(bullets[i], y);

            //touch 
            var enemies = document.getElementsByClassName('enemy');
            for (var j = 0; j < enemies.length; j++) {
                var x1 = getX(enemies[j]);
                var y1 = getY(enemies[j]);
                var x2 = getX(bullets[i]);

                var y2 = y;
                console.log(x1 + '  ' + x2);
                var x_dis = Math.abs(x1 - x2);
                if (x_dis < enemyWidth && Math.abs(y - y1) < bullethight) {

                    console.log('touch');
                    enemies[j].src = "./img/boom_small.png";

                    (function (enemy) {
                        setTimeout(function () {

                            if (enemies.length > 0) {
                                console.log('come in the boom');
                                findId('galax').removeChild(enemy);
                            }

                        }, 50);
                    })(enemies[j]);
                }
            }
        }
    }
    time += 0.05;
}, 42)

function keyupEvent(e) {
    var ev = e || window.event;
    var keyCode = ev.keyCode;
    if (ev = upMove) {
        goingUp = false;
    }
    if (ev = downMove) {
        goingDown = false;
    }
    if (ev = leftMove) {
        goingLeft = false;
    }
    if (ev = rightMove) {
        goingRight = false;
    }

}


// set the interval when new enermies appear
setInterval(function () {
    var bulletX = getX(findId(planest)) + 28;

    var bulletY = getY(findId(planest)) + 48;
    findId('galax').innerHTML += " <img class=\"bullet\" style=\"width:2%; position: absolute;left:" + bulletX + "px;bottom: " + bulletY + "px;\"src=\"img/shell.png\">";

}, 500)

// enemyMove
setInterval(function () {
    var enemies = document.getElementsByClassName('enemy');
    for (var i = 0; i < enemies.length; i++) {
        var y = getY(enemies[i]) - enemyStep;
        setY(enemies[i], y);
        if (y < 0 - enemyHeight) {
            findId('galax').removeChild(enemies[i]);
        }
    }
    var suiji = Math.floor(Math.abs(10 * Math.random()));
    var suiji2 = suiji % 2;
    if (enemies[suiji] && suiji2 == 1) {
        var x = getX(enemies[suiji]);
        x = x + 30 * Math.cos(time);
        setX(enemies[suiji], x);

        (function (enemy) {
            setTimeout(function () {
                var x = getX(enemies[suiji]);
                x = x + 30 * Math.cos(time);
                setX(enemies[suiji], x);
            }, 50);
        })(enemies[suiji]);

        if (suiji % 2 == 0) {
            (function (enemy) {
                setTimeout(function () {
                    var x = getX(enemies[suiji]);
                    x = x + 30 * Math.cos(time);
                    setX(enemies[suiji], x);

                }, 50);
            })(enemies[suiji]);
        }
    }
}, 40)


setInterval(function () {
    var x = Math.floor(300 * Math.random());
    findId('galax').innerHTML += "<img class=\"enemy\" style=\"left: " + x + "px;z-index: 1;bottom: 600px; width: 50px;\" src=\"./img/enemy_small.png\"/>";
}, 1000)

