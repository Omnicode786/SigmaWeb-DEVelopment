let container = document.querySelector(".container");
        let childcontainer = document.querySelector(".childcontainer");
        let child = document.querySelector(".child");
        container.addEventListener("click", () => {
            alert("Container was right clicked")
        })
        childcontainer.addEventListener("click", () => {
            alert("Childcontainer was right clicked")
        })
        child.addEventListener("click", () => {
            alert("Child was right clicked")
        })

// agar child pe click kia to sab me click kia tab sab me
// lag gya kuke event bubbling hota hai
// event bubbling ka matlab hai ki agar kisi element pe event hua
// to wo event uske parent elements tak bhi propagate hota hai


// in order to stop this we can use event.stopPropagation()
// agar hum event.stopPropagation() use karte hain to event sirf usi element tak
     let container2 = document.querySelector(".container2");
        let childcontainer2 = document.querySelector(".childcontainer2");
        let child2 = document.querySelector(".child2");
        container2.addEventListener("click", (e) => {
         e.stopPropagation();
            // agar hum event.stopPropagation() use karte hain to event sirf usi element
            alert("Container was right clicked")
        })
        childcontainer2.addEventListener("click", (e) => {
            e.stopPropagation();
            alert("Childcontainer was right clicked")
        })
        child2.addEventListener("click", (e) => {
            e.stopPropagation();
            alert("Child was right clicked")
        })

