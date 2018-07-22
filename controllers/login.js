'use strict';
let crypto = require('crypto');

let bcrypt = require('bcryptjs');
let dashboard = require('./dashboard.js');
var jwt = require('jsonwebtoken');

const saltRounds = 10;


class Login{
   userAuthentication(req,res,pool){
       console.log("in user authenticat");
        let user_input = req.body.userName;
        let user_password = req.body.password;
     //  var token = jwt.sign({ foo: 'bar' }, 'shhhhh');
       //console.log("new token " +  token);

//backdate a jwt 30 seconds
let authentication_token = jwt.sign({ foo: 'bar', iat: Math.floor(Date.now() / 1000) - 30 }, 'shhhhh');
//console.log("older token " +  authentication_token);
     /*  let randtoken = require('rand-token').generator({
  chars: 'A-Z',
  source: crypto.randomBytes 
});   */
     //   let salt = bcrypt.genSaltSync(saltRounds);
      //  let authentication_token = bcrypt.hashSync(user_input, salt);
     //  let authentication_token =randtoken.generate(16);
        pool.getConnection((error,connection) =>{
               if(connection){
                //   console.log("In connection ")
connection.query('select * from user inner join login on user.uid = login.uid inner join usercontact on usercontact.uid = user.uid and (user.username=? or usercontact.contactinfo = ?) where usercontact.ctypeid = ? ',[user_input,user_input,'4'],(error,result)=>{
   // console.log(result)
    if(error) res.send("biscuit query")
  else if(result.length!=0) {
bcrypt.compare(user_password, result[0].password, function(err, actual) {
    //var actual = bcrypt.compare(user_password,result[0].password ); // false
               
      
      if(actual == true){
 
                   
                   
  connection.query('select * from userauth where uid=?',[result[0].uid],(errd,resd) =>{
      if(resd.length>0){
             //  console.log("in if loop");
          connection.query('update userauth set authenticationtoken=? where uid=? ',[authentication_token,result[0].uid],(errorj,resultj)=>{
              if(resultj) {
                  console.log("user authentication token updated successfully");
                 // console.log("in login" + authentication_token);
                  //  res.setHeader("Access-Control-Allow-Headers", "Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers");
                  
         res.status(200).send({userId:result[0].uid,userName: result[0].username,authenticationToken:authentication_token,toState:"dashboard"});
                
                 // dashboard.getUserInfo(req,res,pool,sess_id,authentication_token);
 //   dashboard.getUserInfo(req,res,pool);              
                  
              }
          })
      } else{
       //   console.log("in else loop");
         // console.log("in else" + res1[0].uid);
           //console.log("in else" + authentication_token);
          var post_user = {uid : result[0].uid, authenticationtoken:authentication_token};
          connection.query('insert into userauth set ? ',post_user,(erru,resu)=>{
            if(resu){
                console.log("user authentication token inserted successfully");
               //dashboard.getUserInfo(req,res,pool,sess_id,authentication_token);}
                
          //     dashboard.getUserInfo(req,res,pool);
                              console.log("in login" + authentication_token);

              //  res.setHeader("Access-Control-Allow-Headers", "Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers");
                
        res.status(200).send({userId:result[0].uid,userName: result[0].username,authenticationToken:authentication_token,toState:"dashboard"});
                
                
            }
                
              else {console.log("in error loop "+ erru);}

          })
      }

  })


//  res.status(200).send("dashboard");
}else{
  res.status(200).send("Wrong Password!");
}
    
})
    
    
  }
    
 else{
res.status(200).send("Invalid credentials");
  }
    
    
})
               }else{
                   console.log("connection error" +  error);
               }

    })

  }

}
module.exports = new Login();
