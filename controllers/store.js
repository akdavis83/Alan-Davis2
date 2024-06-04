const { validationResult } = require("express-validator");


exports.getStore = async (req, res) => {
    res.render("store", { docTitle: "Store" });
  };