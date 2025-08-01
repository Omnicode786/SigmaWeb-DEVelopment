// ✅ Higher Order Functions
// Aise functions jo ya to doosre functions ko accept karte hain 
// ya return karte hain – ya dono! Yeh JS me functional programming ka core hai.

function multiplier(factor) {
    return function(x) {
        return x * factor;
    }
}

const triple = multiplier(3);
console.log(triple(4)); // 12
