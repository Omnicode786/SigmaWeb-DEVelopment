const express = require('express')
const  postModel  = require('./models/post');
const userModel = require('./models/user');
const app = express();
const port = 3000;




app.get('/',(req,res)=>{
    res.send("helo")
})
app.get('/create',async (req, res) => 
    {
        let user = await userModel.create({
            username: "Muzammil Alam",
            email:"muzammil@gmail.com",


        })
        res.send(user);

}
)



app.get('/post/create', async(req,res)=>{

    let post = await postModel.create({
        postdata:"Ha bhai kia ddekh rha hai",
        user:"454842315454412365"  
    })
   let user = await userModel.findOne({_id:"454842315454412365"});
    user.posts.push(post._id);
    user.save();
    res.send({user,post})

})

app.listen(port, () => console.log(`Example app listening on port ${port}!`))