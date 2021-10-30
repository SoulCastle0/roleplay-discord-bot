const Discord = require("discord.js");
const db = require("croxydb");
const config = require("../config.json");

exports.run = async (client, message, args) => {

    const destek = new Discord.MessageEmbed()
    .setColor("#2f3136")
    .setAuthor("DESTEK", message.guild.iconURL({dynamic:true, size:1024, format:"png"}))
    .setDescription(`_Birazdan sizinle ilgilenecek lütfen <#${config.ekstra.destekbekleme}> odasına geçip bekleyiniz_.`)
    .setImage("https://cdn.discordapp.com/attachments/901527018473140246/904041361710399548/DESTEK.png")
    message.channel.send(`<@${message.author.id}>, \n <@&${config.roles.staff}>`, destek)
}

exports.conf = {
    enabled: true,
    guildOnly: true,
    aliases: [],
    permLevel: 0
  };
  exports.help = {
    name: "destek",
    description: "",
    usage: ""
  }