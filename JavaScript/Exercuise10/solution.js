

function Generator(x,y,z){
    if (Math.floor(Math.random() * 3) == 1) {
        return x;
    } else if (Math.floor(Math.random() * 3) == 2) {
        return y;
    } else {        return z;
    }  
}


console.log(Generator("Amazing","Awesome","Fantastic") +" " + Generator("Apple","Samsung","Vivo") + " " + Generator("Phone","Laptop","Tablet")  +  " " + Generator("best","greatest","most popular") + " " + Generator("device","product","item") + " " + Generator("of the year","of the decade","of all time"));