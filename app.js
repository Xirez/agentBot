const settings = require("./settings.json");
const Discord = require("discord.js");
const fs = require("fs");
const con = require('mysql-ssh');

const bot = new Discord.Client({disableEveryone: true});
//CMD handler
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

// Start of DB connection
const db = con.connect(
    {
        host: '',
        user: '',
        privateKey: fs.readFileSync('sshkeypath.ppk')
    },
    {
    host: "",
    user: "",
    password: "",
    database: ""
    }
);
db.then(client => {
    client.query("SHOW TABLES", function (err, results, fields) {
        if (err) throw err
        console.log("Connection to database established!");
    })
})
.catch(err => {
    console.log(err)
})
// End of DB connect

bot.on("ready", async () => {
    console.log(`${bot.user.username} is ready!`);
    bot.user.setActivity("Travian!");
});

//prevent DB con.timeout.
setInterval(function(){
    db.then(client => {
        client.query("SHOW TABLES", function (err, results, fields) {
            if (err) throw err
        })
    })
}, 900000);

bot.on("message", async message => {
    if(message.author.bot) return;
    if(message.channel.type === "dm") return;

    // Start and updates xp and coins system
    let xp = Math.floor(message.content.length / 2); // add filder for links

    if(message.content.length <= 9) {
        coins = 0;
    } else {
        coins = Math.floor((Math.random() * 3)+ 1);
    }
    db.then(client => {
        client.query(`SELECT * FROM userdata WHERE id = '${message.author.id}'`, function (err, results) {
            if (err) throw err
            if(results.length < 1){
                sql = `INSERT INTO userdata (id, username, xp, coins, daily) VALUES ( '${message.author.id}','${message.author.username}', '${xp}', '${coins}', 0000-00-00)`;
            } else {
                let curXP = results[0].xp;
                let curCoins = results[0].coins;
                sql = `UPDATE userdata SET xp = ${curXP + xp}, coins = ${curCoins + coins} WHERE id=${message.author.id}`;
            }
            db.then(insertXP => {
                insertXP.query(sql, function(err, result) {
                    console.log(`Added ${xp} xp and ${coins} coins to ${message.author.username}.`);
                });
            })
        })
    });
    // End of XP and coins system

    // check if a message is a command, if it is, split/slice it like this..
    let messageArray = message.content.split(" ");
    let command = messageArray[0];
    let args = messageArray.slice(1);

    if(!command.startsWith(settings.prefix)) return;
    
    let cmd = bot.commands.get(command.slice(settings.prefix.length));
    if(cmd) cmd.run(bot, message, args, db);
});

bot.login(settings.token);