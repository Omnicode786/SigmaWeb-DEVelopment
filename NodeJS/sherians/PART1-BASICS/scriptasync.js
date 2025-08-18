const fs = require('fs');


// now the problem with all these is that these functions are async so all of them will run at the same time and not finished one by one
// we can solve this by omporting fs by its fs.promises 
// anothe rmethod will be calbback hell which is very very weird 
// or another method will be to use 
// fs.writeFileSync


fs.writeFile("Beast.txt","Hello this is writefile",(err)=>{
    if(err) console.log(err);
    
    console.log("writing file complete");
});

fs.appendFile("Beast.txt"," So this is muzammil appending some text in this file using fs.append",(err)=>{
     if(err) console.log(err.message);
     console.log("Appending file complete");
})

fs.rename("Beast.txt","renameBeast.txt",(err)=>{
    if(err) console.log(err.message);
    console.log("finished renaming file");
})
fs.writeFile("CopyBeast.txt","",(err)=>{
    if(err) console.log(err.message);
    
    console.log("writing file complete");
});
fs.copyFile('renameBeast.txt','CopyBeast.txt',(err)=>{
    if (err) console.log( err.message);
    console.log("finsihed copying files");
});

fs.unlink('wanttodelete.txt',(err)=>{
    if(err) console.log(err.message);
    console.log("finished deleting the want to delete file");

})

// we can remove directory as well but only blank folders
fs.rmdir('./delete',{recursive:true},(err)=>{
    if(err) console.log(err.message);
    console.log("finsihed deleting / removing the directory");
})
// this will only work if the directory is empty
// but if we add a recursive true in the options then we can remove whole directories as well


// in the future version of the node js
// rm dir will be removed so use jut rm
fs.rm('./delete',{recursive:true},(err)=>{
    if(err) console.log(err.message);
    console.log("finsihed deleting / removing the directory");
})
// works the same way