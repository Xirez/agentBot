const Discord = require("discord.js");
const moment = require("moment");

module.exports.run = async (bot, message, args, pool) => {
    let replyChannel = message.guild.channels.find("name", "bot-spam");

    pool.query(`SELECT * FROM userdata WHERE id = '${message.author.id}'`, (error, response) => {
        if(error) {
            console.log('DB_ERROR: ', error);
        } else {
            if(moment(response.rows[0].daily).format('YYYY-MM-DD') != moment().format('YYYY-MM-DD')){
                let dailyCoinAmt = 20;
                let daily = moment().format('YYYY-MM-DD');

                // Set confirmation msg
                let dailyEmbed = new Discord.RichEmbed()
                .setColor("#00FF00")
                .addField(message.author.username, ` I added your daily ${dailyCoinAmt} coins.💰`);
                
                //Send confirmation embed
                replyChannel.send(dailyEmbed).then(msg => {msg.delete(60000)});
                return new Promise((resolve, reject) => {
                    pool.query(
                      'UPDATE userdata SET daily = $1, coins = $2 WHERE id=$3',
                      [daily, response.rows[0].coins + dailyCoinAmt, message.author.id],
                      (error, response) => {
                        if (error) return reject(error);
                        if (response) console.log(`${message.author.username} climed the daily reward!`);
              
                        resolve();
                      }
                    )
                  });
            } else {
                replyChannel.send(`${message.author.username}, you already claimed your daily reward!`).then(msg => {msg.delete(6000)});
            }
        }
    });
}

module.exports.help = {
    name: "daily"
}