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
