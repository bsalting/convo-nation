const express = require("express");
const morgan = require("morgan");
const { Convo } = require("./db");
const { layout, convoDetail, convoList, convoAdd } = require("./views");
const app = express();

app.use(morgan("dev"));
app.use(express.static("./public"));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(require("method-override")("_method"));

app.use("/users", require("./routes/users"));
app.use("/convos", require("./routes/convos"));

app.get("/", function (req, res) {
  res.redirect("/convos");
});

app.use((err, req, res, next) => {
  console.log(err);
  res
    .status(404)
    .send(
      layout(
        `<p id="info"> A handled exception occured. Please notify admin. <a href="/">Go Back</a></p> `
      )
    );
});

app.use((req, res) => {
  res
    .status(404)
    .send(
      layout(
        `<p id="info"> Cannot handle request... <a href="/">Go Back</a></p> `
      )
    );
});

module.exports = app;
