
let astronauts = document.querySelector(".number");



async function FetchSpaceAPI() {
    let response = await fetch('http://api.open-notify.org/astros.json');
    console.log(response);
    let data =await response.json();
    console.log(data);
    return data;
}
FetchSpaceAPI();


let maininfo = document.querySelector(".maininfo");

async function updateui(){
    let data =await  FetchSpaceAPI();
    astronauts.innerHTML = data.number
    data.people.forEach(person => {
               maininfo.innerHTML +=   ` <div class="people">
                <div class="name">Name:${person.name}</div>
                <div class="craft">Craft: ${person.craft}</div>
            </div>`
    });


}

updateui();




// gsap stuffs

gsap.from(".heading", {
  y: -100,
  opacity: 0,
  duration: 1.2,
  ease: "power3.out",
  onComplete: () => {
    gsap.set(".heading", { clearProps: "transform" }); 
  }
});