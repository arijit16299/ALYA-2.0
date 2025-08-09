module.exports = {
  config: {
    name: "balance",
    aliases: ["bal"],
    version: "2.0",
    author: "Arijit + Fix by KAKASHI",
    countDown: 5,
    role: 0,
    description: {
      vi: "Xem số tiền hiện có của bạn hoặc người được tag",
      en: "View your money or the money of the tagged person"
    },
    category: "economy",
    guide: {
      vi: "   {pn}: xem số tiền của bạn\n   {pn} <@tag>: xem số tiền của người được tag",
      en: "   {pn}: view your money\n   {pn} <@tag>: view the money of the tagged person"
    }
  },

  onStart: async function ({ message, usersData, event }) {
    function formatAmount(num) {
      if (typeof num !== "number") return num;
      if (num === 0) return "0$";
      const suffixes = ["", "K", "M", "B", "T", "Q"];
      const tier = Math.floor(Math.log10(num) / 3);
      const suffix = suffixes[tier] || "";
      const scale = Math.pow(10, tier * 3);
      const scaled = num / scale;
      return scaled.toFixed(1).replace(/\.0$/, '') + suffix + "$";
    }

    const mentionIDs = Object.keys(event.mentions || {});
    if (mentionIDs.length > 0) {
      let reply = "";
      for (const uid of mentionIDs) {
        const name = event.mentions[uid];
        const balance = await usersData.get(uid, "money") || 0;
        reply += 👤 ${name}, 𝐛𝐚𝐥𝐚𝐧𝐜𝐞 𝐢𝐬 ${formatAmount(balance)}\n;
      }
      return message.reply(reply.trim());
    }

    const selfBalance = await usersData.get(event.senderID, "money") || 0;
    return message.reply(𝐁𝐚𝐛𝐲, 𝐘𝐨𝐮𝐫 𝐛𝐚𝐥𝐚𝐧𝐜𝐞 ${formatAmount(selfBalance)});
  }
};
