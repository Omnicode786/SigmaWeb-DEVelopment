// aisa code jo line by line chale hota he sync code hai

// aisa code jo jab chalne ke lie ready ho jate tab chale wo hai async

function FetchTheProfile(username, callback){
    setTimeout(() => {
        console.log(`Profile fetched of ${username}`);
        callback({username,
            role: "Developer",
            rank: "Power IV"
        }) // this simpl y means username: username})
    }, 2000);
}


FetchTheProfile("Muzamml", function(profileData){
    console.log("The profile data fetched came out as: ", profileData)
}) 


// trying instagram profile getter 


    async function getInstaProfile() {
        try{
            let response = await fetch (`https://pokeapi.co/api/v2/pokemon`);
            
            console.log(response);
            let data = await response.json();
            console.log(data);
        }
        catch(error){
console.log(error);
        }
        
    }


getInstaProfile();