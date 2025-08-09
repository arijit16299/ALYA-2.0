module.exports = {
  config: {
    name: "ban",
    version: "1.0",
    author: "NIROB",
    role: 2,
    shortDescription: "Ban user from using bot",
    longDescription: "Admin can ban a user from accessing the bot",
    category: "admin",
    guide: "{p}ban [uid/reply]"
  },

  onStart: async function ({ message, event, args }) {
    const targetID = event.type === "message_reply" ? event.messageReply.senderID : args[0];
    if (!targetID) return message.reply("🛑 Use: {p}ban [uid/reply]");
    
    global.data.bannedUsers = global.data.bannedUsers || [];
    global.data.bannedUsers.push(targetID);
    return message.reply(`✅ User ${targetID} has been banned.`);
  }
};
