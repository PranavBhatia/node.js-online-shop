const User = require("../models/user");

exports.getLogin = (req, res, next) => {
  console.log(req.session.isLoggedIn);
  res.render("auth/login", {
    pageTitle: "Login",
    path: "/login",
    isAuthenticated: false,
  });
};

exports.getSignup = (req, res, next) => {
  res.render("auth/signup", {
    path: "/signup",
    pageTitle: "Signup",
    isAuthenticated: false,
  });
};

exports.postLogin = (req, res, next) => {
  User.findById("5f5d97769b95076542f26cad")
    .then((user) => {
      req.session.user = user;
      req.session.isLoggedIn = true;
      // So that the redirect triggers after the session is saved in the MongoDb =>
      req.session.save((err) => {
        console.log(err);
        res.redirect("/");
      });
    })
    .catch((err) => console.log(err));
};

exports.postSignup = (req, res, next) => {
  const { email, password, confirmPassword } = req.body;
  User.findOne({ email })
    .then((userDocument) => {
      if (userDocument) {
        return res.redirect("/signup");
      }
      const user = new User({ email, password, cart: { items: [] } });
      return user.save();
    })
    .then((result) => res.redirect("/login"))
    .catch((err) => console.log(err));
};

exports.postLogout = (req, res, next) => {
  req.session.destroy((err) => {
    console.log(err);
    res.redirect("/");
  });
};
