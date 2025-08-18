
let menu = document.querySelector("#nav i");
let close = document.querySelector("#full i");


let tl = gsap.timeline();


tl.to("#full", {
    right:"0",
    duration:0.5,
})

tl.from("#full h4", {
    x:150,
    duration:0.2,
    stagger:0.1,
    opacity:0
})
tl.from("#full i", {
    opacity:0,
    duration:0.2
})

tl.pause();
/* timeline has properties like pause reverse resume etc */
menu.addEventListener("click",function(){
    tl.play()
});

close.addEventListener("click",function(){
    tl.reverse()
});