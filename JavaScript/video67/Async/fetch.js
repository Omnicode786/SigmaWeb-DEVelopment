async function API() {
let  x = await fetch("https://jsonplaceholder.typicode.com/todos/1");
// ruka ruka fetch kia data jesei hogya neche wala code run hgya


// fetch api aik promise return krta he then ham usko parse krte hen or wo bhi aik promise return krta he

let data = await x.json();
// ab ham iske json hone ka wait kr rhe hen
// json data ko objectify kr deta he
console.log(data);
console.log(data.id);
// as thsi was not an array of objects
console.log(data.title);


}

API();

// promise ka settle hone ka mtlb he eitehr wo resolve hojaye or reject hojaye
// reolve means settled succesfully
// reject measn not settled succesffuly
