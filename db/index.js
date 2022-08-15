const { Sequelize, STRING, UUID, UUIDV4 } = require("sequelize");
const db = new Sequelize(
  process.env.DATABASE_URL || "postgres://localhost:5432/dealers_choice_seq_2",
  {
    logging: false,
  }
);

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
    validate: {
      isEmail: true,
    },
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
  userId: {
    type: UUID,
    defaultValue: UUIDV4,
    allowNull: false,
  },
  convoId: {
    type: UUID,
    defaultValue: UUIDV4,
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
