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