const prom1 = Promise.resolve("1️⃣ First done");
const prom2 = Promise.resolve("2️⃣ Second done");
const prom3 = Promise.resolve("3️⃣ Third done");

Promise.all([prom1, prom2, prom3])
    .then(results => {
        console.log("✅ All completed:");
        console.log(results); // array of all results
    })
    .catch(err => {
        console.log("❌ At least one failed:", err);
    });

/*
🧠 Promise.all:
   - Sab complete hone chahiye
   - Agar ek bhi reject hua to pura .catch mein chala jayega
*/


// promise .race

const promA = new Promise((res) => setTimeout(() => res("✅ A done"), 300));
const promB = new Promise((res) => setTimeout(() => res("✅ B done"), 200));
const promC = new Promise((res) => setTimeout(() => res("✅ C done"), 100));

Promise.race([promA, promB, promC])
    .then(result => {
        console.log("🏁 Race winner:", result);
    })
    .catch(err => {
        console.log("❌ First rejection:", err);
    });

/*
🏁 Jo sabse pehle resolve/reject hoga wo race jeetega
   - Baqi promises ki koi value nahi hoti
   - Reject hoga to .catch chalega
*/


// promis.any

const fail1 = Promise.reject("❌ Fail 1");
const fail2 = Promise.reject("❌ Fail 2");
const win1 = Promise.resolve("🎉 Success 1");

Promise.any([fail1, fail2, win1])
    .then(result => {
        console.log("First successful one:", result);
    })
    .catch(err => {
        console.log("All failed:", err);
    });

/*
✅ Promise.any:
   - Pehli success milte hi .then() chalega
   - Sab fail hue to hi .catch() chalega
*/
// promisse . all settled

const pass1 = Promise.resolve("😎 Done 1");
const fails1 = Promise.reject("😵 Fail 1");

Promise.allSettled([pass1, fails1])
    .then(results => {
        console.log("🔍 All statuses:");
        console.log(results);
    });

/*
🧪 Promise.allSettled:
   - Sabka status deta hai (resolved ya rejected)
   - Kaam aata hai jab hume har ek ka status chahiye ho
*/
