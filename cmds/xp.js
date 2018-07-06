const Discord = require("discord.js");

module.exports.run = async (bot, message, args, db) => {
    let target = message.mentions.users.first() || message.guild.members.get(args[1]) || message.author;
    let replyChannel = message.guild.channels.find("name", "bot-spam");
    
    db.then(client => {
        client.query(`SELECT xp FROM userdata WHERE id = ${target.id}`, function (err, result) {
            if (err) throw err

        if(!result[0]) return replyChannel.send("This user has not received any XP yet.").then(msg => {msg.delete(60000)});
        let xp = result[0].xp;
        let embed = new Discord.RichEmbed()
        .setColor("#9b59b6")
        .setAuthor(`${target.username}'s current XP is ${xp}`)
        .setDescription("Msg length/two = XP gain.");

        replyChannel.send(embed).then(msg => {msg.delete(60000)});
        console.log(`Displayed ${target.username}'s xp on request of ${message.author.username}!`);
        })
    })
}

module.exports.help = {
    name: "xp"
}