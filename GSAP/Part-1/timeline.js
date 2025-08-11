// gsap.to("#box1", {
//     x:1200,
// durtion: 1.5,
// delay:1


// })
// gsap.to("#box2", {
//     x:1200,
// durtion: 1.5,
// delay:2.5


// })
// gsap.to("#box3", {
//     x:1200,
// durtion: 1.5,
// delay:4,
// borderRadius: "50%"


// })


// this is very redundant

// TIMELINE

let tl  = gsap.timeline();

tl.to("#box1", {
     x:1200,
 durtion: 1,
 delay:0.5
 })
 tl.to("#box2", {
     x:1200,
 durtion: 1,
 delay:0.5
 })
 tl.to("#box3", {
     x:1200,
 durtion: 1,
 delay:0.5,
 borderRadius: "50%",
 scale:0.8

 })