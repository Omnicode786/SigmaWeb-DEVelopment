// 🧠 Let's understand how callbacks work first — the old school way!

function fetchDataFromServer(callback) {
    console.log("Fetching data from server...");

    setTimeout(() => {
        console.log("Data fetched ✅");
        callback("Here is your data 🤓");
    }, 2000);
}

// 👇 We pass a function as an argument (callback)
fetchDataFromServer((data) => {
    console.log("Callback says:", data);
});



// 🚀 Now let's understand Promises — the modern cool way

let prom = new Promise((resolve, reject) => {
    let success = true;

    setTimeout(() => {
        if (success) {
            resolve("🎉 Promise resolved!");
        } else {
            reject("💥 Promise rejected!");
        }
    }, 1500);
});

prom.then((msg) => {
    console.log("Then block:", msg);
}).catch((err) => {
    console.log("Catch block:", err);
});




// 🔗 Promise Chaining - When one task depends on another

function add(x) {
    return new Promise((resolve) => {
        setTimeout(() => resolve(x + 1), 1000);
    });
}

add(1)
    .then((result) => {
        console.log("First addition:", result);
        return add(result);
    })
    .then((result) => {
        console.log("Second addition:", result);
        return add(result);
    })
    .then((result) => {
        console.log("Third addition:", result);
    });




// 🎯 Promise.all() — waits for ALL promises to resolve (or ANY to reject)

let p1 = new Promise((res) => setTimeout(() => res("🔥 P1 done"), 2000));
let p2 = new Promise((res) => setTimeout(() => res("🌊 P2 done"), 3000));
let p3 = new Promise((res) => setTimeout(() => res("🌪️ P3 done"), 1000));

Promise.all([p1, p2, p3])
    .then((values) => {
        console.log("All done ✔️", values); // All results in array
    })
    .catch((err) => {
        console.log("One of them failed ❌", err);
    });




// ⚔️ Promise.race() — whoever wins (resolves/rejects) FIRST wins the race!

let r1 = new Promise((res) => setTimeout(() => res("🏁 R1 won"), 3000));
let r2 = new Promise((res, rej) => setTimeout(() => rej("🛑 R2 failed first"), 1000));
let r3 = new Promise((res) => setTimeout(() => res("✅ R3 done"), 2000));

Promise.race([r1, r2, r3])
    .then((result) => {
        console.log("Race Winner:", result);
    })
    .catch((err) => {
        console.log("Race Error:", err); // If first settled was reject
    });




// 🌈 Promise.allSettled() — Gives you results of all, no matter if failed or succeeded

let s1 = new Promise((res) => setTimeout(() => res("S1 ✅"), 1000));
let s2 = new Promise((_, rej) => setTimeout(() => rej("S2 ❌"), 1500));

Promise.allSettled([s1, s2])
    .then((results) => {
        console.log("All Settled:");
        console.log(results); // Array of objects with status: 'fulfilled' or 'rejected'
    });




// 🧯 Promise.any() — Resolves as soon as **any** one promise resolves

let a1 = new Promise((_, rej) => setTimeout(() => rej("A1 fails ❌"), 1000));
let a2 = new Promise((res) => setTimeout(() => res("A2 wins 🥳"), 2000));
let a3 = new Promise((_, rej) => setTimeout(() => rej("A3 fails too ❌"), 500));

Promise.any([a1, a2, a3])
    .then((val) => {
        console.log("Any resolved:", val); // Only first successful one
    })
    .catch((err) => {
        console.log("All failed 😵‍💫", err);
    });




// 🧪 Custom processing function — real-life scenario combining fetch & processing

function fetchData() {
    return new Promise((res) => {
        setTimeout(() => {
            console.log("📦 Data fetched");
            res([10, 20, 30]);
        }, 1500);
    });
}

function processData(data) {
    return new Promise((res) => {
        let doubled = data.map((x) => x * 2);
        res(doubled);
    });
}

fetchData()
    .then((data) => {
        console.log("➡️ Processing...");
        return processData(data);
    })
    .then((processed) => {
        console.log("📊 Processed Data:", processed);
    });
