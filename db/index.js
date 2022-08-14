const { Sequelize, STRING, UUID, UUIDV4 } = require("sequelize");
const db = new Sequelize("postgres://localhost:5432/dealers_choice_seq_2", {
  logging: true,
});

const User = db.define("user", {
  id: {
    primaryKey: true,
    type: UUID,
    defaultValue: UUIDV4,
  },
  name: {
    type: STRING,
    allowNull: false,
    unique: true,
  },
  emailAddress: {
    type: STRING,
    allowNull: false,
    unique: true,
  },
});

const Convo = db.define("convo", {
  id: {
    primaryKey: true,
    type: UUID,
    defaultValue: UUIDV4,
  },
  title: {
    type: STRING,
    allowNull: false,
  },
  description: {
    type: STRING,
    allowNull: false,
  },
});

const Response = db.define("response", {
  id: {
    primaryKey: true,
    type: UUID,
    defaultValue: UUIDV4,
  },
  text: {
    type: STRING,
    allowNull: false,
  },
});

Convo.belongsTo(User);
User.hasMany(Convo);

Response.belongsTo(Convo);
Convo.hasMany(Response);

Response.belongsTo(User);
User.hasMany(Response);

module.exports = { db, User, Convo, Response };
