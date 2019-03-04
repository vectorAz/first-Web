/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 3);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return css; });

    function css(node,type,val){
        if(arguments.length >= 3){
            //设置操作
            var text ="";
            if(!node.transform){ 
                node.transform ={}
            }
            node.transform[type] = val;

            for(var item in node.transform){
                switch (item)  {
                    case "translateX":
                    case "translateY":
                    case "translateZ":
                        text+= item+"("+node.transform[item]+"px)";
                        break;

                    case "rotateX":
                    case "rotateY":
                    case "rotateZ":
                    case "rotate":
                        text+= item+"("+node.transform[item]+"deg)";
                        break;

                    case "scale":
                        text+= item+"("+node.transform[item]+")";
                        break;
                }
            }

            node.style.transform = text;
        }else if(arguments.length === 2){
            //读取操作
            val = node.transform?node.transform[type]:undefined;

            if(val === undefined){
                val = 0;
                if(type === "scale"){
                    val = 1;
                }
            }
            return val;
        }else{
            throw new Error("该函数至少需要2个参数")
        }
    }

  

/***/ }),
/* 1 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return bar; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__transform__ = __webpack_require__(0);
    
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
    
            wrapstart.y = __WEBPACK_IMPORTED_MODULE_0__transform__["a" /* css */](app, "translateY")
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
            __WEBPACK_IMPORTED_MODULE_0__transform__["a" /* css */](app, "translateY", translateY)
            
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
            var translateY = __WEBPACK_IMPORTED_MODULE_0__transform__["a" /* css */](app, "translateY")//松手时元素滑动的距离
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
            var b=__WEBPACK_IMPORTED_MODULE_0__transform__["a" /* css */](app,"translateY");; //元素touchStart的位置
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
    
            __WEBPACK_IMPORTED_MODULE_0__transform__["a" /* css */](app,"translateY",Tween[type](t,b,c,d))
            if(barobj&&(typeof barobj["move"]).toLowerCase()==="function"){
                barobj["move"].call(app);;
            }


          },1000/60)
    
        }
    
    }
   


/***/ }),
/* 2 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return course; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__transform__ = __webpack_require__(0);


    function course(arr) {
        var wrapC = document.querySelector(".course-wrap");
        if(!wrapC){
            return;
        }

        //����html�ṹ
        var wrapC = document.querySelector(".course-wrap");
        var ulNode = document.createElement("ul");
        __WEBPACK_IMPORTED_MODULE_0__transform__["a" /* css */](ulNode,"translateZ",0)
        var liNodes = document.querySelectorAll(".course-wrap > .list > li")
        var wrapP = document.querySelector(".course-wrap > .course-point");



        //�޷� && �Զ��ֲ�
        var pointsLength = arr.length;
        var needWF = wrapC.getAttribute("needWF")
        var needAuto = wrapC.getAttribute("needAuto");
        needAuto= needAuto==null?false:true;
        needWF  = needWF==null?false:true;
        if(needWF){
            arr = arr.concat(arr);
        }
        ulNode.size =arr.length;

        //����ͼƬ�б�
        ulNode.classList.add("list");
        for(var i=0;i<arr.length;i++){
            ulNode.innerHTML+="<li><img src= "+(arr[i])+"></li>";
        }
        wrapC.appendChild(ulNode);

        //��̬����ʽ
        var styleNode = document.createElement("style");
        styleNode.innerHTML=".course-wrap > .list{width: "+arr.length+"00%}";
        styleNode.innerHTML+=".course-wrap > .list > li{width: "+(100/arr.length)+"%;}";
        document.head.appendChild(styleNode);


        //�����߼�
        var eleStartX = 0; // Ԫ��һ��ʼ��λ��
        var eleStartY = 0; // Ԫ��һ��ʼ��λ��
        var startX = 0;    // ��ָһ��ʼ��λ��
        var startY = 0;    // ��ָһ��ʼ��λ��
        var index = 0;    //  ��ָ̧��ʱul��λ��

        //������
        var isFirst = true;
        var isX = true;  // true:x   false:y

        wrapC.addEventListener("touchstart",function (ev) {
            //�嶨ʱ��
            clearInterval(ulNode.timer);

            //�����
            ulNode.style.transition="";
            ev = ev || event;
            var touchC = ev.changedTouches[0];


            /*�޷��߼�
                �����һ���һ��ʱ �����ڶ���ĵ�һ��
                ����ڶ������һ��ʱ ������һ������һ��*/
            if(needWF){
                var whichPic = __WEBPACK_IMPORTED_MODULE_0__transform__["a" /* css */](ulNode,"translateX") / document.documentElement.clientWidth;
                if(whichPic === 0){
                    whichPic = -pointsLength;
                }else if (whichPic === 1-arr.length){
                    whichPic = 1-pointsLength;
                }
                __WEBPACK_IMPORTED_MODULE_0__transform__["a" /* css */](ulNode,"translateX",whichPic*document.documentElement.clientWidth)
            }

            //Ԫ��һ��ʼλ�õĻ�ȡһ��Ҫ���޷�λ�ó�ʼ�����
            eleStartX =__WEBPACK_IMPORTED_MODULE_0__transform__["a" /* css */](ulNode,"translateX");
            eleStartY =__WEBPACK_IMPORTED_MODULE_0__transform__["a" /* css */](ulNode,"translateY");
            startX = touchC.clientX;
            startY = touchC.clientY;

            isX = true;
            isFirst = true;
        })
        wrapC.addEventListener("touchmove",function (ev) {

            //���Ź�   ���Ķ��ǵڶ���֮��Ķ���
            if(!isX){
                //ҧס
                return;
            }


            ev = ev || event;
            var touchC = ev.changedTouches[0];
            var nowX = touchC.clientX;
            var nowY = touchC.clientY;

            var disX = nowX - startX;
            var disY = nowY - startY;

            /*������:
                ���ֲ�ͼ�� ����û��״λ����ķ�����x��  ���ֲ�ͼ��������������������
                ���ֲ�ͼ�� ����û��״λ����ķ�����y��  ������ҳ����������ǲ�����������*/


            if(isFirst){
                isFirst = false;
                if(Math.abs(disY) > Math.abs(disX)){
                    //��y���ϻ�
                    isX=false;
                     return; // �״���Y���ϻ�  �״η�����
                }
            }

           __WEBPACK_IMPORTED_MODULE_0__transform__["a" /* css */](ulNode,"translateX",eleStartX + disX);
        })
        wrapC.addEventListener("touchend",function () {
            ulNode.style.transition=".5s transform";
            //index ����ul��λ��
            index = Math.round(__WEBPACK_IMPORTED_MODULE_0__transform__["a" /* css */](ulNode,"translateX") / document.documentElement.clientWidth);

            //���Ƴ���
            if(index>0){
                index=0;
            }else if(index < 1-arr.length){
                index =  1-arr.length;
            }

            //СԲ��
            smallPointMove(index);

            //index ����ul��λ��
            __WEBPACK_IMPORTED_MODULE_0__transform__["a" /* css */](ulNode,"translateX",index*document.documentElement.clientWidth);

            //���¿����Զ��ֲ�
            if(needAuto&&needWF){
                autoMove(ulNode,index);
            }
        })


        //СԲ��
        smallPoint(pointsLength);

        //�Զ��ֲ�
        if(needAuto&&needWF){
            autoMove(ulNode,index);
        }
    }

    function autoMove(ulNode,autoFlag) {
        //var timer = 0;
        //var autoFlag = 0; // ����ul��λ��

        move();
        function move() {
            clearInterval(ulNode.timer);
            ulNode.timer = setInterval(function () {
                autoFlag--;
                ulNode.style.transition=".7s transform linear";
                __WEBPACK_IMPORTED_MODULE_0__transform__["a" /* css */](ulNode,"translateX",autoFlag*document.documentElement.clientWidth);

                //СԲ��
                smallPointMove(autoFlag)
            },1000)
        }

        ulNode.addEventListener("transitionend",function () {
            if(autoFlag <= 1-ulNode.size){
                autoFlag=-((ulNode.size)/2-1);
                ulNode.style.transition="";
                __WEBPACK_IMPORTED_MODULE_0__transform__["a" /* css */](ulNode,"translateX",autoFlag*document.documentElement.clientWidth);
            }
        })
    }
    function smallPoint(pointsLength){
        var wrapP = document.querySelector(".course-wrap > .course-point");
        wrapP.pointsLength =pointsLength;
        if(wrapP){
            for(var i=0;i<pointsLength;i++){
                if(i==0){
                    wrapP.innerHTML+="<span class='active'></span>";
                }else {
                    wrapP.innerHTML+="<span></span>";
                }
            }
        }
    }
    function smallPointMove(index){
        var wrapP = document.querySelector(".course-wrap > .course-point");
        if(wrapP){
            var points = wrapP.querySelectorAll("span");
            for(var i=0;i<points.length;i++){
                points[i].classList.remove("active");
            }
            points[-index%wrapP.pointsLength].classList.add("active")
        }
    }

    

/***/ }),
/* 3 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__js_bese__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__js_bese___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__js_bese__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__js_head__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__js_head___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1__js_head__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__js_transform__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__js_move__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__js_moveYJ__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__js_roll__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__js_slide__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__js_gdlb__ = __webpack_require__(8);











/***/ }),
/* 4 */
/***/ (function(module, exports) {

(function(){
    var wrapnode=document.querySelector("#wrap");
    wrapnode.addEventListener("touchstart",function(ev){
        ev=ev||event;
        ev.preventDefault();
    })
//禁止事件默认行为

    var style=document.createElement("style");
    var w=document.documentElement.clientWidth/16;
    style.innerHTML="html{font-size:"+w+"px!important}"
    document.head.appendChild(style)
})()
//rem适配


/***/ }),
/* 5 */
/***/ (function(module, exports) {

(function(){
    var pdnode=document.querySelector(".head .head-top .pd")
    var mask=document.querySelector(".head .head-top .mask")
    var wrap=document.querySelector("#wrap")
    var pdnode=document.querySelector(".head .head-top .pd")
    var input=document.querySelector(".head .head-bottom .input")
    var button=document.querySelector(".head .head-bottom .button")
    var flag=false;//代表隐藏
    pdnode.addEventListener("touchstart",function(ev){
        ev=ev||event;
        if(!flag){
            mask.classList.add("active")
            pdnode.classList.add("active")
        flag=!flag
        }else if(flag){
            mask.classList.remove("active")
            pdnode.classList.remove("active")
        flag=!flag

        }
        ev.stopPropagation();
    })
    wrap.addEventListener("touchstart",function(){
        
        if(flag){
            mask.classList.remove("active")
            pdnode.classList.remove("active");
            flag=!flag;
        } 
    })
    mask.addEventListener("touchstart",function(ev){
        ev=ev||event;
        ev.stopPropagation();
    })

    input.addEventListener("touchstart",function(ev){
        ev=ev||event;
        this.focus();
        ev.stopPropagation();
    })
    wrap.addEventListener("touchstart",function(){
       input.blur();
    })

})()

/***/ }),
/* 6 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__transform__ = __webpack_require__(0);
    
    
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

        listartX = __WEBPACK_IMPORTED_MODULE_0__transform__["a" /* css */](linode, "translateX")
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

        __WEBPACK_IMPORTED_MODULE_0__transform__["a" /* css */](linode, "translateX", translateX)
        
    })
    nav.addEventListener("touchend", function (ev) {
        ev = ev || event;
        var speed = pointX / pointtime;
        var time = "";

        speed = Math.abs(speed) < 0.3 ? 0 : speed;
        time = Math.abs(speed) * 0.2;
        time = time > 2 ? 2 : time;
        time=time < 0.4 ? 0.5 : time;

        var translateX = __WEBPACK_IMPORTED_MODULE_0__transform__["a" /* css */](linode, "translateX")
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
        __WEBPACK_IMPORTED_MODULE_0__transform__["a" /* css */](linode, "translateX", targetX)

    })

    change()
    function change() {
        var nav = document.querySelector("#wrap .content .nav");
        var linode = document.querySelector("#wrap .content .nav .item")
        var nodes = document.querySelectorAll("#wrap .content .nav .item li")
        nav.addEventListener("touchstart",function(){
            nav.isMoved=false;
        })
        nav.addEventListener("touchmove",function(){
            nav.isMoved=true;
        })
        if(!nav.isMoved){
                for (var i = 0; i < nodes.length; i++) {
                    //先循环的跟每个i绑事件
                    nodes[i].addEventListener("touchend", function () {
                        //再循环跟每个i加事件行为
                        for(var i=0;i<nodes.length;i++){
                           nodes[i].classList.remove("active")
                       }
                       this.classList.add("active")
                    })
        
                }
        }
    }




/***/ }),
/* 7 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__transform__ = __webpack_require__(0);


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

        __WEBPACK_IMPORTED_MODULE_0__transform__["a" /* css */](cantent, "translateX", -tapnode.clientWidth);  //2个loding和主体内容横向排列  直接将包裹元素移动一个视口元素的宽度
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
            elePoints.x = __WEBPACK_IMPORTED_MODULE_0__transform__["a" /* css */](cantent, "translateX");
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
            __WEBPACK_IMPORTED_MODULE_0__transform__["a" /* css */](cantent, "translateX", w); //自定义的方法
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
                __WEBPACK_IMPORTED_MODULE_0__transform__["a" /* css */](cantent, "translateX", -tapnode.clientWidth)
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
                __WEBPACK_IMPORTED_MODULE_0__transform__["a" /* css */](cantent, "translateX", 0);

            } else if (disX < 0) {
                __WEBPACK_IMPORTED_MODULE_0__transform__["a" /* css */](cantent, "translateX", -2 * tapnode.clientWidth);

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
            __WEBPACK_IMPORTED_MODULE_0__transform__["a" /* css */](smallg, "translateX", anode[cantent.index].offsetLeft)


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
                __WEBPACK_IMPORTED_MODULE_0__transform__["a" /* css */](cantent, "translateX", -tapnode.clientWidth);
                cantent.isJump = false;
            }, 2000)

        }

    }


/***/ }),
/* 8 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__transform__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__slide__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__moveYJ__ = __webpack_require__(1);





var arr = ["./img/1.jpg", "./img/2.jpg", "./img/3.jpg", "./img/4.jpg", "./img/5.jpg"];
__WEBPACK_IMPORTED_MODULE_1__slide__["a" /* course */](arr);

//滚动条的逻辑
var bar=document.querySelector("#wrap .bar")
var panrant=document.querySelector("#wrap .content .content-inner")
var Wcontent=document.querySelector("#wrap .content");
var scale=0;
setTimeout(function(){
    scale= document.documentElement.clientHeight/panrant.offsetHeight;
    //高度
    bar.style.height= document.documentElement.clientHeight*scale+"px";

},200)

//定义滚动条的逻辑  在竖向滑屏时触发
var barobj={
    start:function(){  //回调函数
     bar.style.opacity=1;
    },
    move:function(){
    bar.style.opacity = 1;
    
    //滚动条位移的距离/视口的高度=元素的位移的距离/元素位移的最大距离
    var scale=__WEBPACK_IMPORTED_MODULE_0__transform__["a" /* css */](this,"translateY")/(this.offsetHeight-Wcontent.clientHeight);
    
    var Y=(document.documentElement.clientHeight-bar.offsetHeight)*scale;
   
    __WEBPACK_IMPORTED_MODULE_0__transform__["a" /* css */](bar,"translateY",-Y)
    },
    end:function(){
        // bar.style.opacity = 0;
    },
    over:function(){
        bar.style.opacity=0;
    }
}
__WEBPACK_IMPORTED_MODULE_2__moveYJ__["a" /* bar */](barobj);

/***/ })
/******/ ]);