const Discord = require("discord.js");

module.exports.run = async (bot, message, args, pool) => {
    let replyChannel = message.guild.channels.find("name", "bot-spam");
    let guildXP = 0;
    let guildUsers = 0;

    pool.query(`SELECT username, xp FROM userdata ORDER BY xp DESC`, (error, response) => {
        if(error) {
            console.log('DB_ERROR: ', error);
            replyChannel.send("Could not retrive anything from our DB.. 0_0").then(msg => {msg.delete(60000)});
        } else {
            for(var i in response.rows) {
                guildXP += response.rows[i].xp;
                guildUsers += 1;
            }

            let rankOne = response.rows[0].username;
            let rankOneXP = response.rows[0].xp;
            let rankTwo = response.rows[1].username;
            let rankTwoXP = response.rows[1].xp;
            let rankThree = response.rows[2].username;
            let rankThreeXP = response.rows[2].xp;

            let embed = new Discord.RichEmbed()
            .setColor("#9b59b6")
            .setAuthor(`Top 3 active users!`)
            .addField(`1) ${rankOne}`, `${rankOneXP}`)
            .addField(`2) ${rankTwo}`, `${rankTwoXP}`)
            .addField(`3) ${rankThree}`, `${rankThreeXP}`)
            .setDescription(`There is a total of ${guildXP}xp among our ${guildUsers} users!`);

        replyChannel.send(embed);
        console.log(`Displaying Top 3 XP.`);
        }
    });
}

module.exports.help = {
    name: "topxp"
}