gsap.to("#page2 h1", {
    transform:"translateX(-180%)",
    scrollTrigger:{
        trigger:"#page2",
        scroller:"body",
        markers:true,
        start: "top 0%",
// rules jab ham rukjayen
// jab ham pin ue krenge by thgat i mean ke jab ham scroll krna chahen to pagee whin rukjaye to ham trigger krenge parent ko 
// in this case page2

end:"top -100%",
scrub:2,
pin:true
// ab usi pr rhega 

     }
})