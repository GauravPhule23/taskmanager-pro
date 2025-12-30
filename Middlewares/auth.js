const { tokenValidate } = require('../Services/token')

function checkToken(cookieName) {
  return async function (req, res, next) {
    let tokenValue = await req.cookies[cookieName]
    if (!tokenValue) {
      const authHeader = req.headers.authorization;
      if (authHeader && authHeader.startsWith("Bearer ")) {
        tokenValue = authHeader.split(" ")[1];
      }
    }
    if (!tokenValue) {
      return next()
    }
    try {

      const payload = tokenValidate(tokenValue)
      req.user = payload

    } catch (error) {

    }
    next()
  }

}

module.exports=checkToken;