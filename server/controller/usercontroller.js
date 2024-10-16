const user=require('../db/models/users');
const { success_function,error_function } = require('../utils/response-handler');
const fileUpload = require('../utils/file-upload').fileUpload;
const bcrypt = require('bcrypt');
const set_password_template = require("../utils/email-templates/set-password").resetPassword;
const sendEmail = require("../utils/send-email").sendEmail;


//add user

exports.createUser=async function(req,res) {
    try{
        let body=req.body;
        let name=req.body.name;
        let email=req.body.email;
        let image=req.body.image;
       
        body.user_type = '67093864c0ea8c996aa031a2'

         

        if(image){
            let img_path=await fileUpload(image,"users");
            console.log(img_path);
            body.image=img_path;
        }


//validation
        if(!name){
            response=error_function({
                statusCode:400,
                message:'name is required'
            });
            res.status(response.statusCode).send(response);
            return;
        }
        let count=await user.countDocuments({email});

        if(count>0){
            res.status(400).send('user already exist');
            return;
        } 



        //random password for new user

        function generateRandomPassword(length){
            let charset="ABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890";
            let password="";

            for (var i=0;i<length;i++){
                var randomindex=Math.floor(Math.random()*charset.length);
                password+=charset.charAt(randomindex);
            }
            return password;
        }
        var randomPassword= generateRandomPassword(10);

        let content=await set_password_template(name,email,randomPassword);
        await sendEmail(email,"Updated password",content);

        body.password=randomPassword;
        let password=body.password;


        
        //password hashing

        let salt=bcrypt.genSaltSync(10);
        console.log(salt);

        let hashed_password=bcrypt.hashSync(password,salt);
        console.log(hashed_password);

        body.password=hashed_password;


        let new_user=await user.create(body);
        if(new_user){
            response=res.status(200).send("User created successfully");
            return;
        }
        else{
            response=res.status(400).send("user creation failed");
            return;
        }
    }
    
    catch (error) {
        console.log("error : ", error);
        res.status(400).send(error.message ? error.message : "Something went wrong");
        return;
    }
}

//get users

exports.getUsers=async function (req,res) {
    try{
        let usersdata=await user.find();
        console.log(usersdata);
        res.status(200).send(usersdata);
        return;
    }
    catch(error){
        console.log(error);
        res.status(400).send(error.message ? error.message : error);
    }
}

//get single user

exports.getSingleUser=async function (req,res) {
    try{
        let id=req.params.id;
        console.log(id);
        let userData = await user.find({_id:id});
        console.log(userData);
        res.status(200).send(userData);
    }
    catch(error){
        console.log(error);
        res.status(400).send(error.message ? error.message : error);
    }
}

