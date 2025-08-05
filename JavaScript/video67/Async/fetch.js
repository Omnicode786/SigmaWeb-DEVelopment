async function API() {
let  x = await fetch("https://jsonplaceholder.typicode.com/todos/1");
// ruka ruka fetch kia data jesei hogya neche wala code run hgya


let data = await x.json();


}