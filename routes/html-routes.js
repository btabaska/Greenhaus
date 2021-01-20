// Dependencies
const path = require("path");
const express = require("express");
const router = express.Router();
const homeController = require("../controllers/home");
const uploadController = require("../controllers/upload");
const upload = require("../middleware/upload");

// Routes
let routes = (app) => {
  //Upload Page
  router.get("/uploads", homeController.getHome);
  //Home Page
  router.get("/", (req, res) =>
    res.sendFile(path.join(__dirname, "../public/index.html"))
  );

  // user manager route
  router.get("/users", (req, res) =>
    res.sendFile(path.join(__dirname, "../public/user-manager.html"))
  );

  // plants route goes to plants.html
  router.get("/plants", (req, res) =>
    res.sendFile(path.join(__dirname, "../public/plants.html"))
  );

  // no idea what to do with this route right now.
  router.get("/users", (req, res) =>
    res.sendFile(path.join(__dirname, "../public/user.html"))
  );
  router.post("/upload", upload.single("file"), uploadController.uploadFiles);

  return app.use("/", router);
};

module.exports = routes;

let routes = (app) => {};
