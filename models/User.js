const { hash, genSalt, compare } = require("bcryptjs");
const { Schema, model } = require("mongoose");

const userSchema = new Schema({
  username: {
    type: String,
    required: [true, 'Username Required'],
    unique: [true, 'Username exists in the DataBase'],
    trim: true,
    minlength: [5, 'Username should be at least 5 characters']
  },
  password: {
    type: String,
    required: [true, 'Password Required'],
    trim: true,
    minlength: [8, 'Password should be at least 8 characters']
  }
});

userSchema.pre('save', async function(next) {
  try {
    const salt = await genSalt(12);
    this.password = await hash(this.password, salt);
    next();
  } catch (err) {
    next(err);
  }
});

userSchema.methods.matchPassword = function(enteredPassword) {
  return compare(enteredPassword, this.password);
};

module.exports = model('User', userSchema);