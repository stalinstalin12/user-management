'use strict';
const bcrypt=require('bcrypt');

module.exports = {
  up: (models, mongoose) => {

    let password="admin123";
    let salt=bcrypt.genSaltSync(10);
    let hashed_pass=bcrypt.hashSync(password,salt);

    
      return models.users.insertMany([
        {
          name:"admin",
          email:"admin@gmail.com",
          password:hashed_pass,
          
          user_type:"67093843c0ea8c996aa031a1"
        }
      ]).then(res => {
    
      console.log(res.insertedCount);
    });
    
  },

  down: (models, mongoose) => {
   
      return models.users.deleteMany(
      {
        _id:"67093843c0ea8c996aa031a1"   
      }
      ).then(res => {
      
      console.log(res.deletedCount);
      });
    
  }
};
