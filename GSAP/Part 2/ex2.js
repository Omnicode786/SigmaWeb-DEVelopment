gsap.from("#page1 .box", {
    scale:0,
    delay:1,
    duration:2,
    rotate:360
})


// gsap.from("#page2 .box", {
//     scale:0,
//     delay:1,
//     duration:1,
//     rotate:360,
//     scrollTrigger: "#page2 .box"
// })

gsap.from("#page3 .box", {
    scale:0,
    delay:1,
    duration:1,
    rotate:360,
    scrollTrigger:  //properties of scroll trigger
    {
        trigger:"#page3 .box",
        scroller:"body",
        markers:true,
       start: "top 60%"
        // when the scroller start hit th scroll then we get this

    }
})

gsap.from("#page2 h1", {
    opacity:0 ,
    duration:1,
    x:500,
    scrollTrigger: {
        trigger:"#page2 h1",
        scroller: "body",
        markers:true,
        start: "top 50%"
    }
})
gsap.from("#page2 h2", {
    opacity:0 ,
    duration:1.5,
    x:-500,
    scrollTrigger: {
        trigger:"#page2 h2",
        scroller: "body",
        markers:true,
        start: "top 50%"
    }
})



 gsap.from("#page4 .box", {
     scale:0,
     delay:1,
     duration:1,
     rotate:360,
     scrollTrigger: {
        trigger: "#page4 .box",
        triggerscroller: "body",
        markers:true,
        start: "top 60%",
        end: "top 30%",
        // scrub:true
        scrub:1
        // two ways 
        // boolearn or number 1-5 depending on smoothness
        // depends upon the scroller start and scroller end
     }
 })