'use strict';

let multiparty = require('connect-multiparty');
  let multipartyMiddleware = multiparty();

class Resume {
    
uploadResume (req,res,pool){

    let uid = req.uid;
   console.log("uid in profileimage " + uid); 

    let profileimage  =  req.files.file;

        console.log("file path " +  profileimage);

    let date = new Date();
    
    console.log("date" +  date);
    
    res.send({type:"success"});
    
  /*  pool.getConnection((error,connection)=>{
        if(connection){
            connection.query("select resumes.uid from resumes  WHERE uid=?",[uid],(err1,res1)=>{
                if(res1.length>0){
                
                    connection.query("update resumes set resumepath=? WHERE uid=?",[profileimage,uid],(err2,res2)=>{
                        if(res2) {
                            console.log("resume has been   updated successfully ");
                 // let insertid = res2.insertId;
                   //         console.log("insert id " +  insertid);
                     res.status(200).send({type:"success",successMessage: "resume uploaded successfully"});       
                            
                            
                        }else{
                            console.log(err2);
                            res.status(400).send({"type":"error",errorMessage:"error"}); 
                        }
                    })
                }   else{
                    connection.query("insert into resumes set ?",{uid:uid,resumepath:profileimage,date:date},(err3,res3)=>{
                        if(res3){
                            console.log("user resume has been inserted successfully");
                    res.status(200).send({type:"success",successMessage: "resume uploaded successfully"});          

                        }else{
                            console.log(err3);
                    res.status(400).send({"type":"error",errorMessage:"error"});       

                        }
                    })
                }
            })
        }
    }) */
    
    

}
    
    
    
    
}



module.exports = new Resume();
