'use strict';

let fs = require('fs');
let path = require('path');
//var multiparty = require('multiparty');

let multiparty = require('connect-multiparty');
  let multipartyMiddleware = multiparty();

class ProfileImage {
    
setProfileImage (req,res,pool){

    let uid = req.body.userId;
   console.log("uid in profileimage " + uid); 
  //  console.log(req)
    let profileimage  =  req.body.file;
  //  console.log("pf in  profile image " + JSON.stringify(profileimage));
   // let profileimage = pf.slice(17);
        console.log("file path " +  profileimage);

    pool.getConnection((error,connection)=>{
        if(connection){
            connection.query("select profileimage.uid from profileimage  WHERE uid=?",[uid],(err1,res1)=>{
                if(res1.length>0){
                
                    connection.query("update profileimage set profileimage=? WHERE uid=?",[profileimage,uid],(err2,res2)=>{
                        if(res2) {
                            console.log("userprofile image updated successfully ");
                 // let insertid = res2.insertId;
                   //         console.log("insert id " +  insertid);
                     res.status(200).send({type:"success",image: profileimage});       
                            
                            
                        }else{
              'use strict';

let fs = require('fs');
let path = require('path');
//var multiparty = require('multiparty');

let multiparty = require('connect-multiparty');
  let multipartyMiddleware = multiparty();

class ProfileImage {
    
setProfileImage (req,res,pool){

    let uid = req.body.userId;
   console.log("uid in profileimage " + uid); 
  //  console.log(req)
    let profileimage  =  req.body.file;
  //  console.log("pf in  profile image " + JSON.stringify(profileimage));
   // let profileimage = pf.slice(17);
        console.log("file path " +  profileimage);

    pool.getConnection((error,connection)=>{
        if(connection){
            connection.query("select profileimage.uid from profileimage  WHERE uid=?",[uid],(err1,res1)=>{
                if(res1.length>0){
                
                    connection.query("update profileimage set profileimage=? WHERE uid=?",[profileimage,uid],(err2,res2)=>{
                        if(res2) {
                            console.log("userprofile image updated successfully ");
                 // let insertid = res2.insertId;
                   //         console.log("insert id " +  insertid);
                     res.status(200).send({type:"success",image: profileimage});       
                            
                            
                        }else{
                            console.log(err2);
                            res.status(400).send({"type":"error",errorMessage:"error"}); 
                        }
                    })
                }   else{
                    connection.query("insert into profileimage set ?",{uid:uid,profileimage:profileimage},(err3,res3)=>{
                        if(res3){
                            console.log("user profile image inserted successfully");
                    res.status(200).send({type:"success",image: profileimage});          

                        }else{
                            console.log(err3);
                    res.status(400).send({"type":"error",errorMessage:"error"});       

                        }
                    })
                }
            })
        }
    })
    
    

}
    
    
    
    
}



module.exports = new ProfileImage();
              console.log(err2);
                            res.status(400).send({"type":"error",errorMessage:"error"}); 
                        }
                    })
                }   else{
                    connection.query("insert into profileimage set ?",{uid:uid,profileimage:profileimage},(err3,res3)=>{
                        if(res3){
                            console.log("user profile image inserted successfully");
                    res.status(200).send({type:"success",image: profileimage});          

                        }else{
                            console.log(err3);
                    res.status(400).send({"type":"error",errorMessage:"error"});       

                        }
                    })
                }
            })
        }
    })
    
    

}
    
    
    
    
}



module.exports = new ProfileImage();
