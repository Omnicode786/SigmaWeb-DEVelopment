let box1 = document.querySelector("#box1");
console.log(box1);
box1.style.backgroundColor= "red";

box1.style.color= "white";box1.style.fontSize = "30px";
// java script se jab style dete hen to wo inline style hota he
// inline style ka matlab he ki wo css ke andar nahi likha hota
// simialry 

let container = document.querySelector(".container");

container.children[2].style.backgroundColor = "green";

// another way to thsi couldve been 
let boxes = document.getElementsByClassName("box");
// agar me docment  querry sle milta to khali or khali box 1 milta kuke wo st child he box ka

// agar sare karne honge to phir querry selector all krna hoga or ye html collection return krega
// ab agr in  
        
// sab me changes karne honge to hume loop chalana padega
// jese for each loop ya for of loop
// for of loop is better because it works on all iterables
let boxes2 = document.querySelectorAll(".box");
for (let box of boxes) {
    box.style.border = "8px solid var(--glass-border)";
}
// simialrly we can also use for each loop

boxes2.forEach(element => {
    element.style.color = "white";
    element.style.fontSize = "20px";
    element.style.borderRadius = "20px";
    
});

boxes[4].style.backgroundColor = "cyan";

let box4 = document.getElementById("box4");

// in this way we can arget an element by its id

box4.style.backgroundColor = "purple";
box4.style.color = "white";

