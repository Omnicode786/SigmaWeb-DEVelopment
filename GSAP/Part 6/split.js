let mainHeading = "Muzammil Alam";
let heading = document.querySelector("h1");

let splittedText = mainHeading.split("")
console.log(splittedText)
clutter = ``;
let halfofheading = splittedText.length / 2;
splittedText.forEach((elem , index) => {
    if(index < halfofheading){
clutter +=`<span class="a">${elem}</span>`
    }
    else{
clutter +=`<span class="b">${elem}</span>`
        
    }

})

heading.innerHTML = clutter;

gsap.from("h1 .a", {
    y:40,
    duration:0.6,
    delay:0.2,
    stagger:0.15,
    opacity:0



})

gsap.from("h1 .b", {
    y:40,
    duration:0.6,
    delay:0.2,
    stagger:-0.15,
    opacity:0


})