// ✅ Named vs Anonymous Functions
// Named: function ka naam hota hai – error trace karna easy hota hai
function namedFunc() {
    console.log("I have a name!");
}

// Anonymous: function keyword ke sath naam nahi hota – mostly expressions me use hota hai
const anonFunc = function() {
    console.log("Main anonymous hoon!");
};

namedFunc();
anonFunc();
