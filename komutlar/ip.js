const Discord = require("discord.js");
const db = require("croxydb");
const config = require("../config.json");

exports.run = async (client, message, args) => {

    const destek = new Discord.MessageEmbed()
    .setColor("#2f3136")
    .setAuthor("İP ADRESİ", message.guild.iconURL({dynamic:true, size:1024, format:"png"}))
    .setDescription(`**_İp Adresi : ${config.ekstra.ip}_**`)
    .setImage("https://cdn.discordapp.com/attachments/901527018473140246/904041362620567552/IP.png")
    message.channel.send(`<@${message.author.id}>`, destek)
}

exports.conf = {
    enabled: true,
    guildOnly: true,
    aliases: [],
    permLevel: 0
  };
  exports.help = {
    name: "ip",
    description: "",
    usage: ""
  }