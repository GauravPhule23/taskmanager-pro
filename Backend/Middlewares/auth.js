const { tokenValidate } = require('../Services/token')

function checkToken() {
  return async function (req, res, next) {
    let tokenValue = null
    // console.log(req.headers)
    const authHeader = req.headers.authorization;
    if (authHeader && authHeader.startsWith("Bearer ")) {
      tokenValue = authHeader.split(" ")[1];
    }
// console.log(tokenValue)
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

module.exports = checkToken;