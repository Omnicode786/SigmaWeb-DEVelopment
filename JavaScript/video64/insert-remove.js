  let check =    document.querySelector(".container")
     check.innerHTML =  "I am a container"
     console.log(check.hasAttribute("id"));
     console.log(check.getAttribute("id"));
     check.setAttribute("style","background-color: red")
     check.setAttribute("id","checked");

    //  we can change id and other classes types of things like this
    // we can changeany attriute

     console.log(check.getAttribute("id"))
        let body = document.querySelector("body");
        console.log(body.attributes);
        check.removeAttribute("style")
console.log(check.dataset)
let div = document.createElement("div");
div.setAttribute("class","inserted-elem");
div.innerHTML = "I am a div who was inserted through js"
check.append(div)

check.classList.add("Added-class-through-js")
// simialrly we can remove them

check.classList.remove("Added-class-through-js")

check.classList.toggle("Added-class-through-js")
// agr lgi ni he to lag jayegi agr lgi wi he to hat jayegi
