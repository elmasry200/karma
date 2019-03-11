const AuthenticationController = require('./controllers/AuthenticationController')
const AuthenticationControllerPolicy = require('./policies/AuthenticationControllerPolicy')

module.exports = (app) => {
  app.post('/register',
    AuthenticationControllerPolicy.register,
    AuthenticationController.register)

  app.post('/login',
    AuthenticationController.login)

  app.post('/activate',
    AuthenticationController.activate)

  app.post('/forgetPassword',
    AuthenticationControllerPolicy.forgetPassword,
    AuthenticationController.forgetPassword)

  app.post('/resetPassword',
    AuthenticationControllerPolicy.resetPassword,
    AuthenticationController.resetPassword)
}
