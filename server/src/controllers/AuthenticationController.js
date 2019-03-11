const User = require('../models/Users')
// const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const config = require('../config/config')
const nodemailer = require('nodemailer')

function jwtSignUser (user) {
  const ONE_WEEK = 60 * 60 * 24 * 7
  return jwt.sign(user, config.authentication.jwtSecret, {
    expiresIn: ONE_WEEK
  })
}

module.exports = {
  async register (req, res) {
    try {
      const temporaryToken = jwt.sign(req.body,
        config.authentication.jwtSecret,
        {expiresIn: 60 * 60 * 24})
      req.body.temporaryToken = temporaryToken
      delete req.body.confirmPassword
      const user = await User.create(req.body)
      res.send(user.toJSON())
      const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: 'elmasry200400@gmail.com',
          pass: 'elmasry200'
        }
      })
      const mailOptions = {
        from: 'elmasry200400@gmail.com',
        to: req.body.email,
        subject: 'Local Activation Link',
        html: 'Hello<strong> ' + req.body.firstName + `</strong>,<br><br>Thank you for registration 
        at karma.com. Please click on the link below to complete your activation:<br><br>
        <a href="http://localhost:8080/activate/` + req.body.temporaryToken +
        `">http://localhost:8080/activate/</a>`
      }
      transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
          console.log(error)
        } else {
          console.log('Email sent: ' + info.response)
        }
      })
    } catch (err) {
      res.status(400).send({
        error: 'this email account is already in use'
      })
    }
  },
  async login (req, res) {
    try {
      const {email, password} = req.body
      console.log(email)
      console.log(password)
      const user = await User.findOne({ email: email }, function (err, user) {
        if (err) {
          return res.status(400).send({
            error: 'The login information was inorrect'
          })
        }
        // test a matching password
        user.comparePassword(password, function (err, isMatch) {
          if (err) {
            return res.status(400).send({
              error: 'The login information was inorrect'
            })
          }
        })
      })
      if (!user.active) {
        return res.status(400).send({
          error: 'Account is not yet activated. Please check your email for activation link.'
        })
      }

      const userJson = user.toJSON()
      res.send({
        user: userJson,
        token: jwtSignUser(userJson)
      })
    } catch (err) {
      res.status(500).send({
        error: 'An error has occured trying to log in'
      })
    }
  },
  async activate (req, res) {
    const user = await User.findOne({ temporaryToken: req.body.temporaryToken })

    jwt.verify(req.body.temporaryToken, config.authentication.jwtSecret, function (err, decoded) {
      if (err) {
        res.status(403).send({
          error: 'Activation link has expired!.'
        })
      } else if (!user) {
        res.status(403).send({
          error: 'Activation link has expired!.'
        })
      } else {
        user.temporaryToken = false
        user.active = true
        user.save(function (err) {
          if (err) console.log(err)
        })
      }
    })
  },

  async forgetPassword (req, res) {
    const user = await User.findOne({email: req.body.email})
    if (!user) {
      return res.status(400).send({
        error: 'This email is not found'
      })
    } else if (!user.active) {
      return res.status(400).send({
        error: 'Account has not yet been activated.'
      })
    } else if (user.resetToken) {
      return res.status(400).send({
        error: 'Check your email for reset password message.'
      })
    } else {
      user.resetToken = jwt.sign(req.body, config.authentication.jwtSecret, {expiresIn: 60 * 60 * 24})
      user.save(function (err) {
        if (err) {
          console.log(err)
        } else {
          const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
              user: 'elmasry200400@gmail.com',
              pass: 'elmasry200'
            }
          })
          const mailOptions = {
            from: 'elmasry200400@gmail.com',
            to: user.email,
            subject: 'Local Reset Password Request',
            html: 'Hello <strong>' + user.firstName + `</strong>,<br><br>You recently request
            a password reset link. Please click on the link below to reset your password:<br><br>
            <a href="http://localhost:8080/resetpassword/` + user.resetToken +
            `">http://localhost:8080/resetpassword/</a>`
          }
          transporter.sendMail(mailOptions, function (error, info) {
            if (error) {
              console.log(error)
            } else {
              console.log('Email sent: ' + info.response)
            }
          })
        }
      })
    }
  },
  async resetPassword (req, res) {
    const user = await User.findOne({resetToken: req.body.resetToken})

    jwt.verify(req.body.resetToken, config.authentication.jwtSecret, function (err, decoded) {
      if (err) {
        res.status(400).send({
          error: 'Reset link has expired!.'
        })
      } else if (!user) {
        res.status(400).send({
          error: 'Reset link has expired!.'
        })
      } else {
        user.resetToken = false
        user.password = req.body.newPassword
        user.save(function (err) {
          if (err) console.log(err)
        })
      }
    })
  }
}
