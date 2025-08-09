// lets create certain functons



// get the prfile data


function getProfile(username, callback){
    console.log("fetching profile data:");

    setTimeout(() => {
    callback({
        _id:211,username,age:25
    });
}, 2000);    


}


getAllPosts(__id,callback)
{
    console.log("getting all posts");
    setTimeout(() => {
        callback({
            __id,
            posts:[
                "Blessing your feid",
                "You dont hurt me baby",
                "Fire in the hole"
            ]});
    }, 2000);
}


getSavedPosts(__id,callback){
    setTimeout(() => {
        callback({
            __id,
            saved_posts:[22,44,55,22,121,43];
        })
    }, 2000);
}


getProfile("Muzammil", function(data){
    console.log(data);
    getAllPosts(data._id,function(posts){
        console.log(posts);
        getSavedPosts(data.__id,function(saved){
            console.log(saved);
        })
    })


})