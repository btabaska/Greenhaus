//Dependencies
const path = require("path");

//path for uploads.html where we can upload photos of plants
const home = (req, res) => {
  return res.sendFile(path.join(`${__dirname}/../public/uploads.html`));
};

module.exports = {
  getHome: home,
};
