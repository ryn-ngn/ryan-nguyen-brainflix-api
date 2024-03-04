const express = require('express')
const router = express.Router();
const { getAllVideosWithoutComments, getVideoInfo } = require('../src/helper')

//routes handlers
router.route('/').get((req,res) => {
    res.json(getAllVideosWithoutComments())
})

router.route('/:id')
    .get((req,res) => res.json(getVideoInfo(req.params.id)))
// export at the end of file
module.exports = router;