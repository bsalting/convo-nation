const { User, Convo, Response } = require("../db");
const { layout, convoDetail, convoList, convoAdd } = require("../views");
const express = require("express");
const router = express.Router();
// const app = require("../app");

// For simplicity, updates will simulate as if user testAccount is logged on.
router.get("/add", async (req, res, next) => {
  try {
    res.send(convoAdd());
  } catch (err) {
    next(err);
  }
});

router.post("/add", async (req, res, next) => {
  try {
    const title = req.body.title;
    const description = req.body.description;
    const convo = await Convo.create({
      title: title,
      description: description,
      userId: 4,
    });
    res.redirect(`/convos/${convo.id}`);
  } catch (err) {
    next(err);
  }
});

router.post("/add/:id", async (req, res, next) => {
  try {
    const convoId = req.params.id;
    const response = await Response.create({
      text: req.body.text,
      convoId: convoId,
      userId: 4,
    });
    res.redirect(`/convos/${convoId}`);
  } catch (err) {
    next(err);
  }
});

router.get("/:id", async (req, res, next) => {
  try {
    const { id } = req.params;
    // Trying seperate calls instead of multi-table join through includes
    const responses = await Response.findAll({
      include: User,
      where: {
        convoId: id,
      },
      order: [["id", "ASC"]],
    });
    const convo = await Convo.findByPk(id, {
      include: User,
      order: [[User, "createdAt", "DESC"]],
    });
    res.send(convoDetail(responses, convo));
  } catch (err) {
    next(err);
  }
});

router.get("/", async (req, res, next) => {
  try {
    const convos = await Convo.findAll({
      include: User,
      order: [["id", "DESC"]],
    });
    res.send(convoList(convos));
  } catch (err) {
    next(err);
  }
});

module.exports = router;
