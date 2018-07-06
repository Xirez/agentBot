const Discord = require("discord.js");

module.exports.run = async (bot, message, args, db) => {
    //Set all variables needed
    let guildCoins = 0;
    let guildUsers = 0;
    let rankOne = 0;
    let rankOneCoins = 0;
    let rankTwo = 0;
    let rankTwoCoins = 0;
    let rankThree = 0;
    let rankThreeCoins = 0;
    let replyChannel = message.guild.channels.find("name", "bot-spam");

    db.then(client => {
        client.query(`SELECT * FROM userdata`, function (err, result) {
        if (err) throw err
        if(!result[0]) return replyChannel.send("Could not retrive anything from our DB.. 0_0").then(msg => {msg.delete(60000)});
        
        for(var i in result) {
            guildCoins += result[i].coins;
            guildUsers += 1;
            // Calculate Rank 1
            if(result[i].coins > rankOneCoins){
                rankOne = result[i].username;
                rankOneCoins = result[i].coins;
            }
            // Calculate Rank 2
            if(result[i].coins < rankOneCoins && result[i].coins > rankTwoCoins){
                rankTwo = result[i].username;
                rankTwoCoins = result[i].coins;
            }
            // Calculate Rank 3
            if(result[i].coins < rankTwoCoins && result[i].coins > rankThreeCoins){
                rankThree = result[i].username;
                rankThreeCoins = result[i].coins;
            }
        }
        
        let embed = new Discord.RichEmbed()
        .setColor("#9b59b6")
        .setAuthor(`Top 3 Richest Users!`)
        .addField(`1) ${rankOne}`, `${rankOneCoins}`)
        .addField(`2) ${rankTwo}`, `${rankTwoCoins}`)
        .addField(`3) ${rankThree}`, `${rankThreeCoins}`)
        .setDescription(`There is a total of ${guildCoins} Coins among our ${guildUsers} users!`);

        replyChannel.send(embed);
        console.log(`Displaying Top 3 Richest Users.`);
        })
    })
    
}

module.exports.help = {
    name: "topcoins"
}