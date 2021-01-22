//TODO ADD USER API ROUTES
const db = require("../models");

module.exports = (app) => {
  //GET route for retrieving info from all users
  app.get("/api/users", (req, res) => {
    db.User.findAll({
      include: [db.Plant],
    }).then((dbUser) => {
      res.json(dbUser);
    });
  });
  //GET route for retrieving info from a single user
  app.get("/api/users/:id", (req, res) => {
    db.User.findOne({
      where: {
        id: req.params.id,
      },
      include: [db.Plant],
    }).then((dbPlant) => res.json(dbPlant));
  });
  //Post route for creating a new user
  app.post("/api/users", (req, res) => {
    db.User.create(req.body).then((dbUser) => res.json(dbUser));
  });
  //DELETE route for deleting a specific user
  app.delete("/api/users/:id", (req, res) => {
    db.User.destroy({
      where: {
        id: req.params.id,
      },
    }).then((dbUser) => res.json(dbUser));
  });
};
