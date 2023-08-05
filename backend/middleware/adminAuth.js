const User = require("../models/User");

module.exports = (req, res, next) => {
  try {
    const user =  User.findById(req.user._id);
    console.log(user.role);
    if (user.role ) {
      return res.status(401).send({
        success: false,
        message: "Unauthorized access.",
      });
    } else {
      next();
    }
  } catch (error) {
    console.log(error);
    res.status(401).send({
      success: false,
      message: "Error in admin middleware",
      error,
    });
  }
};





