let explanation = document.querySelector(".explanation p");

let img = document.querySelector(".imagecontainer img");
let title = document.querySelector(".title");
let apiKEY = "247OA0KcEBUcVYk5XgNWacrWxh61DbKHU1VqqxPJ";
async function GetAPOD() {

    let response = await fetch(`https://api.nasa.gov/planetary/apod?api_key=${apiKEY}`);
    let data = await response.json();
    console.log(json);
    return data;
}

async function updateui() {
        let data = await GetAPOD();
        explanation.innerHTML = data.explanation;
        title.innerHTML = data.title;
        img.src = data.url;
}
updateui();