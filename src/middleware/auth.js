/* eslint-disable node/no-unsupported-features/es-syntax */
const isAuth = (req, res, next) => {
    if (req.isAuthenticated() == false){
      return  res.redirect('/login')
    }
    next()
}

export default isAuth