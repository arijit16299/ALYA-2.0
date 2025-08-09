const fs = require("fs");
const path = require("path");

module.exports = {
  config: {
    name: "guessani",
    version: "1.0",
    author: "NIROB",
    shortDescription: "Guess anime character game",
    longDescription: "Send a blurred anime character and ask to guess",
    category: "games",
    guide: "{p}guessani",
  },

  onStart: async function ({ api, event, message }) {
    const characters = [
      { name: "naruto", file: "naruto_blur.jpg" },
      { name: "luffy", file: "luffy_blur.jpg" },
      { name: "gojo", file: "gojo_blur.jpg" },
      { name: "goku", file: "goku_blur.jpg" },
    ];

    const random = characters[Math.floor(Math.random() * characters.length)];
    const filePath = path.join(__dirname, "anime_images", random.file);

    if (!fs.existsSync(filePath)) return message.reply("Image file missing.");

    message.reply(
      { body: "Guess this anime character!", attachment: fs.createReadStream(filePath) },
      (err, info) => {
        global.guessAnime = global.guessAnime || {};
        global.guessAnime[info.messageID] = random.name.toLowerCase();
      }
    );
  },

  onReply: async function ({ event, message }) {
    const guess = event.body.toLowerCase();
    const correct = global.guessAnime?.[event.messageReply?.messageID];

    if (!correct) return;

    if (guess === correct) {
      message.reply("🎉 Correct! That's " + correct.toUpperCase());
    } else {
      message.reply("❌ Wrong! Try again.");
    }
  },
};
