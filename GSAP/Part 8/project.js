


var nav = gsap.timeline();
nav.from(".topbar h1", {
    y: 30,
    duration: 0.3,
    delay: 0.5,
    opacity: 0
});
nav.from(".part2 h4", {
    y: 30,
    duration: 0.35,
    opacity: 0,
    stagger: 0.15
});
nav.from(".part2 button", {
    y: 30,
    duration: 0.55,
    opacity: 0,
});


gsap.from(".center-part1 h1", {
    x: "-80%",
    duration: 1.5,
    opacity:0,
    delay:0.5,
    ease:"power3.out"
})
gsap.from(".center-part2", {
      x: "80%",
    duration: 1.1,
    opacity:0,
    delay:0.5,
    ease:"power3.out"
})
gsap.from(".center-part1 p", {
    y: "80%",
    duration: 1.5,
    opacity:0,
    delay:0.5,
    ease:"power2.out"
})
gsap.from(".center-part1 button", {
    y:"90%",
    duration:1.5,
    opacity:0,
    delay:0.5,
    ease:"power3.out"
})

//    scrollTrigger: {
//         trigger: ".section2",
//         start: "top 80%", // when top of section2 is 80% down the viewport
//         end: "top 30%",   // adjust to control when reverse happens
//         scrub: 2,
//         markers: true,
//     }


var tl = gsap.timeline(
    {

   scrollTrigger: {
        trigger: ".section2",
        start: "top 80%", // when top of section2 is 80% down the viewport
        end: "top 30%",   // adjust to control when reverse happens
        scrub: 3,
        markers: true,
    }
});
tl.from(".services", {
    y:30,
    duration:0.2,
    opacity:0,


})
tl.from(".elem.line1.left", {
    x:"-100%",
    duration:1,
    opacity:0
}, "anim1")
tl.from(".elem.line1.right", {
    x:" 100%",
    duration:1,
    opacity:0

},"anim1")

tl.from(".elem.line2.left", {
    x:"-100%",
    duration:1,
    opacity:0

}, "anim2")
tl.from(".elem.line2.right", {
    x:" 100%",
    duration:1,
    opacity:0

},"anim2")



// window.addEventListener("wheel", function(event){
 
// if (event.deltaY > 0) {
//          gsap.to(".marque",{
//             transform: "translateX(-200%)",
//             duration:2,
//             ease:"none",
//             repeat:-1
//         })
//            gsap.to(".marque .arrow", {
//             rotate:-180
//         })
// }
// else{
//         gsap.to(".marque",{
//             transform: "translateX(0)",
//             duration:2,
//             ease:"none",
//             repeat:-1
//         })
//         gsap.to(".marque .arrow", {
//             rotate:0
//         })
// }


// })

window.addEventListener("wheel", (event)=> {
    if (event.deltaY > 0) {
        gsap.to(".arrow",{
            rotate:-180
        })
        
    }
    else{
           gsap.to(".arrow",{
            rotate:0
        })
    }
})