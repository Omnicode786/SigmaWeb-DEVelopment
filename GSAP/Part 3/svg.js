// to make such type of svg animations we need bezier curves
// two types
// 1quadratic curves 3 points
// 2nd cubic  curve we can make complex curves using i tit has 4 points

// d="M 10 80 Q 95 10 180 80" stroke="black" fill="transparent"

//  m is x and y axis so its 10 and y axis 80

// Q is this is quadratic curve next is 95 x and 10 on y  and then third point
//  stroke is the color of the line


let initialPath = `M 10 100 Q 250 100 490 100`;



let finalPath = `M 10 100 Q 250 100 490 100`

let main = document.querySelector("#main");

// main.addEventListener("mouseenter", (dets) => {

//             console.log("entering");
//             console.log(dets);
//             // ye dets basically jab hmne enter kia us div ke sath kia kia ghtane huin wo bhi sab kch miljayega

// })
// main.addEventListener("mouseleave", () => {

//             console.log("leaving");

// })

let isclicked = false;
main.addEventListener("mousedown" // mouse down measn the click has been initiated
    , 
    () => {
isclicked = true;
    }
)
main.addEventListener("mouseup",()=>{
isclicked= false;
})


main.addEventListener("mousemove", (dets) => {
 if (!isclicked){ 
     gsap.to("svg path", {
             attr:{d:finalPath},
               duration: 1.5,
        ease: "elastic.out(1, 0.3)" 
            
            
            })
             
    return; 
   
}
            console.log(dets);
            // this has x and y 
            //  let y = dets.offsetY;
            initialPath = `M 10 100 Q ${dets.x} ${dets.y} 490 100`,
            gsap.to("svg path", {
             attr:{d:initialPath},
             duration:0.3,
             ease:"power2.out"
             
            });

});




main.addEventListener("mouseleave", () => {
     isclicked = false;
    console.log("mouse has left")
       gsap.to("svg path", {
        attr: { d: finalPath },
        duration: 1.2,
        ease: "elastic.out(1.3, 0.3)"  
    })
})