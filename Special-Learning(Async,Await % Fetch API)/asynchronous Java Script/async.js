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