let i = 5;
while (i < 100) {
    console.log(i);
    i++;
}

// This is a while loop example in JavaScript.
// While loop is used to repeat a block of code as long as a specified condition is true.
// In this case, it starts from 5 and continues until i is less than 100.
// Ham isko tab tak chalayenge jab tak condition true hai.
// For example, we can use it to keep asking for user input until a valid response is received.
// While loop ka istemal tab hota hai jab humein nahi pata hota ke kitni baar loop chalega, lekin condition pata hoti hai.
// Yeh loop har iteration mein i ki value ko print karega aur phir i ko 1 se increment karega.
// Yeh loop tab tak chalega jab tak i ki value 100 se kam hai.
// Yeh loop kaam tab tak karta rahega jab tak condition true hai.

// do...while loop example
let j = 12;
do {
    console.log(j);
    j++;
} while (j < 10);

// Do...while loop is similar to while loop, but it guarantees that the code block will run at least once.
// In this case, it starts from 5 and continues until j is less than 10.
// Yeh loop pehle code block ko execute karega aur phir condition check karega.
// Agar condition true hai, toh yeh loop continue karega.
// Yeh useful hai jab humein ensure karna ho ke code block kam se kam ek baar chale.
// For example, we can use it to display a message to the user at least once before checking a condition.