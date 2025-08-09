fetch('https://randomuser.me/api/')
.then((rawdata) => {
    console.log(rawdata);
return rawdata.json();
}).then(data => {
    console.log(data);
    console.log(people.results[0].name.first);
        
 

})
.catch(err => {
    console.log("We got and error guys!!")
    console.log(err);
})