const discord = require("discord.js")
const db = require("croxydb")

exports.run = async(client, message, args) => {
   let rolidleri =  message.content.split(" ").slice(1).join(" ")
        if(message.guild == null) return
        if(!message.member.hasPermission("ADMINISTRATOR")) {
            const yetkinyok = new discord.MessageEmbed()
            .setAuthor("❌ Yetersiz Yetki!")
            .setDescription("**Bu Komudu Kullanabilmek İçin `Yönetici` Yetkisine Sahip Olmalısın!**")
            .setColor("RED")
            return message.channel.send(yetkinyok)
        }

        if(!rolidleri) {
            const belirt = new discord.MessageEmbed()
            .setAuthor("❌ Eksik Argüman!")
            .setDescription("**Rol ID'leri Belirtilmemiş!**")
            .setColor("RED")
            return message.channel.send(belirt)
        }

        var arrayroller = rolidleri.split(" ")
        if(arrayroller.length > 14) {
            const sınır = new discord.MessageEmbed()
            .setAuthor("❌ Geçersiz Argüman!")
            .setDescription("**Sadece 14 Ve 14'ten Az Sayıda Rol ID'si Belirtebilirsiniz!**")
            .setColor("RED")
            return message.channel.send(sınır)
        }
        const ilkelement = "İşlemi iptal et."
        arrayroller = [ilkelement].concat(arrayroller)
        let removedup = [...new Set(arrayroller)];
        db.set(`butonrol_${message.guild.id}`, removedup)
        const sucembed = new discord.MessageEmbed()
        .setAuthor("✅ Başarılı")
        .setDescription("**Başarıyla Sunucunuz İçin Buton Rol Ayarlandı!**")
        .setColor("GREEN")
        message.channel.send(sucembed)
}


exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: ["rol-ayarla"],
  permLevel: 0
};
exports.help = {
  name: "rol-ayarla",
  description: "rol ayarlarsınız",
  usage: "rol-ayarla <Rol ID>..."
};
