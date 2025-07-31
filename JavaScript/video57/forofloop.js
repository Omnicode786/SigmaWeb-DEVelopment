for (var char of "Muzammil"){
    console.log(char);
}
// explanation in roman urdu
// for...of loop is used to iterate over iterable objects like arrays, strings, etc.
// Is example mein, hum "Muzammil" string ke har character ko alag alag print kar rahe hain.
// Yeh loop har character ko ek ek karke access karta hai aur console mein print karta hai.
// For...of loop ka istemal tab hota hai jab humein kisi iterable object ke elements par kaam karna ho.
// Yeh for...in loop se mukhtalif hai, jo objects ki properties par iterate karta hai.


// javascript me array keliye [] symbol use krte hen
// c++ me jese array kelie variable ke age [] use krte hen 
// magar array ke numbers ke age [] lagate hen
//  int array[5] = {1, 2, 3, 4, 5};
// javascript me array ke numbers ke age [] nahi lagate
// instead, hum array ko variable me store karte hain jese 
// var array = [1, 2, 3, 4, 5];
// aur for...of loop ka istemal karke un numbers ko access karte hain.

// isi trah object variable likh kr {} lagate hen or object ke properties ko access karte hain
// jese 
// var obj = {name:"Muzammil", age: 19, city: "Karachi"};

var array = [1, 2, 3, 4, 5];
for (var num of array) {
    console.log(num);
}