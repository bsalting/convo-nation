const app = require("./app");
const PORT = process.env.PORT || 3000;
const { db, User, Convo, Response } = require("./db");

const setup = async () => {
  try {
    await db.sync({ force: true });

    const [bsalting, mlopez, lpineda, testAcct] = await Promise.all([
      User.create({
        name: "admin",
        emailAddress: "admin@convo-nation.com",
      }),
      User.create({
        name: "bsalting",
        emailAddress: "bsalting@jpmorgan.com",
      }),
      User.create({
        name: "mlopez",
        emailAddress: "mlopez@yahoo.com",
      }),
      User.create({
        name: "lpineda",
        emailAddress: "lpineda@yahoo.com",
      }),
      User.create({
        name: "gatencio",
        emailAddress: "gatencio@yahoo.com",
      }),
    ]);

    const convoSeed = [
      {
        title: "Do you like Sequelize?",
        description: "I'm not sure I like it.. Thoughts?",
        userId: bsalting.id,
      },
      {
        title: "Covid is dead! Share your 'revenge travel' plans!",
        description: "Where to go? Share your recent trips...",
        userId: mlopez.id,
      },
      {
        title: "Will crypto bounce back this year?",
        description: "Should I hold, or buy more?",
        userId: testAcct.id,
      },
      {
        title: "Help! My first tech interview is in 3 days!",
        description: "Tips to ace that tech interview...",
        userId: testAcct.id,
      },
    ];

    const [convo1, convo2, convo3, convo4] = await Promise.all(
      convoSeed.map((convo) => {
        return Convo.create(convo);
      })
    );

    const responseSeed = [
      {
        text: "I'm already getting comfortable with SQL, now this?",
        convoId: convo1.id,
        userId: mlopez.id,
      },
      {
        text: "Just keep at it, should  make your life easier.. eventually.. Haha!",
        convoId: convo1.id,
        userId: lpineda.id,
      },
      {
        text: "I didn't like it at first, now I'm seeing the benefits!",
        convoId: convo1.id,
        userId: bsalting.id,
      },
      {
        text: "Booked a trip to Turkiye last week! Ticket still says 'Turkey' LOL",
        convoId: convo2.id,
        userId: bsalting.id,
      },
      {
        text: "I wanna go to Bhutan! But they're  still not open to tourists!",
        convoId: convo2.id,
        userId: testAcct.id,
      },
      {
        text: "LOL! Covid is not the issue, I'm broke! ^^",
        convoId: convo2.id,
        userId: mlopez.id,
      },
      {
        text: "It's depressing looking at my portfolio! But I have a better  market outlook for Q4!",
        convoId: convo3.id,
        userId: bsalting.id,
      },
      {
        text: "You're doomed. Nothing you do now will make a difference!",
        convoId: convo4.id,
        userId: mlopez.id,
      },
      {
        text: "Pray to all the gods!",
        convoId: convo4.id,
        userId: lpineda.id,
      },
    ];

    await Promise.all(
      responseSeed.map((response) => {
        Response.create(response);
      })
    );

    app.listen(PORT, () => {
      console.log(`Convo app listening on ${PORT}`);
    });
  } catch (err) {
    console.log(err);
  }
};

setup();
