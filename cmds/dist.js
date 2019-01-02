const Discord = require("discord.js");

module.exports.run = async (bot, message, args) => {
  let replyChannel = message.guild.channels.find("name", "unmatched_general");

  if (args.length >= 2) {
    let village1 = new Village(args[0]);
    let village2 = new Village(args[1]);
    let distance = getDistance(village1, village2);

    if(args[2]) {
      let time = distance / args[2];
      let travelTime = getTravelTime(time);

      let embeddedRichText = new Discord.RichEmbed()
      .setColor("#00FF00")
      .addField(message.author.username, ` Distance is ${Math.round( distance * 10 ) / 10}.`)
      .addField('Traveltime:', `${travelTime}`);

      replyChannel.send(embeddedRichText);
    } else {
      let embeddedRichText = new Discord.RichEmbed()
      .setColor("#00FF00")
      .addField(message.author.username, ` Distance is ${Math.round( distance * 10 ) / 10}.`);

      replyChannel.send(embeddedRichText);
    }
    
  } else {
    let embeddedRichText = new Discord.RichEmbed()
      .setColor("#00FF00")
      .addField(message.author.username, `Invalid parameters.`);
    
      replyChannel.send(embeddedRichText);
  }
}

function getTravelTime(time)
{
  var toSec = time * 3600;
  var hrs = Math.floor(toSec / 3600);
  var mins = Math.floor((toSec - (hrs * 3600)) / 60);
  var secs = Math.floor(toSec - (hrs * 3600 + mins * 60));

  // Output "4:03:59"
  var res = `${hrs}h:${mins}m:${secs}s`;

  return res;
}

function getDistance(village1,village2)
{
  return Math.sqrt(Math.pow(village1.CordinateX - village2.CordinateX, 2) + Math.pow(village1.CordinateY - village2.CordinateY, 2), 1);
}

class Village
{
  constructor(cordinates)
  {
    this.cordinatesRaw = cordinates;
    this.cordinateArray = cordinates.split("|");
    if (this.cordinateArray.length == 2) {
      this.CordinateX = this.cordinateArray[0];
      this.CordinateY = this.cordinateArray[1];
    } else {
      this.CordinateX = 0;
      this.CordinateY = 0;
    }
  }
}

module.exports.help = {
  name: "dist"
}