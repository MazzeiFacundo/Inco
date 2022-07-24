const bcrypt = require('bcrypt');
const { User } = require("../db.js");


async function validationLoginUser(email, userName, password){
    //User login validation function
    //Validación por email
    //Validación por userName
  if(userName){
      try{
          const userFoundDB = await User.findOne({where: {userName: userName}})
          if(!userFoundDB) return {msgE: "User name not found"}
          //Si no encuentro el email, corto la función y devuelvo mensaje de error.
          if (!bcrypt.compareSync(password, userFoundDB.dataValues.password)) return {msgE: "Incorrect Password"};
      }catch(error){console.log(error)}
  }else{
      return {msgE: "Incorrect data"}
  }
};

module.exports = { validationLoginUser }
