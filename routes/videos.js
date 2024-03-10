const express = require('express')
const router = express.Router();
const { getAllVideosWithoutComments, getVideoInfo, uploadVideo, postComments, deleteComment } = require('../src/helper')

//routes handlers
router.route('/').get((req, res) => {
    try {
        const videos = getAllVideosWithoutComments()
        res.status(200).json(videos)
    } catch (error) {
        res.status(400).send(`Couldn't retrieve videos data: ${error}`);
    }
})

router.route('/').post((req, res) => {
    try {
        const newVideo = uploadVideo(req.body);
        res.status(201).json(newVideo);
    } catch (error) {
        res.status(500).send(`Couldn't upload video: ${error}`);
    }
})

router.route('/:id')
    .get((req, res) => {
        try {
            const video = getVideoInfo(req.params.id)
            res.status(200).json(video)
        } catch (error) {
            res.status(400).send(`Couldn't retrieve video data: ${error}`);
        }
    }
    )

router.route('/:id/comments').post((req, res) => {
    try {
        const comment = postComments(req.params.id, req.body);
        res.status(201).json(comment);
    } catch (error) {
        res.status(500).send(`Couldn't post new comment: ${error}`);
    }

})

router.route('/:id/comments/:commentId').delete((req, res) => {
    try {
        const commentToRemoved = deleteComment(req.params.id, req.params.commentId)
        res.status(200).send(commentToRemoved)

    } catch (error) {
        res.status(404).send(`Couldn't delete comment: ${error}`);

    }
})

// export at the end of file
module.exports = router;