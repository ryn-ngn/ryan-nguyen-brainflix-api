let videosData = require('../data/videos.json')

const getAllVideosWithoutComments = () => {
    const allVideosWithoutComments = videosData.map(({ id, title, channel, image }) => ({ id, title, channel, image }));

    return allVideosWithoutComments;
}

const getVideoInfo = (id) => {
    const matchingVideo = videosData.find( video => video.id === id)

    return matchingVideo;
}

module.exports = {
    getAllVideosWithoutComments,
    getVideoInfo,
}