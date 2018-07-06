const Discord = require("discord.js");

module.exports.run = async (bot, message, args, db) => {

    let replyChannel = message.guild.channels.find("name", "bot-spam");
    let payingUser = message.author;
    let targetUser = message.mentions.users.first();

    //Grab the amount of coins the payingUser and the targetUser has.
    db.then(client => {
        client.query(`SELECT * FROM userdata WHERE id = ${payingUser.id}`, function (err, result) {
        if (err) throw err
        if(!result[0]) return replyChannel.send("Could not retrive anything from our DB.. 0_0").then(msg => {msg.delete(60000)});
        
        let payingUserCoins = result[0].coins;
        // Validate the transfer 
        if (payingUserCoins < args[1]) return replyChannel.send("You dont own that much!").then(msg => {msg.delete(60000)});
        if (targetUser.id === message.author.id) return replyChannel.send("Cant send money to yourself!..Stopid.").then(msg => {msg.delete(60000)});

        //Complete the transfer
        db.then(client => {
            client.query(`UPDATE userdata SET coins = (coins - ${args[1]}) WHERE id=${payingUser.id}`, function (err, result) {
                if (err) throw err
            })
        })
        db.then(client => {
            client.query(`UPDATE userdata SET coins = coins + ${args[1]} WHERE id=${targetUser.id}`, function (err, result) {
                if (err) throw err
            })
        })

        //Alert the transfer
        let payEmbed = new Discord.RichEmbed()
            .setColor("#00FF00")
            .addField(`💰 Transfer 💰`, `${message.author.username} has given <@${targetUser.id}> ${args[1]} coins.`);
        replyChannel.send(payEmbed);
        console.log(`${message.author.username} has given ${targetUser.username} ${args[1]} coins.`);

        })
    })
}

module.exports.help = {
    name: "pay"
}