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

app.use("/convos", require("./routes/convos"));

app.get("/users", async (req, res, next) => {
  res.send(
    layout(
      `<p id="info">Simulating a logged in user via form drop-downs... :p</p>`
    )
  );
});

app.get("/", function (req, res) {
  res.redirect("/convos");
});

// app.use((err, req, res, next) => {
//   res
//     .status(404)
//     .send(
//       layout(`<p id="info"> An error occured... <a href="/">Go Back</a></p> `)
//     );
// });

app.use((req, res) => {
  res
    .status(404)
    .send(
      layout(
        `<p id="info"> You're not supposed to be here... <a href="/">Go Back</a></p> `
      )
    );
});

module.exports = app;
