'use strict';


class JobSeekerMessages{
    
    sendMessages(req,res,pool){
        let uid = req.uid;
      //  console.log("in messages" + uid);
        let subject = req.body.subject;
        //        console.log("in messages" + subject);

        let message = req.body.message;
          //              console.log("in messages" + message);

        let date = new Date();
            //                    console.log("in messages" + date);

        let post_user = {uid:uid,subject:subject,message:message,date:date};
        pool.getConnection((error,connection) => {
            if(connection){
                connection.query("insert into messages set?", post_user,(errorc,resultc)=>{
                 if(resultc){
                     res.status(200).send({type:"success",successmessage:"Message has been sent successfully"});
                 }   else{
                     console.log(errorc);
res.status(200).send({type:"failure",successmessage:"Message sending has been failed"});                
                 }
                })
            }else{
                console.log(error);
                connection.reset();
            }
        })
    }
    
    
    
    getMessages(req,res,pool){
      console.log("in get messages");
        let uid = req.uid;
         pool.getConnection((error,connection) => {
             
            if(connection){
                connection.query("select * from messages WHERE uid=? ",[uid],(err,result)=>{
                    if(result.length>0){
                        console.log(JSON.stringify(result));
                        res.status(200).send({type:"success" ,data:result});
                    }else{
                        console.log(err);
                                                res.status(400).send({type:"error"});

                    }
                })
            } else{
                console.log(error);
                connection.reset();
            }
             
         });
        
        
        
    }
    
}



module.exports = new JobSeekerMessages();
