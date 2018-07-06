const Discord = require("discord.js");

module.exports.run = async (bot, message, args) => {
    let target = message.mentions.users.first() || message.guild.members.get(args[1]) || message.author;

    let embed = new Discord.RichEmbed()
        .setAuthor(target.username)
        .setDescription(`This is ${target.username}'s userinfo!`)
        .setColor("#9b59b6")
        .addField("Full Username: ", `${target.username}#${target.discriminator}`)
        .addField("User ID: ", `${target.id}`)
        .addField("Created at: ", target.createdAt);

        let replyChannel = message.guild.channels.find("name", "bot-spam");
        replyChannel.send(embed).then(msg => {msg.delete(60000)});

        console.log(`Displayed ${target.username}'s userinformation!`);
}

module.exports.help = {
    name: "userinfo"
}