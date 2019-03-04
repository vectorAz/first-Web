import *as transform from "./transform";

var nav = document.querySelector("#wrap .content .nav");
var linode = document.querySelector("#wrap .content .nav .item")

var listartX = 0; //元素起始
var fgstartX = 0; //手指起始
var minX = nav.clientWidth - linode.offsetWidth;

var lastX = 0;
var pointX = 0;
var lasttime = 0;
var nowtime = 0;
var pointtime = 1;
var fgdisX = 0;
nav.addEventListener("touchstart", function (ev) {
    linode.style.transition = "";
    ev = ev || event;
    var touchC = ev.changedTouches[0]

    listartX = transform.css(linode, "translateX")
    fgstartX = touchC.clientX;
    lasttime = new Date().getTime();
    lastX = touchC.clientX;


})
nav.addEventListener("touchmove", function (ev) {
    ev = ev || event;
    var touchC = ev.changedTouches[0]
    var fgnowX = touchC.clientX;  //手指滑动时的位置
    fgdisX = fgnowX - fgstartX; //手指移动的距离

    var translateX = listartX + fgdisX; //元素移动后的位置
    var nowX = touchC.clientX; //鼠标当前
    nowtime = new Date().getTime();

    pointtime = nowtime - lasttime
    lasttime = nowtime;

    pointX = nowX - lastX;
    lastX = nowX;

    var scale = 0; //scale是一个0-1的数,且越来越小
    if (translateX > 0) {
        scale = document.documentElement.clientWidth / ((document.documentElement.clientWidth + translateX) * 2);
        translateX = listartX + fgdisX * scale;
    } else if (translateX < minX) {
        var over = minX - translateX;
        scale = document.documentElement.clientWidth / ((document.documentElement.clientWidth + over) * 2);
        translateX = listartX + fgdisX * scale;
    }

    transform.css(linode, "translateX", translateX)

})
nav.addEventListener("touchend", function (ev) {
    ev = ev || event;
    var speed = pointX / pointtime;
    var time = "";

    speed = Math.abs(speed) < 0.3 ? 0 : speed;
    time = Math.abs(speed) * 0.2;
    time = time > 2 ? 2 : time;
    time = time < 0.4 ? 0.5 : time;

    var translateX = transform.css(linode, "translateX")
    var targetX = translateX + speed * 200;

    var bsr = "";
    if (targetX > 0) {
        targetX = 0
        bsr = "cubic-bezier(.09,1.51,.65,1.73)"
    } else if (targetX < minX) {
        targetX = minX;
        bsr = "cubic-bezier(.09,1.51,.65,1.73)"
    }

    linode.style.transition = time + "s " + bsr + "   transform";
    transform.css(linode, "translateX", targetX)

})

change()
function change() {
    var nav = document.querySelector("#wrap .content .nav");
    var linode = document.querySelector("#wrap .content .nav .item")
    var nodes = document.querySelectorAll("#wrap .content .nav .item li")
    nav.addEventListener("touchstart", function () {
        nav.isMoved = false;
    })
    nav.addEventListener("touchmove", function () {
        nav.isMoved = true;
    })
    if (!nav.isMoved) {
        for (var i = 0; i < nodes.length; i++) {
            //先循环的跟每个i绑事件
            nodes[i].addEventListener("touchend", function () {
                //再循环跟每个i加事件行为
                for (var i = 0; i < nodes.length; i++) {
                    nodes[i].classList.remove("active")
                }
                this.classList.add("active")
            })

        }
    }
}


