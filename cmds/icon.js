const Discord = require("discord.js");

module.exports.run = async (bot, message, args) => {
    let replyChannel = message.guild.channels.find("name", "bot-spam");

    let msg = await replyChannel.send("Hold on, just a few more pixels and i'm done!...");
    if(!message.guild.iconURL) return msg.edit("This server has no custom icon.").then(msg => {msg.delete(6000)});
    await replyChannel.send({files: [
        {
            attachment: message.guild.iconURL,
            name: "icon.png"
        }
    ]});

    msg.delete();
    console.log(`Displaying ${message.guild.name}'s server icon!`);
}

module.exports.help = {
    name: "icon"
}