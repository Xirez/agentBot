const Discord = require("discord.js");

module.exports.run = async (bot, message, args) => {
    if(!message.member.hasPermission("MANAGE_MESSAGES")) return message.reply("You dont have permissions to do this.");
    if(!args[0]) return message.channel.send("Doh.. How many messages should i delete for your lazy ass?");
    if(args[0] > 100) return message.channel.send("Would love to do that, but discord API only allows me to delet a bulk of 100 messages at once. Please specify a number you can handle.");
    message.channel.bulkDelete(args[0]).then(() => {
        message.channel.send(`Cleared ${args[0]} messages. Please dont spam this command, Discord's API works at the pace of a sloth. When this msg is gone, feel free to purge again.`)
        .then(msg => msg.delete(12000));
        console.log(`${message.author.username} has deleted ${args[0]} messages from channel "${message.channel.name}".`);
    })
    .catch(err => console.log(`${message.author.username} - ${err.message}`)).then(message.channel.send(`Can only bulk delete messages that are under 14 days old.`));
}

module.exports.help = {
    name: "purge"
}