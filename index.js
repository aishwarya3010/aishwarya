
var express = require("express");
var app = express();
var mysql=require("mysql");
var connection=mysql.createConnection({
    host:"localhost",
    user:"root",
    password:"manager",
    database:"vehicle"
});
var mydata=[];
app.use(express.json());
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET,POST,PUT,DELETE");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});
 

 connection.connect();
 app.put("/vehicle/:vehicleno ",function(req,res){
    let no=req.params.vehicleno;
     let name=req.body.vehiclename;
     let company=req.body.company;
     let type=req.body.type;
     let price=req.body.price;
     let desc=req.body.description;
    
    let query=`update vehicle set vehiclename='${name}',company='${company}',
    type='${type},price='${price}',description='${desc}' where vehicleno=`+parseInt(no);
    console.log(query);
        connection.query(query,function(err,result){
            
            if(err==null)
            {   
                mydata=result;
                res.contentType=("application/json");
                res.send(mydata);
    
            }
            else{
                res.send("something went wrong");
            }
    
        });
        
    })
        


 app.get("/vehicle",function(req,res){
     connection.query("select * from vehicle",function(err,result){
         if(err==null)
         {   
             mydata=result;
             res.contentType=("application/json");
             res.send(mydata);
 
         }
         else{
             res.send("something went wrong");
         }
 
     });
     
 })


app.listen(3537, function(){
    console.log("Server Started on port  ");
})
