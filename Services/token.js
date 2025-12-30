const JWT = require("jsonwebtoken")

const secret = process.env.JWT_SECRET

async function createToken(user){
  const payload = {
    _id : user._id,
    firstName:user.firstName,
    role:user.role,
    email:user.email
  }
  const token = JWT.sign(payload,secret,{
    expiresIn:'1d'
  })
  return token;
}


async function tokenValidate(token){
  const payload = JWT.verify(token,secret)
  return payload;
}

module.exports={
  createToken,
  tokenValidate
}