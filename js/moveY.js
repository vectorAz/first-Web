(function () {
    var wrap=document.querySelector("#wrap .content")
    var app = document.querySelector("#wrap .content .content-inner");
    // var app = document.querySelector("#wrap .app")

    var wrapstart={x:0,y:0}  //元素一开始的位置
    var toustart={x:0,y:0}  //手指一开始的位置
    var minY = 0;
    //最大滑屏距离,但是值为负
    var lastY=0;
    var pointY= 0;

    var lasttime = 0;
    var nowtime = 0;
    var pointtime = 1;
    var fgdisY = 0;

    var isY=true;      //判断滑动方向 Y:true X:false
    var isfirst=true;  //首次防抖动
    setTimeout(function(){
        minY=wrap.clientHeight - app.offsetHeight;
    console.log(app.offsetHeight);

    },1000)
    
    wrap.addEventListener("touchstart", function (ev) {
      
        app.style.transition = "";
        ev = ev || event;
        var touchC = ev.changedTouches[0]

        wrapstart.y = transform.css(app, "translateY")
        toustart.y = touchC.clientY;
        toustart.x = touchC.clientX;
        lasttime = new Date().getTime();
        lastY= touchC.clientY;
        isY=true;
        isfirst=true;

        pointtime=1;
        pointY=0;   //解决速度和时间

    })
    wrap.addEventListener("touchmove", function (ev) {
        if(!isY){
            return
        }
        ev = ev || event;
        var touchC = ev.changedTouches[0]
        var fgnowY = touchC.clientY;  //手指滑动的位置
        var fgnowX = touchC.clientX;  //手指滑动的位置
        fgdisY = fgnowY - toustart.y; //手指移动的距离
        fgdisX = fgnowX - toustart.x; //手指移动的距离
     

        var translateY = wrapstart.y + fgdisY; //元素移动后的位置
        var nowy = touchC.clientY; //鼠标当前
        nowtime = new Date().getTime();

        pointtime = nowtime - lasttime
        lasttime = nowtime;

        pointY = nowy - lastY;
        lastY = nowy;

        if(isfirst){
            isfirst=false;
            if(Math.abs(fgdisX)>Math.abs(fgdisY)){
                isY=false;
                return;
            }
        }



        var scale = 0; //scale是一个0-1的数,且越来越小
        if (translateY > 0) {
            scale = document.documentElement.clientHeight / ((document.documentElement.clientHeight + translateY) * 2);
            translateY = wrapstart.y + fgdisY * scale;
        } else if (translateY < minY) {
            var over = minY - translateY;
            scale = document.documentElement.clientHeight / ((document.documentElement.clientHeight + over) * 2);
            translateY = wrapstart.y + fgdisY * scale;
        }

        transform.css(app, "translateY", translateY)
        
    })
    wrap.addEventListener("touchend", function (ev) {
        //快速滑屏的
        ev = ev || event;
        var speed = pointY / pointtime;
        var time = 0;

        speed = Math.abs(speed) < 0.3 ? 0 : speed;
       speed=speed>15?15:speed;
       speed=speed<-15?-15:speed;
       
        time = Math.abs(speed) * 0.2;
        time = time > 2 ? 2 : time;
        time = time < 0.4 ? 0.5 : time;
        var translateY = transform.css(app, "translateY")
        var targetY = translateY + speed * 100;

        var bsr = "";
        if (targetY > 0) {
            targetY = 0
            bsr = "cubic-bezier(.09,1.51,.65,1.73)"
        } else if (targetY < minY) {
            targetY = minY;
            bsr = "cubic-bezier(.09,1.51,.65,1.73)"
        }
        
        app.style.transition = time + "s " + bsr + "   transform";
        transform.css(app, "translateY", targetY)

    })



})()