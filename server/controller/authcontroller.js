const users= require('../db/models/users');
const{success_function,error_function}=require("../utils/response-handler");
const bcrypt=require('bcrypt');
const jwt=require('jsonwebtoken');


exports.login=async (req,res)=>{
    try{
        let email=req.body.email;
        let password =req.body.password;
        
        //validation

        let user=await users.findOne({email});
        console.log(user);

        if(user){
            let db_pass=user.password;
            console.log(db_pass);

            let password_match=bcrypt.comareSync(password,db_pass);
            console.log(password_match);

            if(password_match){
                let token=jwt.sign({user_id:used.id},process.env.PRIVATE_KEY,{expiresIn:"10d"} );
                let response=success_function({
                    statusCode:200,
                    data:token,
                    message:"login successful"
                });

                res.status(response.statusCode).send(response);
                return;
            }
            else{
                let response = error_function({
                    statusCode : 400,
                    message : "Invalid password"
                });

                res.status(res.statusCode).send(response);
            }

        }
        else{
            let response = error_function ({
                statusCode : 400,
                message : "user not found"

            });

            res.status(response.statusCode).send(response);
        }


    }
    catch(error){
        console.log("error:",error);

        let response = error_function({
            statusCode :400,
            message : error.message ? error.message : "something went wrong"
        })
    }
}
