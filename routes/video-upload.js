
const express = require('express')
const router = express.Router();

const { uploadVideo } = require('./src/helper')

//routes handlers
router.post('/', (req, res) => {
  try {
    const video = uploadVideo(req.body);
    res.status(201).json(video);
  } catch (error) {
    res.status(500).send(`Couldn't upload video: ${error}`);
  }

});

// export at the end of file
module.exports = router;