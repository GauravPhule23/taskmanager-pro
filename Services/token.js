const JWT = require("jsonwebtoken")

const secrete = process.env.JWT_SECRETE

async function createToken(user){
  const payload = {
    _id : user._id,
    firstName:user.firstName,
    role:user.role,
    email:user.email
  }
  const token = JWT.sign(payload,secrete,{
    expiresIn:'1d'
  })
  return token;
}


async function tokenValidate(token){
  const payload = JWT.verify(token,secrete)
  return payload;
}

module.exports={
  createToken,
  tokenValidate
}