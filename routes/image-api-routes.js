//requiring all models
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

// const blobToImage = (blob) => {
//   return new Promise((resolve) => {
//     const url = URL.createObjectURL(blob);
//     let img = new Image();
//     img.onload = () => {
//       URL.revokeObjectURL(url);
//       resolve(img);
//     };
//     img.src = url;
//   });
// };
