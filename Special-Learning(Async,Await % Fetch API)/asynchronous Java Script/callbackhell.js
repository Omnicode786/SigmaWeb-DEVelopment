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


function getAllPosts(_id,callback)
{
    console.log("getting all posts");
    setTimeout(() => {
        callback({
            _id,
            posts:[
                "Blessing your feid",
                "You dont hurt me baby",
                "Fire in the hole"
            ]});
    }, 2000);
};


function getSavedPosts(_id,callback){
    console.log("Getching all the saved posts: ");
    setTimeout(() => {
        callback({
            _id,
            saved_posts:[22,44,55,22,121,43]
        });
    }, 2000);
}


getProfile("Muzammil", function(data){
    console.log(data);
    getAllPosts(data._id,function(posts){
        console.log(posts);
        getSavedPosts(data._id,function(saved){
            console.log(saved);
        })
    })


})