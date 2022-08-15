const { User, Convo, Response } = require("../db");
const { convoDetail, convoList, convoAdd } = require("../views");
const express = require("express");
const router = express.Router();

router.get("/add", async (req, res, next) => {
  try {
    const users = await User.findAll();
    res.send(convoAdd(users));
  } catch (err) {
    next(err);
  }
});

router.post("/add", async (req, res, next) => {
  try {
    const { title, description, id } = req.body;
    const convo = await Convo.create({
      title: title,
      description: description,
      userId: id,
    });
    res.redirect(`/convos/${convo.id}`);
  } catch (err) {
    next(err);
  }
});

router.post("/add/:id", async (req, res, next) => {
  try {
    const convoId = req.params.id;
    const { text, id } = req.body;
    const response = await Response.create({
      text: text,
      convoId: convoId,
      userId: id,
    });
    res.redirect(`/convos/${convoId}`);
  } catch (err) {
    next(err);
  }
});

router.delete("/details/:id", async (req, res, next) => {
  try {
    const id = req.params.id;
    const response = await Response.findByPk(id);
    await Response.destroy({
      where: { id: id },
    });
    res.redirect(`/convos/${response.convoId}`);
  } catch (err) {
    next(err);
  }
});

router.delete("/:id", async (req, res, next) => {
  try {
    const id = req.params.id;
    await Response.destroy({
      where: { convoId: id },
    });
    await Convo.destroy({
      where: { id: id },
    });
    res.redirect(`/convos`);
  } catch (err) {
    next(err);
  }
});

router.get("/:id", async (req, res, next) => {
  try {
    const { id } = req.params;
    const responses = await Response.findAll({
      include: User,
      where: {
        convoId: id,
      },
      order: [["createdAt", "ASC"]],
    });
    const convo = await Convo.findByPk(id, {
      include: User,
      order: [[User, "createdAt", "DESC"]],
    });
    const users = await User.findAll();
    res.send(convoDetail(responses, convo, users));
  } catch (err) {
    next(err);
  }
});

router.get("/", async (req, res, next) => {
  try {
    const convos = await Convo.findAll({
      include: User,
      order: [["createdAt", "DESC"]],
    });
    res.send(convoList(convos));
  } catch (err) {
    next(err);
  }
});

module.exports = router;
