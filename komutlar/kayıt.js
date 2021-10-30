const Discord = require("discord.js");
const { MessageButton } = require('discord-buttons');
const config = require("../config.json")
const moment = require("moment");
require("moment-duration-format");
exports.run = async(client, message, args,) => {
moment.locale('tr');

    const rol = config.roles.whitelist ; 
    const kayıtsızrol = config.roles.nonwhitelist; 
    const staff = config.roles.staff; 
    const logchannel = config.ekstra.logchannels;
    const tag1 = config.ekstra.tag; 
    const onay = config.emoji.onay;
    const red = config.emoji.red;
    if(!message.member.roles.cache.get(staff) && (!message.member.hasPermission("ADMINISTRATOR"))) return;
    let member = message.mentions.members.first()
    if(!member) return message.channel.send("Bir kullanıcı girin.")
    const hex = args[1];
    if(!hex) return message.channel.send("Hex ID Girmelisin!")

    const Evet = new MessageButton()
    .setStyle('green')
    .setLabel(onay)
    .setID('Evet')

    const iptal = new MessageButton()
    .setStyle('red')
    .setLabel(red)
    .setID('iptal')
    
    function timestamp (value) {

        return Math.floor(new Date(value).getTime() / 1000)
      };
 var now = new Date()

    message.channel.send("**Onaylıyor musunuz?**", {buttons: [Evet, iptal]}).then(async function(sent) {
        sent.createButtonCollector(user => user.clicker.user.id == message.author.id).on('collect', async (button) => {
            if(button.id == "Evet") {
                member.setNickname(`${tag1} | ${member.user.username}`)
                member.roles.add(rol).catch()
                member.roles.remove(kayıtsızrol).catch()  
                const embed = new Discord.MessageEmbed()
                .setColor("#2f3136")
                .setDescription(`Üye başarıyla kayıt edildi`)
                message.channel.send(embed).then(message => message.delete({timeout:3000}))
                await message.react(onay)
                button.reply.defer()
                sent.delete({timeout:3000})

                client.channels.cache.get(logchannel).send(
                    new Discord.MessageEmbed()
                    .setColor("BLUE")
                    .setFooter(`${client.user.username}`, client.user.avatarURL({dynamic:true}))
                    .setAuthor(`Kayıt Log / ${member.user.tag}`, message.guild.iconURL({dynamic:true, size:1024, format:"png"}))
                    .addField(`İsim`,`\`${member.user.username}\``,true)
                    .addField(`Discord ID`,`\`${member.user.id}\``,true)
                    .addField(`Yetkili`,`\`${message.author.tag}\``,true)
                    .addField(`Hex`,`\`${hex}\``,true)
                    .addField(`Kayıt Tarihi`, `<t:${timestamp(now)}:F> (<t:${timestamp(now)}:R>)`, true))

            } else if(button.id == "iptal") {
                button.reply.defer()
                sent.delete()

                message.channel.send(
                    new Discord.MessageEmbed()
                    .setColor("#2f3136")
                    .setDescription(`Kayıt işlemi iptal edildi.`))
                    await message.react(red)

            }
        })
    })

}
      
    exports.conf = {
      enabled: true,
      guildOnly: true,
      aliases: ["wl"],
      permLevel: 0
    };
    exports.help = {
      name: "whitelist",
      description: "",
      usage: "kayıt <etiket> <isim> <yaş>"
    }
