const http = require('http');

const server = http.createServer(function(req,response){
    response.end("hello world");
})

server.listen(3000);
// now when we goto localhost3000 we can see the code that we sended to our frontend
// this basically creates a server