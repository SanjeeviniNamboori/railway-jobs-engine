'use strict';

let bcrypt = require('bcryptjs');
//const saltRounds = 10;
const salt = 10;
 //let salt = bcrypt.genSaltSync(saltRounds);


class ChangePassword {
    
    changePassword(req,res,pool){
       
//let hash;
          let oldpassword = req.body.oldPassword;
        console.log("oldpass" +  oldpassword);
            let newpassword = req.body.newPassword;
        console.log("newpass" +  newpassword);
      //  let sessionid = req.session.userid;
        let sessionid = req.uid;
        //let hash = bcrypt.hash(newpassword, salt);
bcrypt.hash(newpassword, salt,function(err, hash) {
 if(hash){
    // hash = hash;
 

        pool.getConnection((error,connection)=>{
          if(connection){
              connection.query('select login.password from login where uid=?',[sessionid],(err,result)=>{
                  if(result){
                      let db_pass = result[0].password;
bcrypt.compare(oldpassword,db_pass,function(err,actual){
    
              console.log(actual) ;        
                      if(actual ==  true){
                          
                          connection.query('update login set password=? where uid=?',[hash,sessionid],(err1,res1)=>{
                              if(res1){
                                  console.log("password changed successfully");
                                  res.status(200).send({type:"success",tostate: "signIn"});
                              }else{
console.log("change password failed");            
                              res.status(200).send({message: "change password failed"});
                              }
                          })
                          
                      }else{
                        console.log("change password failed");  
                          res.status(200).send({type:"error",message:"Password does not exist"});
                      }
                     
                      
                  })
                    
                  }
              })
          }
            
        })
        
        
        
        }   
    
});
        
        
        
        
    }
    
    
}



module.exports = new ChangePassword();