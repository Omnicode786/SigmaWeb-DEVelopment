async function API() {
let  x = await fetch("https://jsonplaceholder.typicode.com/todos/1");
let data = await x.json();


}