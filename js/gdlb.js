import *as transform from "./transform";
import * as slide from "./slide";
import * as sxhp from "./moveYJ";


var arr = ["./img/1.jpg", "./img/2.jpg", "./img/3.jpg", "./img/4.jpg", "./img/5.jpg"];
slide.course(arr);

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
    var scale=transform.css(this,"translateY")/(this.offsetHeight-Wcontent.clientHeight);
    
    var Y=(document.documentElement.clientHeight-bar.offsetHeight)*scale;
   
    transform.css(bar,"translateY",-Y)
    },
    end:function(){
        // bar.style.opacity = 0;
    },
    over:function(){
        bar.style.opacity=0;
    }
}
sxhp.bar(barobj);