let a = prompt("Enter number 1");
let b = prompt("Enter number 2");

console.log(a+b);
// the prompt returns a string as the answer 
// now a + b will simply concatenate these two strings

// so what we can do is parse them into integer

// but what if the user enters something weird since js is forgiving it will still allow it however we can see this by adding a throw catch error

if (isNaN(a) || isNaN(b)) {
    throw TypeError("This is not allowed!!");
// tehre are many errors in js
// jab bhi ham error throw krte hen to script whin pr rukjati hen bhai jan error agay he rkjao


}

// throw is ham error bhej rhe hen
// catch is hum error handle kr rhe hen using try catch

let sum = parseInt(a) + parseInt(b);
console.log(sum);

// console.log(sum * x) ;

// idhar reference error dega ke x is not defined
// so we right it as 

try{
 console.log(sum * x) ;

} catch (error){
    console.log(error);
    console.log("error agya he bhai x defined ni he");
}
finally{
    console.log("files are being closed")
}
// rey catch aik synchronus function he to us,m agr ap koi async function jese ke set timeout ya aisa kch chlate ho to script die hojayegi

// finally chahe wo try ho ya cathc ho chale ga dono situation me
// to phir finally ka kia faida he??/
// de3kho agar ham isko aik function me wrap krden

function experiment(){
    try{
 console.log(sum * x) ;
 return true;

} catch (error){
    console.log(error);
    console.log("error agya he bhai x defined ni he");
    return false
}
// console.log("hello");
// // ye ni chalega dekhlena

finally{
    console.log("files are being closed")
}

}

// ab dekho hame pta heke return krne ke bad ka code ni chalta lkn finally return hoen ke bad bhi chle ga
let c = experiment();