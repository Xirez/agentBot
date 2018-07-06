const Discord = require("discord.js");

module.exports.run = async (bot, message, args, db) => {
    //Set all variables needed
    let guildXP = 0;
    let guildUsers = 0;
    let rankOne = 0;
    let rankOneXP = 0;
    let rankTwo = 0;
    let rankTwoXP = 0;
    let rankThree = 0;
    let rankThreeXP = 0;
    let replyChannel = message.guild.channels.find("name", "bot-spam");

    db.then(client => {
        client.query(`SELECT * FROM userdata`, function (err, result) {
        if (err) throw err
        if(!result[0]) return replyChannel.send("Could not retrive anything from our DB.. 0_0").then(msg => {msg.delete(60000)});
        
        for(var i in result) {
            guildXP += result[i].xp;
            guildUsers += 1;
            // Calculate Rank 1
            if(result[i].xp > rankOneXP){
                rankOne = result[i].username;
                rankOneXP = result[i].xp;
            }
            // Calculate Rank 2
            if(result[i].xp < rankOneXP && result[i].xp > rankTwoXP){
                rankTwo = result[i].username;
                rankTwoXP = result[i].xp;
            }
            // Calculate Rank 3
            if(result[i].xp < rankTwoXP && result[i].xp > rankThreeXP){
                rankThree = result[i].username;
                rankThreeXP = result[i].xp;
            }
        }
        
        let embed = new Discord.RichEmbed()
        .setColor("#9b59b6")
        .setAuthor(`Top 3 active users!`)
        .addField(`1) ${rankOne}`, `${rankOneXP}`)
        .addField(`2) ${rankTwo}`, `${rankTwoXP}`)
        .addField(`3) ${rankThree}`, `${rankThreeXP}`)
        .setDescription(`There is a total of ${guildXP}xp among our ${guildUsers} users!`);

        replyChannel.send(embed);
        console.log(`Displaying Top 3 XP.`);
        })
    })
    
}

module.exports.help = {
    name: "topxp"
}