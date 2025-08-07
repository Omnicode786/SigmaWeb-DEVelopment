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
