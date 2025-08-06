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