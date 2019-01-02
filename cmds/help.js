const Discord = require("discord.js");

module.exports.run = async (bot, message, args) => {

    let embed = new Discord.RichEmbed()
        .setAuthor("!help command")
        .setDescription("Here's a list of all none moderator commands!")
        .setColor("#9b59b6")
        .addField("!userinfo ", `Displays your userinfo.`)
        .addField("!avatar ", `Displays your avatar img.`)
        .addField("!icon ", `Displays the server icon.`)
        .addField("!xp ", `Displays your currect experience.`)
        .addField("!level ", `Displays your current level.`)
        .addField("!topxp ", `Shows top 3 most experienced users, aswell as total Xp on the server.`)
        .addField("!coins ", `Displays your current coins amount.`)
        .addField("!topcoins ", `Shows top 3 richest users, aswell as the total amount of coins on the server.`)
        .addField("!daily ", `Adds a fixed amount of coins to your account, only useable once/day.`)
        .addField("!pay ", `Transfer coins to someone else EG: !pay [user] [amount].`)
        .addField("!kp ", `Shows two img's of culturepoints efficiency.`);

        let replyChannel = message.guild.channels.find("name", "bot-spam");
        replyChannel.send(embed).then(msg => {msg.delete(60000)});
        console.log(`Displayed help command to ${message.author.username}!`);
}

module.exports.help = {
    name: "help"
}