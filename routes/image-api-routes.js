//Dependency
const db = require("../models");

//routes
module.exports = (app) => {
  //get route for retrieving info from a single image
  app.get("/api/images/:id", (req, res) => {
    db.Image.findOne({
      where: {
        PlantId: req.params.id,
      },
      include: [db.Plant],
    }).then((dbImage) => res.send(dbImage.dataValues.data));
  });
};
