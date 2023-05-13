const image = require("../models/imageModel");

const unsplash = require("unsplash-js").createApi({
  accessKey: "FVwXk0wuiRsL_OLhSNRIDzdGZfHhHFmGoQr0VS9rUZg",
  fetch: require("node-fetch"),
});

exports.searchPhotos = async (req, res) => {
  const { query, page, per_page } = req.query;
  console.log(req.query);
  try {
    const response = await unsplash.search.getPhotos({
      query,
      page,
      perPage: per_page,
    });
    //   console.log(response.response);
    console.log(response.response.total_pages);
    res.send(response.response);
  } catch (error) {
    res.status(500).send(error);
  }
};

exports.searchUserPhotos = async (req, res) => {
  const { page, per_page } = req.query;
  const username = req.params.id;
  console.log(username, page, per_page);
  console.log(req.query);
  try {
    const response = await unsplash.users.getPhotos({
      username,
      page,
      perPage: per_page,
    });
    //   console.log(response.response);
    console.log(response.response);
    res.set("Access-Control-Expose-Headers", "X-Total-Count,X-Total-Pages,X-Total");
    res.set("X-Total-Count", per_page);
    res.set("X-Total", per_page);
    res.set("X-Total-Pages", 1);
    response.response.total_pages = 1
    response.response.total = per_page;
    res.send(response.response);
  } catch (error) {
    res.status(500).send(error);
  }
};

exports.getAllImages = async (req, res) => {
  console.log("Getting Requested Images");

  try {
    const Images = await image.find();
    console.log(Images);
    res.status(200).send(Images);
  } catch (err) {
    res.status(404).json({
      status: "fail",
      message: err,
    });
  }
};

exports.getSingleImage = async (req, res) => {
  console.log("IMAGE-ID");
  console.log(req.params.id);

  try {
    const Image = await image.find({ id: req.params.id });
    console.log(Image);
    res.status(200).send(Image);
  } catch (err) {
    res.status(404).json({
      status: "fail",
      message: err,
    });
  }
};

exports.createImage = async (req, res) => {
  try {
    console.log(req.body);
    const newImage = await image.create(req.body);
    console.log(newImage);
    res.send(newImage);
  } catch (err) {
    res.status(400).json({
      status: "fail",
      message: err,
    });
  }
};

exports.deleteImage = async (req, res) => {
  console.log(req.params.id);

  try {
    await image.findByIdAndDelete(req.params.id);

    res.status(204).json({
      status: "success",
      data: null,
    });
  } catch (err) {
    res.status(404).json({
      status: "fail",
      message: err,
    });
  }
};

exports.updateImage = async (req, res) => {
  console.log(req.params.id);
  const { operation, tags: tag } = req.body;
  console.log(operation, tag);
  try {
    let Image;

    if (operation === "addtag") {
      Image = await image.findOneAndUpdate(
        { id: req.params.id },
        { $push: { tags: tag } },
        { new: true }
      );
    }
    if (operation === "deletetag") {
      Image = await image.findOneAndUpdate(
        { id: req.params.id },
        { $pull: { tags: tag } },
        { new: true }
      );
    }

    res.send(Image);
  } catch (err) {
    res.status(400).json({
      status: "fail",
      message: err,
    });
  }
};

exports.searchImages = async (req, res) => {
  const { owner, skip, limit, keyword } = req.body;

  console.log(owner, skip, limit, keyword);

  let Images;

  let data = {};
  let count;

  try {
    if (keyword) {
      Images = await image
        .find({ owner: owner, tags: keyword })
        .skip(skip)
        .limit(limit);

      count = await image.countDocuments({ owner: owner, tags: keyword });
    } else {
      Images = await image.find({ owner: owner }).skip(skip).limit(limit);
      count = await image.countDocuments({ owner: owner });
    }

    console.log(count);

    data.count = count;
    data.images = Images;

    // console.log(data)

    res.status(200).send(data);
  } catch (err) {
    res.status(400).json({
      status: "fail",
      message: err,
    });
  }
};
