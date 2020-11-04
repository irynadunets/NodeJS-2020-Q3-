const uuid = require('uuid');
const mongoose = require('mongoose');
const Bcrypt = require('bcrypt');
const SALT_ROUNDS = require('../../common/config').SALT_ROUNDS;

const userSchema = new mongoose.Schema(
  {
    name: String,
    login: String,
    password: String,
    _id: {
      type: String,
      default: uuid
    }
  },
  {
    versionKey: false
  }
);
userSchema.statics.toResponse = user => {
  const { id, name, login } = user;
  return { id, name, login };
};

userSchema.pre('save', async function cb(next) {
  const salt = await Bcrypt.genSalt(+SALT_ROUNDS);
  this.password = await Bcrypt.hash(this.password, salt);
  next();
});

userSchema.pre('findOneAndUpdate', async function cb(next) {
  const salt = await Bcrypt.genSalt(+SALT_ROUNDS);
  this._update.password = await Bcrypt.hash(this._update.password, salt);
  next();
});

userSchema.methods.comparePassword = function compare(plaintext, cb) {
  return cb(null, Bcrypt.compare(plaintext, this.password));
};

const User = mongoose.model('User', userSchema);
module.exports = User;
