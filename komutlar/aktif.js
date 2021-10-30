const Discord = require("discord.js");
const db = require("croxydb");
const config = require("../config.json")

exports.run = async (client, message, args) => {

    const aktif = new Discord.MessageEmbed()
    .setColor("#2f3136")
    .setAuthor("AKTİF", message.guild.iconURL({dynamic:true, size:1024, format:"png"}))
    .setDescription(
      `
      _Sunucu aktif giriş sağlayabilirsiniz_

      **_ İp Adresi_ : ${config.ekstra.ip}**
    `)
    .setImage("https://cdn.discordapp.com/attachments/901527018473140246/904041358833115176/AKTIF.png")
    message.channel.send("|| @everyone & @here ||", aktif)
    message.delete()
}

exports.conf = {
    enabled: true,
    guildOnly: true,
    aliases: [],
    permLevel: 0
  };
  exports.help = {
    name: "aktif",
    description: "",
    usage: ""
  }