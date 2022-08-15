const { User } = require("../db");
const { userAdd, userList } = require("../views");
const express = require("express");
const router = express.Router();

router.get("/add", async (req, res, next) => {
  try {
    res.send(userAdd());
  } catch (err) {
    next(err);
  }
});

router.post("/add", async (req, res, next) => {
  try {
    const { name, emailAddress } = req.body;
    await User.create({
      name: name,
      emailAddress: emailAddress,
    });
    res.redirect("/users");
  } catch (err) {
    next(err);
  }
});

router.get("/", async (req, res, next) => {
  try {
    const users = await User.findAll();
    res.send(userList(users));
  } catch (err) {
    next(err);
  }
});

module.exports = router;
