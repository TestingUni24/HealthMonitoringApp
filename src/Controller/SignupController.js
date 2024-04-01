const signup= (req,res) =>{
    console.log(req);
   const{headers,url,method}=req;
   console.log(method);
   console.log(url);
   console.log(headers);
    res.end(JSON.stringify({status:200,message: "SignupRoute"}))
};

module.exports= {signup};