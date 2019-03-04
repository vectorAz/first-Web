    import * as transform from "./transform";
    function bar(barobj){
        var wrap=document.querySelector("#wrap .content")
        var app = document.querySelector("#wrap .content .content-inner");
        // var app = document.querySelector("#wrap .app")
    
        var wrapstart={x:0,y:0}  //元素一开始的位置
        var toustart={x:0,y:0}  //手指一开始的位置
        var minY = 0;
        //最大滑屏距离,但是值为负
        var lastY=0;   //
        var pointY= 0;
    
        var lasttime = 0;
        var nowtime = 0;
        var pointtime = 1;
        var fgdisY = 0;
        var fgdisX = 0;
        var timemove=0;
        var isY=true;      //判断滑动方向 Y:true X:false
        var isfirst=true;  //首次防抖动
        setTimeout(function(){
            minY=wrap.clientHeight - app.offsetHeight;
        },1000)
        
        wrap.addEventListener("touchstart", function (ev) {
             clearInterval(timemove); //清除Tween算法的定时器  做到即点即停
            app.style.transition = "";
            ev = ev || event;
            var touchC = ev.changedTouches[0]
    
            wrapstart.y = transform.css(app, "translateY")
            toustart.y = touchC.clientY;
            toustart.x = touchC.clientX;
            lasttime = new Date().getTime();//得到touchstart时的时间
            lastY= touchC.clientY;
            isY=true;
            isfirst=true;
    
            pointtime=1;
            pointY=0;   //解决速度和时间的残留
                                //检验是否为函数   大小写
            if(barobj&&(typeof barobj["start"]).toLowerCase()==="function"){    //组装外部逻辑
                barobj["start"].call(app);
            }


        })
        wrap.addEventListener("touchmove", function (ev) {
            if(!isY){
                return
            }
            ev = ev || event;
            var touchC = ev.changedTouches[0]
            var fgnowY = touchC.clientY;  //手指滑动的位置
            var fgnowX = touchC.clientX;  //手指滑动的位置
            fgdisY = fgnowY - toustart.y; //手指移动的距离Y
            fgdisX = fgnowX - toustart.x; //手指移动的距离X
         
    
            var translateY = wrapstart.y + fgdisY; //元素移动后的位置
            var nowy = touchC.clientY; //鼠标当前
            nowtime = new Date().getTime(); //得到touchmove时的时间
    
            pointtime = nowtime - lasttime; //算出滑动用了多久 
            lasttime = nowtime;     //上一次的时间赋给lasttime
    
            pointY = nowy - lastY;   //y轴移动的距离
            lastY = nowy;           //
    
            if(isfirst){         //首次滑屏方向
                isfirst=false;   //置为false  在下一次touchstart之前都不   能改变isY 的值
                if(Math.abs(fgdisX)>Math.abs(fgdisY)){
                    isY=false;   //若横向距离大于竖向距离,将isY置为false,  则无法进入滑屏逻辑
                    return;
                }
            }
    
            var scale = 0; //scale是一个0-1的数,且越来越小
            if (translateY > 0) {   //超出范围后弹回, 手动橡皮筋效果
                scale = document.documentElement.clientHeight / ((document.documentElement.clientHeight + translateY) * 2);
                translateY = wrapstart.y + fgdisY * scale;
            } else if (translateY < minY) {
                var over = minY - translateY;
                scale = document.documentElement.clientHeight / ((document.documentElement.clientHeight + over) * 2);
                translateY = wrapstart.y + fgdisY * scale;
            }
    
            if(barobj&&(typeof barobj["move"]).toLowerCase()==="function"){
                barobj["move"].call(app);
            }
            transform.css(app, "translateY", translateY)
            
        })
        wrap.addEventListener("touchend", function (ev) {
            //快速滑屏
            ev = ev || event;
            var speed = pointY / pointtime;
            var time = 0;
    
           speed = Math.abs(speed) < 0.3 ? 0 : speed;
           speed=speed>15?15:speed;
           speed=speed<-15?-15:speed;
           
            time = Math.abs(speed) * 0.2;
            time = time > 2 ? 2 : time;
            time = time < 0.4 ? 0.5 : time;
            var translateY = transform.css(app, "translateY")//松手时元素滑动的距离
            var targetY = translateY + speed * 200;  //speed乘以一个系数,弹性滑屏
            var type="Linear"    //Tween算法的值 Linear:线性 
                                             // Back:回弹
             // var bsr = "";
            if (targetY > 0) {
                targetY = 0
                // bsr = "cubic-bezier(.09,1.51,.65,1.73)"
                type="Back"     //元素超出移动范围时改变Tween算法的值
            } else if (targetY < minY) {
                targetY = minY;
                // bsr = "cubic-bezier(.09,1.51,.65,1.73)"
             type="Back"
            }
            move(targetY,time,type)   
          
            if(barobj&&(typeof barobj["end"]).toLowerCase()==="function"){
                barobj["end"].call(app);;


            }
            // app.style.transition = time + "s " + bsr + "   transform";
            // transform.css(app, "translateY", targetY)


        })
    
        //即点即停主要算法逻辑
             // t: current time（当前是哪一次）；
            // b: beginning value（初始值）；
            // c: change in value（变化量）；
            // d: duration（总共多少次）。
        var Tween ={
            Linear: function(t,b,c,d){ return c*t/d + b; },
            Back:function(t,b,c,d,s){
                if (s == undefined) s = 1.70158;
                return c*((t=t/d-1)*t*((s+1)*t + s) + 1) + b;
            }
        }
       
        function move(targetY,time,type){
            var t=0;
            var b=transform.css(app,"translateY");; //元素touchStart的位置
            var c=targetY-b;   //元素终点位置-start位置  变化量
            var d=(time*1000)/(1000/60);     //变化所需时间除以一次的时间                                   得到次数
            
          timemove=setInterval(function(){
            t++;      
            if(t>d){   //快速滑屏结束
                clearInterval(timemove)   //当变化到T次大于总变化次数时,清除定时器
                if(barobj&&(typeof barobj["over"]).toLowerCase()==="function"){
                    barobj["over"].call(app);;
                    
                }
                return;
            }
    
            transform.css(app,"translateY",Tween[type](t,b,c,d))
            if(barobj&&(typeof barobj["move"]).toLowerCase()==="function"){
                barobj["move"].call(app);;
            }


          },1000/60)
    
        }
    
    }
   export{
       bar
   }
