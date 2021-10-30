const Discord = require("discord.js");
const db = require("croxydb");
const config = require("../config.json");

exports.run = async (client, message, args) => {

    const bakım = new Discord.MessageEmbed()
    .setColor("#2f3136")
    .setAuthor("BAKIM", message.guild.iconURL({dynamic:true, size:1024, format:"png"}))
    .setDescription("_Sizlere daha iyi bir hizmet verebilmek için çalışıyoruz_.")
    .setImage("https://cdn.discordapp.com/attachments/901527018473140246/904041359839731792/BAKIM.png")
    message.channel.send(`|| @everyone & @here ||`, bakım)
}

exports.conf = {
    enabled: true,
    guildOnly: true,
    aliases: [],
    permLevel: 0
  };
  exports.help = {
    name: "bakım",
    description: "",
    usage: ""
  }