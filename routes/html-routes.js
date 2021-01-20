// Dependencies
const path = require("path");
const express = require("express");
const router = express.Router();
const homeController = require("../controllers/home");
const uploadController = require("../controllers/upload");
const upload = require("../middleware/upload");

// Routes
let routes = (app) => {
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

  //Upload Page
  router.get("/uploads", homeController.getHome);
  router.post("/upload", upload.single("file"), uploadController.uploadFiles);
  return app.use("/", router);
};

module.exports = routes;
