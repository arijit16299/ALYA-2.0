const fs = require("fs");
const path = require("path");

module.exports = {
  config: {
    name: "shayri",
    version: "1.6",
    author: "Nirob ",
    countDown: 5,
    role: 0,
    shortDescription: "Send shayri video with prefix",
    longDescription: "Send random shayri video with ❤️ react on prefix command",
    category: "Entertainment",
    guide: "{prefix}shayri"
  },

  onStart: async function () {},

  onMessage: async function ({ event, message, api }) {
    // Check if message starts with prefix + "shayri"
    const prefix = "/";  // তোমার বটের আসল prefix এখানে বসাও
    if (!event.body || !event.body.startsWith(prefix + "shayri")) return;
    if (event.senderID == api.getCurrentUserID()) return;

    const shayriFolder = path.join(__dirname, "shayri");
    if (!fs.existsSync(shayriFolder)) return;

    const videoFiles = fs.readdirSync(shayriFolder).filter(file =>
      file.endsWith(".mp4") || file.endsWith(".webm") || file.endsWith(".mov")
    );
    if (videoFiles.length === 0) return;

    api.setMessageReaction("❤️", event.messageID, () => {}, true);

    const randomVideo = videoFiles[Math.floor(Math.random() * videoFiles.length)];
    const videoPath = path.join(shayriFolder, randomVideo);

    return message.reply({
      attachment: fs.createReadStream(videoPath)
    });
  }
};
