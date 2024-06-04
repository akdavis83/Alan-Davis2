const User = require("../models/User");
const {validationResult} = require('express-validator')


exports.getLogin = async (req, res) => {
  res.render("login", { docTitle: "Login" });
};
exports.getRegister = async (req, res) => {
  res.render("register", { docTitle: "Sign Up" });
};

exports.getLogout = async (req, res) => {
    req.session = null;
    res.redirect('/')
};
exports.postLogin = async (req, res) => {
  const errs = validationResult(req);

  if(!errs.isEmpty()){
    req.flash('error',errs.errors[0].msg);
    return res.redirect('/login')
  }

  const user = await User.findOne({ username: req.body.username });
  if (!user) {
    req.flash('error','User does not have an account');
    return res.redirect('/login')
  }
  const isMatch = user.matchPassword(req.body.password);
  if (!isMatch){
    req.flash('error','Password Is Incorrect');
    return res.redirect('/login')
  }
  req.session.user = user;
  res.redirect('/store')
};
exports.postRegister = async (req, res) => {
  const errs = validationResult(req);

  if(!errs.isEmpty()){
    req.flash('error',errs.errors[0].msg);
    return res.redirect('/register')
  }
  const user = { username: req.body.username, password: req.body.password };
  await User.create(user);
  res.redirect("/login");
};