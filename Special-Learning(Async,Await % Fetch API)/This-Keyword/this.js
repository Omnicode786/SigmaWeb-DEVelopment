// 
// this is keyword is a special keyword

// other keywords value and nature remains same however 
//  the nature and value of the this keyword can change 
// depending on where we are using it



// this in global scope


 console.log(this);

// this value is window in global scope
function thiss(){
console.log(this);
}
thiss();

// function me bhi this ki value function hoti he

let obj = {
    name: "Muzammil",
    satThisValue: function (){ // remember this only works in function declared function and not arrow function
            console.log(this);
            console.log(this.name);
            // agar me function me function bnakr thsi ko call krun
            function hey(){
                console.log("I am a function inside a function", this);
                // now this looses its value again anfd becomes a window
            }
            hey();
            // agar hame this ki value retain krni he or object ke function me hi function use krna heto what we do is 
            // use an arrow function here
            let Thish = () => {
                console.log("I am an arrow inside a function", this);
                // console.log(this.satThisValue());
                // haha we are doing such that the function is calling itelf so goes for anifinite loop 
// ab this ki value object hojayegi
                console.log("Whats up guys I am ",this.name);

            }
            Thish();
    
        }
}
// a functio0n inside an object is known as its method

obj.satThisValue();
// method ke andar this ki value apka poora object hota he
// this ka mtlb ham us object ki kam horha he 

// so this ke sath ham kuch bhi kr skte hen qandr object ki chizo ko access kr skte ho


// this inside the event handler
let flag = 0;
document.querySelector("h1").addEventListener('click', function(){
    console.log(this);
    if (!flag) {
    console.log(this.style.color = "red");
flag = 1;        
    }
    else{
    console.log(this.style.color = "black");
flag = 0;
    }
}  )


// this aik event handler me  hamesha us chiz ko refer krta he jis chiz pr wo event laga ho in this case
// this h1 ko refer krega


// this in a class

// we cannot use let var keys in a class
class This{
// var  a =24;
// this gives an error
constructor(){
    console.log("I am in a class");
    this.a = 12;
}

}

new This();
// what this new keyword does is simply create a blank object
//   an this ye kam krega ke jahan jahan this likha he in the constructor whan whan new keyword ajayega
// as ina blank object

// classes me this ki value blank object hoti he


// agar in sab me ham arrow function use krenge to this apni propertie khodega or phirse window ke brabr hojayega

// insimple terms arrow function makes this point towards its parent 