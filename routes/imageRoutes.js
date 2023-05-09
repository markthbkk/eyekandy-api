const express = require("express");
const imageController = require("../controllers/imageController");

const router = express.Router();

router.route("/api/search/photos").get(imageController.searchPhotos);

router.route("/api/image").get(imageController.getAllImages);
router.route("/api/image").post(imageController.createImage);
router.route("/api/image/:id").delete(imageController.deleteImage);
router.route("/api/image/:id").patch(imageController.updateImage);
router.route("/api/image/:id").get(imageController.getSingleImage);
router.route("/api/images/search").post(imageController.searchImages);


module.exports = router;
