const Discord = require("discord.js");

module.exports.run = async (bot, message, args, db) => {
    let target = message.mentions.users.first() || message.guild.members.get(args[1]) || message.author;
    let replyChannel = message.guild.channels.find("name", "bot-spam");
    
    db.then(client => {
        client.query(`SELECT coins FROM userdata WHERE id = ${target.id}`, function (err, result) {
            if (err) throw err

        if(!result[0]) return replyChannel.send("This user has no coins..").then(msg => {msg.delete(60000)});
        let coins = result[0].coins;
        let embed = new Discord.RichEmbed()
        .setColor("#9b59b6")
        .setAuthor(`${target.username}' owns a total of ${coins} coins!`)
        .setDescription("Msg's longer then 10 characters gives 1-3 coins.");

        replyChannel.send(embed);
        console.log(`Displayed ${target.username}'s coins on request of ${message.author.username}!`);
        })
    })
}

module.exports.help = {
    name: "coins"
}