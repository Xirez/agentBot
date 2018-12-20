const Discord = require("discord.js");

module.exports.run = async (bot, message, args, pool) => {
    let replyChannel = message.guild.channels.find("name", "bot-spam");
    let guildCoins = 0;
    let guildUsers = 0;

    pool.query(`SELECT username, coins FROM userdata ORDER BY coins DESC`, (error, response) => {
        if(error) {
            console.log('DB_ERROR: ', error);
            replyChannel.send("Could not retrive anything from our DB.. 0_0").then(msg => {msg.delete(60000)});
        } else {
            for(var i in response.rows) {
                guildCoins += response.rows[i].coins;
                guildUsers += 1;
            }
            
            let rankOne = response.rows[0].username;
            let rankOneCoins = response.rows[0].coins;
            let rankTwo = response.rows[1].username;
            let rankTwoCoins = response.rows[1].coins;
            let rankThree = response.rows[2].username;
            let rankThreeCoins = response.rows[2].coins;

            let embed = new Discord.RichEmbed()
            .setColor("#9b59b6")
            .setAuthor(`Top 3 Richest Users!`)
            .addField(`1) ${rankOne}`, `${rankOneCoins}`)
            .addField(`2) ${rankTwo}`, `${rankTwoCoins}`)
            .addField(`3) ${rankThree}`, `${rankThreeCoins}`)
            .setDescription(`There is a total of ${guildCoins} Coins among our ${guildUsers} users!`);

            replyChannel.send(embed);
            console.log(`Displaying Top 3 Richest Users.`);
        }
    });
}

module.exports.help = {
    name: "topcoins"
}