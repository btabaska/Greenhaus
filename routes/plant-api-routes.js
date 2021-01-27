//TODO ADD PLANT API ROUTES

//requiring all models
const db = require("../models");

//routes
module.exports = (app) => {
  app.get("/api/plants", (req, res) => {
    const query = {};
    if (req.query.user_id) {
      query.UserId = req.query.user_id;
    }
    db.Plant.findAll({
      where: query,
      include: [db.User],
    }).then((dbPlant) => res.json(dbPlant));
  });

  //get route for retrieving info from a single plant
  app.get("/api/plants/:id", (req, res) => {
    db.Plant.findOne({
      wher: {
        id: req.params.id,
      },
      include: [db.User],
    }).then((dbPlant) => res.json(dbPlant));
  });

  //POST route for saving a new plant
  app.post("/api/plants", (req, res) => {
    db.Plant.create(req.body).then((dbPlant) => res.json(dbPlant));
  });

  //DELETE route for deleting plants
  app.delete("/api/plants/:id", (req, res) => {
    db.Plant.destroy({
      where: {
        id: req.params.id,
      },
    }).then((dbPlant) => res.json(dbPlant));
  });

  //PUT route for updating plants
  app.put("/api/plants", (req, res) => {
    db.Plant.update(req.body, {
      where: {
        id: req.body.id,
      },
    }).then((dbPlant) => res.json(dbPlant));
  });
};
