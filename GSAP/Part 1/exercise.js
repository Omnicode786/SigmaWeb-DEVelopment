gsap.from("h1", {
opacity: 0,
y:30,
duration: 1,
delay: 1,

// this will target all the h1 now if we want to target one by one then 

stagger: 0.3,
// if i give it - then it will start 3 -> 2 -> 1

repeat: -1,
// ye do bar chalega aise 
// agar infinite krna heto -1 dedo 
yoyo:true,
// Because the animation includes forward + backward as one full cycle. So:

// repeat: 1 runs one extra cycle (forward + backward).

// You see:

// 1st: from (start → natural)

// 2nd: yoyo (natural → start)

// Then it stops.

// So in total, your h1 elements appear, then disappear again (due to yoyo), and stop



})