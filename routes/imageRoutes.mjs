import express from "express";
import {
  searchPhotos,
  searchUserPhotos,
  getAllImages,
  createImage,
    deleteImage,
  updateImage,
  getSingleImage,
  searchImages,
} from "../controllers/imageController.mjs";

const router = express.Router();

router.route("/api/search/photos").get(searchPhotos);
router.route("/api/users/:id/photos").get(searchUserPhotos);
router.route("/api/image").get(getAllImages);
router.route("/api/image").post(createImage);
router.route("/api/image/:id").delete(deleteImage);
router.route("/api/image/:id").patch(updateImage);
router.route("/api/image/:id").get(getSingleImage);
router.route("/api/images/search").post(searchImages);

export default router;
