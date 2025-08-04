// Step 1: Chain multiple actions using then()
function getData() {
    return new Promise(function(resolve, reject) {
        setTimeout(() => {
            resolve("Step 1: Data fetched");
        }, 1000);
    });
}

// Step 2: Chaining the .then()
getData()
    .then(function(result) {
        console.log(result);
        return "Step 2: Processed data";
    })
    .then(function(nextStep) {
        console.log(nextStep);
        return "Step 3: Displayed data";
    })
    .then(function(finalStep) {
        console.log(finalStep);
    })
    .catch(function(error) {
        console.log("Error occurred:", error);
    });

/*
🔗 Chain har .then() mein return hota hai jo next then() mein jata hai
🚨 Agar kisi bhi step mein reject ya error ho to catch() trigger hoga
*/

