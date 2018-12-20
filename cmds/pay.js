const Discord = require("discord.js");

module.exports.run = async (bot, message, args, pool) => {

    let replyChannel = message.guild.channels.find("name", "bot-spam");
    let payingUser = message.author;
    let targetUser = message.mentions.users.first();

    pool.query(`SELECT * FROM userdata WHERE id = '${payingUser.id}'`, (error, response) => {
        if(error) {
            console.log('DB_ERROR: ', error);
            replyChannel.send("Could not retrive anything from our DB.. 0_0").then(msg => {msg.delete(60000)});
        } else {
            if(!response.rows[0]) return replyChannel.send("Could not retrive anything from our DB.. 0_0").then(msg => {msg.delete(60000)});
            
            let payingUserCoins = response.rows[0].coins;
            // Validate the transfer 
            if (payingUserCoins < args[1]) return replyChannel.send("You dont own that much!").then(msg => {msg.delete(60000)});
            if (targetUser.id === message.author.id) return replyChannel.send("Cant send money to yourself!..Stopid.").then(msg => {msg.delete(60000)});
        
            //Complete the transfer
            pool.query(`UPDATE userdata SET coins = (coins - '${args[1]}') WHERE id='${payingUser.id}'`, (error, response) => {
            if(error) {
                console.log('DB_ERROR: ', error);
            }});
            pool.query(`UPDATE userdata SET coins = coins + '${args[1]}' WHERE id='${targetUser.id}'`, (error, response) => {
            if(error) {
                console.log('DB_ERROR: ', error);
            }});

            //Alert the transfer
            let payEmbed = new Discord.RichEmbed()
                .setColor("#00FF00")
                .addField(`💰 Transfer 💰`, `${message.author.username} has given <@${targetUser.id}> ${args[1]} coins.`);
            replyChannel.send(payEmbed);
            console.log(`${message.author.username} has given ${targetUser.username} ${args[1]} coins.`);
        }
    });
}

module.exports.help = {
    name: "pay"
}