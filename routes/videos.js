const express = require('express')
const router = express.Router();
const { getAllVideosWithoutComments, getVideoInfo, uploadVideo } = require('../src/helper')

//routes handlers
router.route('/').get((req, res) => {
    res.json(getAllVideosWithoutComments())
})

router.route('/').post((req, res) => {
    try {
        const video = uploadVideo(req.body);
        res.status(201).json(video);
    } catch (error) {
        res.status(500).send(`Couldn't upload video: ${error}`);
    }
})

router.route('/:id')
    .get((req, res) => res.json(getVideoInfo(req.params.id)))

// export at the end of file
module.exports = router;