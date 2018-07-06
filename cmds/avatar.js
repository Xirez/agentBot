const Discord = require("discord.js");

module.exports.run = async (bot, message, args) => {
    let replyChannel = message.guild.channels.find("name", "bot-spam");
    let target = message.mentions.users.first() || message.author;

    let msg = await replyChannel.send("Hold on, just a few more pixels and i'm done!...");
    await replyChannel.send({files: [
        {
            attachment: target.displayAvatarURL,
            name: "avatar.png"
        }
    ]});

    msg.delete();
    console.log(`Displaying ${target.username}'s avatar on request of ${message.author.username}!`);
}

module.exports.help = {
    name: "avatar"
}