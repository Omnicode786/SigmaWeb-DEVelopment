

function getData(){
return new Promise((resolve,reject) => {
    setTimeout (() => {
        resolve(455);
    }, 5000)
})


}



console.log("loading data");
console.log("loading charactr data");
console.log("loading mean dta");

let data = getData();

console.log(data);
// data ayega hi ni 
// jab tak promise resolve ni hoti 
// neche ka sara code chal jayega because java script is async \
//  to stop this behavou we use async

// there is anohter method
data.then((a) => {
    console.log(a);
    console.log("Data has been recieved")
})

// if we dont watch this approach


// lets just make a asybc


console.log("process data");

// await function use krne kelie hame ise pehle hame in sab ko 
//  aik asunc function me wrap krna parega



function getData2(){
    return new Promise((resolve,reject) => {
    setTimeout (() => {
        resolve(455);
    }, 5000)
})
}

async function main() {
    console.log("I am inside the async function");
    console.log("I am also under the water brrr");
    let data2 = await getData2();

}