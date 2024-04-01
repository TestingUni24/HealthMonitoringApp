//importing http 
const http = require("http");

const server= http.createServer((req,res)=>{
   console.log(req);
   const{headers,url,method}=req;
   console.log(method);
   console.log(url);
   console.log(headers);
   res.end();
});

const port=3000;
server.listen(port,() => console.log('Server running on :',server.address().port));

