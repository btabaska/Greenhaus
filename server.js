const express = require("express");
const app = express();
const db = require("./models");
const initRoutes = require("./routes/html-routes.js");

global.__basedir = __dirname;

app.use(express.urlencoded({ extended: true }));
initRoutes(app);

db.sequelize.sync();
//This is used in development to drop and re-sync the database, uncomment and run if you have DB issues
// db.sequelize.sync({ force: true }).then(() => {
//   console.log("Drop and re-sync db.");
// });

let port = 3000;
app.listen(port, () => {
  console.log(`Running at localhost:${port}`);
});
