const { v4: uuid } = require('uuid');
let { videosData } = require('../data/videos.json')
require('dotenv').config();
const fs = require('fs');
const path = require('path')
const PORT = process.env.PORT || 8080;
// BASE_URL was necessary in my environment because Express app being served from another computer, not localhost
const BASE_URL = process.env.BASE_URL || `http://localhost:${PORT}`


const getAllVideosWithoutComments = () => {
    const allVideosWithoutComments = videosData.map(({ id, title, channel, image }) => ({ id, title, channel, image: `${BASE_URL}:${PORT}${image}` }));

    return allVideosWithoutComments;
}

const getVideoInfo = (id) => {
    const matchingVideo = videosData.find(video => video.id === id)
    matchingVideo.image = `${BASE_URL}:${PORT}${matchingVideo.image}`
    return matchingVideo;
}

const uploadVideo = (videoData) => {
    const newVideo = {
        "id": uuid(),
        "title": videoData.title,
        "channel": "Golden Rooster",
        "image": `/Upload-video-preview.jpg`,
        "description": videoData.description,
        "views": 0,
        "likes": 0,
        "duration": "0:05",
        "video": "",
        "timestamp": Date.now(),
        "comments": []
    }

    videosData.push(newVideo)
    const jsonVideosData = JSON.stringify({ "videosData": videosData }, null, 2)
    const filePath = path.join(__dirname, '../data/videos.json')
    fs.writeFile(filePath, jsonVideosData, (err) => {
        if (err) {
            console.error('Error writing to file:', err);
        } else {
            console.log('Videos data persisted successfully');
        }
    });
}

module.exports = {
    PORT,
    BASE_URL,
    getAllVideosWithoutComments,
    getVideoInfo,
    uploadVideo
}