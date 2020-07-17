const Product = require("../models/product");

exports.getProducts = (req, res, next) => {
  Product.fetchAll((prods) => {
    res.render("shop/product-list", {
      prods,
      pageTitle: "All Products",
      path: "/products",
    });
  });
};

exports.getProduct = (req, res, next) => {
  const prodId = req.params.productId;
  console.log(prodId);
  res.redirect("/");
};

exports.getIndex = (req, res, next) => {
  Product.fetchAll((prods) => {
    res.render("shop/index", {
      prods,
      pageTitle: "Shop",
      path: "/",
    });
  });
};

exports.getCart = (req, res, next) => {
  res.render("shop/cart", {
    pageTitle: "Your Cart",
    path: "/cart",
  });
};

exports.getOrders = (req, res, next) => {
  res.render("shop/orders", {
    pageTitle: "Your Orders",
    path: "/orders",
  });
};

exports.getCheckout = (req, res, next) => {
  res.render("shop/checkout", {
    pageTitle: "Checkout",
    path: "/checkout",
  });
};
