
const express = require("express");
const noteModel = require("./models/note.model");



const app = express();  
app.use(express.json());
app.use(express.urlencoded({ extended: true }))


// post creaes a note

// get = gets allnotes

// delete deleted allnotes
// patch = update a note

app.post("/note",async (req, res) => {
    const data = req.body // now tehedata will be title and description
    await noteModel.create({
        title:data.title,
        description: data.description
    });

    res.status(201).json({
        message: "Note Created"
    })

})



app.get("/", async (req, res) => {

  const notes =   await noteModel.find();
    // the abvoe just goes and finds every other thing from the model note 
// Model find always returns an array everytime even if it doesnt exist

    const notes1 = await noteModel.findOne({
        title: "New NOte"
    });
// we can also do  the abovecondition with find also
// find always gives array and findone always give object or null

    // if that tihing doesnot exist then it returns null
    // find one returns a single onbject
    res.status(200).json({
        message: "Notes fetced succesfully",
        notes: notes
    })

    res.send("The server is running");
})

app.delete("/note/:id", async (req, res)=> {
const id = req.params.id;


await noteModel.findOneAndDelete({
_id: id
});

res.status(201).json({
    message: "The note was deleted successfully"
})
}
)
// finds a partiicular thing and deleted it



app.patch("/notes/:id", async (req, res) => {
const id = req.params.id;

const description = req.body.description;

await noteModel.findOneAndUpdate({
    _id: id
},
{
description: description

})
// this func needs two object first object is
// on what basis / condition we find 
// and then after we have gotten the thing what we need to or want to update from it

res.status(200).json({
    message: "Note was updates successfully"
})
}
)

module.exports = app;
