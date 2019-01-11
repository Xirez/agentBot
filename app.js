const settings = require("./settings/settings.json");
const Discord = require("discord.js");
const fs = require("fs");
const { Pool } = require('pg');
const databaseConfiguration = require('./settings/databaseConfiguration.js');

const bot = new Discord.Client({autoReconnect: true});

//Command Handler
bot.commands = new Discord.Collection();
fs.readdir("./cmds/", (err, files) => {
    if(err) console.error(err);
    let jsfiles = files.filter(f => f.split(".").pop() === "js");
    if(jsfiles.length <= 0) {
        console.log("No commands to load!");
        return;
    }
    
    console.log(`Loading ${jsfiles.length} commands!`);
    jsfiles.forEach((f, i) => {
        let props = require(`./cmds/${f}`);
        console.log(`${i + 1}: ${f} loaded!`);
        bot.commands.set(props.help.name, props);
    });
});

// Start of pSQL DB con
const pool = new Pool(databaseConfiguration);
console.log('Connection to database established!');

bot.on("message", async message => {
    if(message.author.bot) return;
    if(message.channel.type === "dm") return;
    if(message.content.startsWith('http')) return;

    // Start updates of xp and coins system
    let xp = Math.floor(message.content.length / 2);

    if(message.content.length <= 9) {
        coins = 0;
    } else {
        coins = Math.floor((Math.random() * 3)+ 1);
    }
    pool.query(`SELECT * FROM userdata WHERE id = '${message.author.id}'`, (error, response) => {
        if(error) {
            console.log('DB_ERROR: ', error);
        } else {
            if(response == 'undefined' < 1){
                pool.query(`INSERT INTO userdata (id, username, xp, coins, daily) VALUES ( '${message.author.id}','${message.author.username}', '${xp}', '${coins}', 2018-12-20)`, (error, response) => {
                    if (error) console.log('DB_ERROR: Failed to insert new user: ', error);
                    if (response) console.log('Inserted new user to DB:', message.author.username);
                });
            } else {
                let curXP = response.rows[0].xp;
                let curCoins = response.rows[0].coins;

                return new Promise((resolve, reject) => {
                    pool.query(
                      'UPDATE userdata SET xp = $1, coins = $2 WHERE id=$3',
                      [curXP + xp, curCoins + coins, message.author.id],
                      (error, response) => {
                        if (error) return reject(error);
                        if (response) console.log(`Added ${xp} xp and ${coins} coins to ${message.author.username}.`);
              
                        resolve();
                      }
                    )
                  });
            }
        }
    });
    // End of XP and coins system

    //DEBUG
    bot.on('error', console.error);
    bot.on('error', async error => {
        let replyChannel = message.guild.channels.find("name", "bot-log");

        let embed = new Discord.RichEmbed()
        .setAuthor("DEBUGGING")
        .setDescription("Looking deep, and i found dis!?")
        .setColor("#9b59b6")
        .addField("Error: ", `${error}`);

        replyChannel.send(embed);
    });

    // check if a message is a command, if it is, split/slice it..
    let messageArray = message.content.split(" ");
    let command = messageArray[0];
    let args = messageArray.slice(1);

    if(!command.startsWith(settings.prefix)) return;
    
    let cmd = bot.commands.get(command.slice(settings.prefix.length));
    if(cmd) cmd.run(bot, message, args, pool);
});

bot.login(settings.token);