import *as transform from "./transform";

    var cantent = document.querySelectorAll("#wrap .content .tap-wrap .tap-cantent");
    //滑屏元素
    var tapnode = document.querySelector("#wrap .content .tap-wrap");
    var loding = document.querySelectorAll("#wrap .content .tap-wrap  .tap-cantent .loding")

    // var cannode = document.querySelector("#wrap .content")
    //  cannode.style.transform="translateY(-350px)"


    for (var i = 0; i < loding.length; i++) {
        loding[i].style.height = cantent[0].offsetHeight + "px";
    }

    //视口(为了获取其宽度)
    for (var i = 0; i < cantent.length; i++) {
        cantent[i].index = 0;  //循环的为每个cantent绑index  防止index共用
        moveBy(cantent[i])
    }
    function moveBy(cantent) {

        transform.css(cantent, "translateX", -tapnode.clientWidth);  //2个loding和主体内容横向排列  直接将包裹元素移动一个视口元素的宽度
        //一上来显示主体内容
        var elePoints = { x: 0, y: 0 }   //元素的初始位置
        var starPoints = { x: 0, y: 0 }  //手指的初始位置
        var isX = true;           
        var isfirst = true;
        var dis = { x: 0, y: 0 }
        cantent.addEventListener("touchstart", function (ev) {
            ev = ev || event;
            if (cantent.isJump) {
                return
            }
            var touch = ev.changedTouches[0];
            cantent.style.transition = ""
            elePoints.x = transform.css(cantent, "translateX");
            starPoints.x = touch.clientX;
            starPoints.y = touch.clientY;
            isX = true;
            isfirst = true;

        })
        cantent.addEventListener("touchmove", function (ev) {
            if (!isX) {
                return;
            }
            if (cantent.isJump) {
                return
            }
            ev = ev || event;
            var touch = ev.changedTouches[0];
            var nowPoints = { x: 0, y: 0 }

            nowPoints.x = touch.clientX;
            nowPoints.y = touch.clientY;
            dis.x = nowPoints.x - starPoints.x;
            dis.y = nowPoints.y - starPoints.y;

            if (isfirst) {
                isfirst = false;
                if (Math.abs(dis.y) > Math.abs(dis.x)) {
                    isX = false
                }
            }

            var w = elePoints.x + dis.x
            // cantent.style.transform="translateX("+w+"px)"
            transform.css(cantent, "translateX", w); //自定义的方法
            jump(dis.x, cantent)
            //2分之一跳转

        })
        cantent.addEventListener("touchend", function (ev) {
            ev = ev || event;
            if (cantent.isJump) {
                return;
            }
            if (Math.abs(dis.x) <= tapnode.clientWidth / 2) {
                cantent.style.transition = "1s transform";
                transform.css(cantent, "translateX", -tapnode.clientWidth)
            }
        })
    }
    //2分之一跳转
    function jump(disX, cantent) {
        if (Math.abs(disX) > tapnode.clientWidth / 2) {
            var smallg = cantent.parentNode.querySelector(".tap-nav .smallg") //这里要通过其父节点拿才能拿到对应的
            var anode = cantent.parentNode.querySelectorAll(" .tap-nav ul li")
            var loding = cantent.querySelectorAll(".tap-wrap  .tap-cantent .loding")

            cantent.isJump = true;
            cantent.style.transition = "1s transform"
            if (disX > 0) {
                transform.css(cantent, "translateX", 0);

            } else if (disX < 0) {
                transform.css(cantent, "translateX", -2 * tapnode.clientWidth);

            }
            cantent.addEventListener("transitionend", end);
        }


        function end() {
            cantent.removeEventListener("transitionend", end)

            for (var i = 0; i < loding.length; i++) {
                loding[i].style.opacity = 1;
            }
            //loding图逻辑在滑屏元素结束动作后触发
            disX > 0 ? cantent.index-- : cantent.index++;
            anode = document.querySelectorAll("#wrap .content .tap-wrap .tap-nav ul li")
            if (cantent.index < 0) {
                cantent.index = anode.length - 1
            } else if (cantent.index > anode.length - 1) {
                cantent.index = 0;
            }
            // console.log(smallg,anode);
            smallg.style.width = anode[cantent.index].offsetWidth + "px"
            transform.css(smallg, "translateX", anode[cantent.index].offsetLeft)


            setTimeout(function () {


                var arr = [
                    ["./img/g.jpg", "./img/g.jpg", "./img/g.jpg", "./img/g.jpg", "./img/g.jpg", "./img/g.jpg"],
                    ["./img/h.jpg", "./img/h.jpg", "./img/h.jpg", "./img/h.jpg", "./img/h.jpg", "./img/h.jpg"],
                    ["./img/g.jpg", "./img/g.jpg", "./img/g.jpg", "./img/g.jpg", "./img/g.jpg", "./img/g.jpg"],
                    ["./img/h.jpg", "./img/h.jpg", "./img/h.jpg", "./img/h.jpg", "./img/h.jpg", "./img/h.jpg"],
                    ["./img/g.jpg", "./img/g.jpg", "./img/g.jpg", "./img/g.jpg", "./img/g.jpg", "./img/g.jpg"],
                    ["./img/h.jpg", "./img/h.jpg", "./img/h.jpg", "./img/h.jpg", "./img/h.jpg", "./img/h.jpg"],
                ]

                var img = cantent.querySelectorAll(".tap-wrap .tap-cantent ul  li .top a img ")  //通过其父节点去拿才能拿到对应的

                console.log(arr[cantent.index]);

                for (var i = 0; i < img.length; i++) {
                    img[i].src = arr[cantent.index][i];
                }
                //将滑屏元素拉回来
                cantent.style.transition = "";
                transform.css(cantent, "translateX", -tapnode.clientWidth);
                cantent.isJump = false;
            }, 2000)

        }

    }
