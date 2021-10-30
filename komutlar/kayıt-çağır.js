const Discord = require("discord.js");
const db = require("croxydb");
const config = require("../config.json");

exports.run = async (client, message, args) => {

message.channel.send(`@etiket @etiket Birazdan sizinle ilgilenecek lütfen KAYIT BEKLEME odasına geçip yetkili bekleyiniz.`)
}

exports.conf = {
    enabled: true,
    guildOnly: true,
    aliases: [],
    permLevel: 0
  };
  exports.help = {
    name: "kayıt",
    description: "",
    usage: ""
  }