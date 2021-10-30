const discord = require("discord.js")
const db = require("croxydb")

exports.run = async(client, message, args) => {
      let rolid = args[0]
        if(message.guild == null) return
        if(!message.member.hasPermission("ADMINISTRATOR")) {
            const yetkinyok = new discord.MessageEmbed()
            .setAuthor("❌ Yetersiz Yetki!")
            .setDescription("**Bu Komudu Kullanabilmek İçin `Yönetici` Yetkisine Sahip Olmalısın!**")
            .setColor("RED")
            return message.channel.send(yetkinyok)
        }

        if(!rolid) {
            const belirt = new discord.MessageEmbed()
            .setAuthor("❌ Eksik Argüman!")
            .setDescription("**Rol ID'si Belirtilmemiş!**")
            .setColor("RED")
            return message.channel.send(belirt)
        }

        if(isNaN(rolid)) {
            const nan = new discord.MessageEmbed()
            .setAuthor("❌ Geçersiz Argüman!")
            .setDescription("**ID'ler Sadece Rakamlardan Oluşmalıdır!**")
            .setColor("RED")
            return message.channel.send(nan)
        }
        const role = message.guild.roles.cache.find(x => x.id == rolid)
        if(role == undefined) {
            const rolyok = new discord.MessageEmbed()
            .setAuthor("❌ Geçersiz Argüman!")
            .setDescription("**Bu ID'ye Sahip Bir Rol Bu Sunucuda Bulunamadı!**")
            .setColor("RED")
            return message.channel.send(rolyok)
        }
        db.set(`rolgörevlisi_${message.guild.id}`, rolid)
        const sucembed = new discord.MessageEmbed()
        .setAuthor("✅ Başarılı")
        .setDescription(`**Başarıyla Sunucunuz İçin Rol Görevlisi <@&${rolid}> Olarak Ayarlandı!**`)
        .setColor("GREEN")
        message.channel.send(sucembed)
}


exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: ["görevli-ayarla"],
  permLevel: 0
};
exports.help = {
  name: "görevli-ayarla",
  description: "görevli ayarlarsınız",
  usage: "görevli-ayarla <Rol ID>"
};
