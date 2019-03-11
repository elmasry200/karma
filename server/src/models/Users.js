const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const SALT_WORK_FACTOR = 10
const Schema = mongoose.Schema
const UserSchema = new Schema({
  email: {
    type: String,
    index: { unique: true },
    trim: true,
    required: [true, 'email field is required']
  },
  password: {
    type: String,
    trim: true,
    required: [true, 'password field is required']
  },
  firstName: {
    type: String,
    trim: true,
    required: [true, 'firstName field is required']
  },
  lastName: {
    type: String,
    trim: true,
    required: [true, 'lastName field is required']
  },
  birthYear: {
    type: String,
    required: [true, 'birthYear field is required']
  },
  gender: {
    type: String,
    required: [true, 'gender field is required']
  },
  language: {
    type: String,
    required: [true, 'language field is required']
  },
  level: {
    type: Number,
    default: 1
  },
  unit: {
    type: Number,
    default: 1
  },
  active: {
    type: Boolean,
    required: true,
    default: false
  },
  temporaryToken: {
    type: String,
    required: true
  },
  resetToken: {
    type: String,
    required: false
  },
  createdAt: {
    type: Date,
    required: true,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    required: true,
    default: Date.now
  }
})
UserSchema.pre('save', function (next) {
  var user = this

  // only hash the password if it has been modified (or is new)
  if (!user.isModified('password')) return next()

  // generate a salt
  bcrypt.genSalt(SALT_WORK_FACTOR, function (err, salt) {
    if (err) return next(err)

    // hash the password using our new salt
    bcrypt.hash(user.password, salt, function (err, hash) {
      if (err) return next(err)

      // override the cleartext password with the hashed one
      user.password = hash
      next()
    })
  })
})

UserSchema.methods.comparePassword = function (candidatePassword, cb) {
  bcrypt.compare(candidatePassword, this.password, function (err, isMatch) {
    if (err) return cb(err)
    cb(null, isMatch)
  })
}
const User = mongoose.model('user', UserSchema)

module.exports = User
