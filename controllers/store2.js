const { validationResult } = require("express-validator");


exports.getStore = async (req, res) => {
    res.render("store2", { docTitle: "Store2" });
  };