// ✅ Rest Parameters
// Jab humein function me unknown number of arguments lene ho, tab ...rest ka use hota hai

function sumAll(...nums) {
    return nums.reduce((acc, curr) => acc + curr, 0);
}
console.log(sumAll(1, 2, 3)); // 6

// ✅ Spread operator: Function ke andar nahi, balki jab function ko call karna ho aur array ko spread karna ho
const numbers = [5, 10, 15];
console.log(sumAll(...numbers)); // 30
// reduce function ke parameters kia he?

