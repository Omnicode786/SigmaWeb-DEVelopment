async function headers() {
    let fethced = await fetch('https://reqres.in/api/users', {

        method: 'POST',
        headers: {
            // essentially we need to tell hte browser what type of data we are sending
            'Content-Type': 'application/json',
            'x-api-key': 'reqres-free-v1'


        },
body: JSON.stringify({
    name: "Muzammil",

    age: 24
})

    }
    )
let data = await fethced.json();
console.log(data);
}
headers();

async function getdata() {
        let fethced = await fetch('https://reqres.in/api/users',{
            method:'GET',
            headers:{
                'x-api-key': 'regres-free-v1'
            }
 } )
        let data = await fethced.json()
    console.log(data)
    }   


setTimeout(() => {
    getdata();
}, 500);