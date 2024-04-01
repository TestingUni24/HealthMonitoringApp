//importing http 
const http = require("http");

const server= http.createServer((req,res)=>{
   console.log(req);
   const{headers,url,method}=req;
   console.log(method);
   console.log(url);
   console.log(headers);
   res.end(JSON.stringify({status:200,message: "My API"}));
});

const port=process.env.Port||3000;
server.listen(port,() =>{
   console.log('Server running on', port);

});

