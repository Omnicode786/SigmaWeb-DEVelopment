// async use krke async ko bhi sync behave krwaskte hen


// async always return a promise



// fwetch has mny rewquests

//  it can be a get request 
        // data retrieve
// can be a post request
            // data create / post

// can be a push request
            // data update
// data rdelete is data remove

async function getdata() {

    // fetch is normally just get request
    
    let response =await fetch("https://jsonplaceholder.typicode.com/posts");
//    agar ham await ni krenge to khud socha data aya 4 second me ab 
// fetch to he hi async code mtlb neche wala code chal jayega
// to isis lie ham await ka use krte hen
   
// ab agar ham is data ko partse kren to 
let x = await response.json();
// json hone me bhi time lgta he

    console.log(response);
    console.log(x);
}

// scenatio

// prepare url /api endpoint ke fetch bhala krna heto kaha se krna he

// now go their fetch the data basically a network call

// now we process data

getdata();


// POST METHod


const myheaders = new Headers();
myheaders.append("Content-Type", "application/json");

const url = "https://jsonplaceholder.typicode.com/posts";

const options = {
    method:"POST",
    body:JSON.stringify({username: "Muzammil Alam"}),
    headers: myheaders
}

async function  postData1() {

    let response = await fetch(url,options);
    let data = await response.json();
    console.log("Post data: ",data);

}


async function   getData1() {

    let response = await fetch(url);
    let data = await response.json();
    console.log("Get data: ",data);

}

// getData1();
postData1();
setTimeout(() => {
getData1();
}, 5000);
// getData1();


// ❓ WHY POSTED DATA IS NOT VISIBLE AFTER GET REQUEST
// -----------------------------------------------------------

// 📌 Situation:
// In this project, we are using the API: 
//   https://jsonplaceholder.typicode.com/posts

// We are doing two things:
// 1. GET request → To retrieve the list of posts
// 2. POST request → To send (create) a new post with a username

// ✅ When we POST data:
// Example:
//     { username: "Muzammil Alam" }

// The API responds with:
//     { username: "Muzammil Alam", id: 101 }

// This makes it look like the data has been saved and assigned a new ID.

// ❌ But here’s the twist:
// When we do a GET request again after posting, 
// our newly posted data (with id: 101) is NOT in the response.

// 🧠 WHY?
// Because jsonplaceholder.typicode.com is a FAKE API 
// designed only for testing and learning purposes.

// It simulates (fakes) the response for POST, PUT, DELETE, etc.
// But it doesn’t actually modify any real data on the server.

// This is confirmed in their official docs:
// > "Resources will not be really updated on the server but it will be faked as if."

// 📌 Conclusion:
// POSTing data gives a fake successful response,
// but the data is NOT stored permanently.
// This API is for learning fetch(), async/await, etc.
// Not for building apps with real persistent data.

// 💡 For real data storage:
// Use a real backend (Node.js, Firebase, Supabase) 
// or testing APIs like:
// - https://crudcrud.com/
// - https://reqres.in/
// - https://mockapi.io/

// -----------------------------------------------------------
// */