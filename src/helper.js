const { v4: uuid } = require('uuid');
require('dotenv').config();
const fs = require('fs');
const path = require('path')
const PORT = process.env.PORT || 8080;
const BASE_URL = process.env.BASE_URL || `http://localhost:`
const filePath = path.join(__dirname, '../data/videos.json')
let videosData;

// read videos data from JSON file
fs.readFile(filePath, 'utf8', (err, data) => {
    if (err) {
        console.error('Unable to read file:', err);
        return;
    }

    try {
        videosData = JSON.parse(data);
    } catch (error) {
        console.error('Error parsing JSON data:', error);
    }
});

const getAllVideosWithoutComments = () => videosData.map(({ id, title, channel, image }) => ({ id, title, channel, image }));;

const getVideoInfo = (id) => videosData.find(video => video.id === id)

const uploadVideo = (videoData) => {
    const newVideo = {
        "id": uuid(),
        "title": videoData.title,
        "channel": "Golden Rooster",
        "image": `http://localhost:8080/Upload-video-preview.jpg`,
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