//requiring all models
const db = require("../models");

//routes
module.exports = (app) => {
  app.get("/api/images", (req, res) => {
    const query = {};
    if (req.query.plant_id) {
      query.PlantId = req.query.plant_id;
    }
    db.Image.findAll({
      where: query,
      include: [db.Plant],
    }).then((dbImage) => res.json(dbImage));
  });

  //get route for retrieving info from a single image
  app.get("/api/images/:id", (req, res) => {
    db.Image.findOne({
      where: {
        id: req.params.id,
      },
      include: [db.Plant],
    }).then((dbImage) => res.json(dbImage));
  });
};
