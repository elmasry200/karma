const Joi = require('joi')

module.exports = {
  register (req, res, next) {
    const schema = {
      email: Joi.string().email(),
      password: Joi.string().regex(
        new RegExp('^[a-zA-Z0-9]{8,}$')
      ).required(),
      confirmPassword: Joi.any().valid(Joi.ref('password')),
      firstName: Joi.string().trim().required(),
      lastName: Joi.string().trim().required(),
      gender: Joi.string().required(),
      birthYear: Joi.number().integer().required(),
      language: Joi.string().required()
    }

    const {error} = Joi.validate(req.body, schema)

    if (error) {
      switch (error.details[0].context.key) {
        case 'email':
          res.status(400).send({
            error: 'You must provide a valid email address.'
          })
          break
        case 'password':
          res.status(400).send({
            error: 'Password must be minimum eight characters, at least one letter and one number.'
          })
          break
        case 'confirmPassword':
          res.status(400).send({
            error: 'Confirm Password must match Password.'
          })
          break
        case 'firstName':
          res.status(400).send({
            error: 'First Name is required'
          })
          break
        case 'lastName':
          res.status(400).send({
            error: 'Last Name is required'
          })
          break
        case 'gender':
          res.status(400).send({
            error: 'gender is required'
          })
          break
        case 'birthYear':
          res.status(400).send({
            error: 'Birth Year is required'
          })
          break
        case 'language':
          res.status(400).send({
            error: 'Language is required'
          })
          break
        default:
          res.status(400).send({
            error: 'Invalind registration information'
          })
      }
    } else {
      next()
    }
  },
  forgetPassword (req, res, next) {
    const schema = {
      email: Joi.string().email()
    }

    const {error} = Joi.validate(req.body, schema)

    if (error) {
      switch (error.details[0].context.key) {
        case 'email':
          res.status(400).send({
            error: 'You must provide a valid email address.'
          })
          break
        default:
          res.status(400).send({
            error: 'Invalind Forget Password Information'
          })
      }
    } else {
      next()
    }
  },
  resetPassword (req, res, next) {
    const schema = {
      resetToken: Joi.string().required(),
      newPassword: Joi.string().regex(
        new RegExp('^[a-zA-Z0-9]{8,}$')
      ).required(),
      confirmedPassword: Joi.any().valid(Joi.ref('newPassword'))
    }
    const {error} = Joi.validate(req.body, schema)

    if (error) {
      console.log(error)
      switch (error.details[0].context.key) {
        case 'resetToken':
          res.status(400).send({
            error: 'ResetToken is required'
          })
          break
        case 'newPassword':
          res.status(400).send({
            error: 'Password must be minimum eight characters, at least one letter and one number.'
          })
          break
        case 'confirmedPassword':
          res.status(400).send({
            error: 'The password is not matched'
          })
          break
        default:
          res.status(400).send({
            error: 'Invalind Resset Password information'
          })
      }
    } else {
      next()
    }
  }
}
