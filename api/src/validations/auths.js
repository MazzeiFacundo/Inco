const bcrypt = require('bcrypt');
const { User } = require("../db.js");


async function validationLoginUser(email, password){
    //User login validation function
    //Validación por email
    //Validación por userName
  if(email){
      try{
          const userFoundDB = await User.findOne({where: {email: email}})
          if(!userFoundDB) return {msgE: "This email adress has not been registered yet"}
          //Si no encuentro el email, corto la función y devuelvo mensaje de error.
          if (!bcrypt.compareSync(password, userFoundDB.dataValues.password)) return {msgE: "Incorrect Password"};
      }catch(error){console.log(error)}
  }else{
      return {msgE: "Incorrect data"}
  }
};

module.exports = { validationLoginUser }
