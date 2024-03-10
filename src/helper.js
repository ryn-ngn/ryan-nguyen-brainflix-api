const { v4: uuid } = require("uuid");
require("dotenv").config();
const fs = require("fs");
const path = require("path");
const PORT = process.env.PORT || 8080;
const BASE_URL = process.env.BASE_URL || `http://localhost:`;
const filePath = path.join(__dirname, "../data/videos.json");
let videosData;

// read videos data from JSON file
fs.readFile(filePath, "utf8", (err, data) => {
    if (err) {
        console.error("Unable to read file:", err);
        return;
    }

    try {
        videosData = JSON.parse(data);
    } catch (error) {
        console.error("Error parsing JSON data:", error);
    }
});

// loop through data
// use destructuring object to get id, title, channel, and image properties from each video object to create a new object
const getAllVideosWithoutComments = () =>
    videosData.map(({ id, title, channel, image }) => ({ id, title, channel, image }));

const getVideoInfo = (id) => videosData.find((video) => video.id === id);

// videoData parameter is data received from form input in FE react app
// videoData is of type { 'title': title, 'description': description }
const uploadVideo = (videoData) => {
    const newVideo = {
        id: uuid(),
        title: videoData.title,
        channel: "Golden Rooster",
        image: `http://localhost:8080/Upload-video-preview.jpg`,
        description: videoData.description,
        views: 0,
        likes: 0,
        duration: "0:05",
        video: "",
        timestamp: Date.now(),
        comments: [],
    };

    videosData.push(newVideo);

    // parse data to prepare to write to file
    const jsonVideosData = JSON.stringify({ videosData: videosData }, null, 2);

    writeVideosData("*** New Video");
};

const postComments = (videoId, comment) => {
    const newComment = {
        id: uuid(),
        name: comment.name,
        comment: comment.comment,
        likes: 0,
        timestamp: Date.now(),
    };

    const { comments } = getVideoInfo(videoId);
    comments.push(newComment);

    writeVideosData("*** New Comment");
    return comments[comments.length - 1];
};

const deleteComment = (videoId, commentId) => {

    const tempVideo = getVideoInfo(videoId);

    const commentToRemove = tempVideo.comments.find((comment) => comment.id === commentId);
    tempVideo.comments = tempVideo.comments.filter((comment) => comment.id !== commentId);

    writeVideosData("*** Removed Comment");

    return commentToRemove;
};

const writeVideosData = (typeOfNewDataPersisted) => {
    // parse data to prepare to write to file
    const jsonVideosData = JSON.stringify(videosData, null, 2);

    fs.writeFile(filePath, jsonVideosData, (err) => {
        if (err) {
            console.error("Error writing to file:", err);
        } else {
            console.log(`${typeOfNewDataPersisted} data persisted successfully`);
        }
    });
};

module.exports = {
    PORT,
    BASE_URL,
    getAllVideosWithoutComments,
    getVideoInfo,
    uploadVideo,
    postComments,
    deleteComment,
};
