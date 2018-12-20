const Discord = require("discord.js");

module.exports.run = async (bot, message, args, pool) => {
    let target = message.mentions.users.first() || message.guild.members.get(args[1]) || message.author;
    let replyChannel = message.guild.channels.find("name", "bot-spam");

    pool.query(`SELECT xp FROM userdata WHERE id = '${target.id}'`, (error, response) => {
        if(error) {
            console.log('DB_ERROR: ', error);
        } else {
            if(!response.rows[0]) return replyChannel.send("This user has not received any XP yet.").then(msg => {msg.delete(60000)});
            
            xp = response.rows[0].xp;
            points = 0;
            output = 0;
            minlevel = 2;
            maxlevel = 200;
            
            for (lvl = 1; lvl <= maxlevel; lvl++) {
                points += Math.floor(lvl + 300 * Math.pow(2, lvl / 7));
                if (lvl >= minlevel)
                output = Math.floor(points / 4);
        
                if (xp <= output) {
                    let embed = new Discord.RichEmbed()
                    .setColor("#9b59b6")
                    .setAuthor(`${target.username}'s current level is ${lvl}`)
                    .setDescription(`${xp}/${output}xp to level ${lvl + 1}!`);

                    replyChannel.send(embed);
                    console.log(`Displayed ${target.username}'s level on request of ${message.author.username}!`);
                    return;
                }
            }
        }
    });
}

module.exports.help = {
    name: "level"
}