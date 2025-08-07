// function ko call krte waqt we can set uski this ki value kia hogi


let obj1 = {
        name: "Muzammil"
}
function hello(){
    console.log(this)
    // abhi window he
    // ham call blind krke apne hisab se set kr skte hen
}

hello() // this value will be windwo
hello.call(obj1); // now this value is that thing whic is passed

function abcd(string,a,b,c,d){
    console.log(a+b+c+d);
    console.log(string,this);
}
abcd.call(obj1,"Inside .call:",2,4,5,67);

// isis treke se aply kr skte hen aply bhi call krega bas wo 2 paramters ki trrah bheje ga
abcd.apply(obj1,["Inside .apply: ",1,4,5,6]);
// dosra parametr aik array me jatahe

// BIND

// bind basically aik naya function deeta he usko aap ksi or variable me save kr skte ho
// bind jis par lga he wo uska duplivcate return krta he bas ab jo bhi obj dia he this ki value ab us obj pr chlegi


let binds = abcd.bind(obj1,"inside .bind",3,4,5,77);
binds();
// binds does not invoke directly

