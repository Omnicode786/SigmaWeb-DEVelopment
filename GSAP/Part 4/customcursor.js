let main = document.querySelector("#main");

let cursor = document.querySelector("#cursor");
let imageDiv = document.querySelector("#image-container");

main.addEventListener("mousemove", (dets) => {
gsap.to(cursor, {
    x:dets.x,
    y:dets.y,
    duratio:1,
    ease:"back.out"
})
})

imageDiv.addEventListener("mouseenter", () => {
     cursor.innerHTML  = "View More";
    gsap.to(cursor, {
        scale:3,
        duration:0.1,
        backgroundColor: "#ffffffe4",
       
    })
})

imageDiv.addEventListener("mouseleave", () => {
     cursor.innerHTML  = "";
    gsap.to(cursor, {
        scale:1,
        duration:0.1,
        backgroundColor: "#fff",
       
    })
})