const Discord = require("discord.js");

module.exports.run = async (bot, message, args) => {
    let replyChannel = message.guild.channels.find("name", "bot-spam");

    replyChannel.send("Culturepoints, wuh!", {files: ["./img/kp.png", "./img/kp2.jpg"]});

    console.log(`Displaying KP img's on behalf of ${message.author.username}.`);
}

module.exports.help = {
    name: "kp"
}