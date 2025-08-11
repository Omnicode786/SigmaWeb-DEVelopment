/* 
  in the parameters:
  1st = element selector (CSS)
  2nd = properties to animate 
*/

gsap.to("#box1", {
    x: 1000,                   /* x axis pe move kar raha hai */
    duration: 3,
    delay: 1,                  /* 1 second ke baad start hoga */
    backgroundColor: "rgb(29, 88, 216)" ,  /* background color change */
    borderRadius: "50%",
    scale:0.5,
    rotate:360,
    
    yolo: true,
    repeat:-1
})

gsap.from("#box2", {
    x: 800,                   /* x axis pe 800 se start hoga */
    y: -40,                   /* thoda upar se start */
    duration: 3,
    delay: 1,
    rotate: 360,              /* 360 degree se spin karta hua */
    backgroundColor: "crimson", /* background crimson se start */
    borderRadius: "40px",
    scale: 0.5,
    yolo: true,
    repeat:-1


})

/* 
  gsap.to ka matlab hota hai:
  initial state se final state tak animation
  gsap.from ka matlab hota hai:
  final state se initial state tak animation
*/

gsap.to("#circle1", {
    x: 1000,
    duration: 3,
    delay: 1,
    repeat: -1,               /* infinite loop */
    yoyo: true,               /* back and forth jaise yoyo */
    rotate: 360,
    ease: "power1.inOut",     /* smooth start and end */

    /* CSS variables animate kar raha hoon colors ke liye */
    "--startColor1": "#2193b0",  
    "--endColor1": "#6dd5ed",
      borderRadius: "0px",
    scale: 0.5
})

gsap.from("#circle2", {
    x: 800,
    y: -40,
    duration: 3,
    delay: 1,
    repeat: -1,
    yoyo: true,
    rotate: 360,
    ease: "power1.inOut",

    /* same CSS vars yaha bhi animate kar raha hoon */
    "--startColor1": "#2193b0",
    "--endColor1": "#6dd5ed",
    borderRadius: "0px",
    scale: 0.5
})
