const Discord = require("discord.js");
const moment = require("moment");

module.exports.run = async (bot, message, args, db) => {
    let replyChannel = message.guild.channels.find("name", "bot-spam");

    db.then(client => {
        client.query(`SELECT * FROM userdata WHERE id = ${message.author.id}`, function (err, result) {
            if (err) throw err

            if(moment(result[0].daily).format('YYYY-MM-DD') != moment().format('YYYY-MM-DD')){
                let dailyCoinAmt = 20;
                let daily = moment().format('YYYY-MM-DD');

                // Set confirmation msg
                let dailyEmbed = new Discord.RichEmbed()
                .setColor("#00FF00")
                .addField(message.author.username, ` I added your daily ${dailyCoinAmt} coins.💰`);
                
                //Send confirmation embed
                replyChannel.send(dailyEmbed).then(msg => {msg.delete(60000)});
                db.then(client => {
                    client.query(`UPDATE userdata SET daily = '${daily}', coins = ${result[0].coins + dailyCoinAmt} WHERE id=${message.author.id}`, function (err, result) {
                        if (err) throw err
                        
                        console.log(`${message.author.username} climed the daily reward!`);
                    })
                })
            } else {
                replyChannel.send(`${message.author.username}, you already claimed your daily reward!`).then(msg => {msg.delete(6000)});
            }
        })
    })
}

module.exports.help = {
    name: "daily"
}