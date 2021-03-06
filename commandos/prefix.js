const Discord = require("discord.js");
const fs = require("fs");

module.exports.run = (bot, message, args) => {

  //if(!message.user.hasPermission(MANAGE_GUILD)) return message.reply("No");
  if(!message.member.hasPermission("MANAGE_GUILD")) return message.reply("No");
  if(!args[0] || args[0 == "help"]) return message.reply("Usage: f>prefix <desired prefix>");

  let prefixes = JSON.parse(fs.readFileSync("./prefixes.json", "utf8"));

  prefixes[message.guild.id] = {
    prefixes: args[0]
  };

  fs.writeFile("./prefixes.json", JSON.stringify(prefixes), (err) => {
    if (err) console.log(err)
  });

  let sEmbed = new Discord.RichEmbed()
  .setColor("#309e1f")
  .setTitle("Prefix Menu")
  .setDescription(`Prefix Set To ${args[0]}`);

  message.channel.send(sEmbed);
}

module.exports.help = {
  name: "prefix"
}
