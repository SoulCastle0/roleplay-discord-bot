const discord = require("discord.js")
const db = require("croxydb")
const {
    MessageButton,
    MessageActionRow
} = require('discord-buttons');

exports.run = async(client, message, args) => {
 let mention = message.mentions.members.first()
        var sıra = 0
        const dbçek = db.fetch(`butonrol_${message.guild.id}`)
        var butonlar = []
        var rowlar = []
        var sucstring = `<@${mention.id}> üyesine <@${message.author.id}> tarafından **verilebilecek** roller; \n\n`
        const görevli = db.fetch(`rolgörevlisi_${message.guild.id}`)
        var valueler = [{
                id: 0,
                val: null
            },
            {
                id: 1,
                val: null
            },
            {
                id: 2,
                val: null
            },
            {
                id: 3,
                val: null
            },
            {
                id: 4,
                val: null
            },
            {
                id: 5,
                val: null
            },
            {
                id: 6,
                val: null
            },
            {
                id: 7,
                val: null
            },
            {
                id: 8,
                val: null
            },
            {
                id: 9,
                val: null
            },
            {
                id: 10,
                val: null
            },
            {
                id: 11,
                val: null
            },
            {
                id: 12,
                val: null
            },
            {
                id: 13,
                val: null
            },
            {
                id: 14,
                val: null
            }
        ];

        if (message.guild == null) return


        if (görevli == null) {
            const görevliyok = new discord.MessageEmbed()
                .setAuthor("❌ Rol Görevlisi Belirtilmedi!")
                .setDescription("**Bir Rol Görevlisi ID'si Tanımlanmalıdır!**")
                .setColor("RED")
            return message.channel.send(görevliyok)
        }


        if (!message.member.roles.cache.has(görevli)) {
            const yetkinyok = new discord.MessageEmbed()
                .setAuthor("❌ Yetersiz Yetki!")
                .setDescription(`**Bu Komudu Kullanabilmek İçin <@&${görevli}> Rolüne Sahip Olmalısın!**`)
                .setColor("RED")
            return message.channel.send(yetkinyok)
        }


        if (!mention) {
            const belirt = new discord.MessageEmbed()
                .setAuthor("❌ Eksik Argüman!")
                .setDescription("**Etiket Eksik!**")
                .setColor("RED")
            return message.channel.send(belirt)
        }


        if (!dbçek) {
            const veriyok = new discord.MessageEmbed()
                .setAuthor("❌ Roller Belirtilmemiş!")
                .setDescription("**Menüde Çıkması Gereken Rolleri Buton Rol Ayarla Komudu İle Seçmelisiniz!**")
                .setColor("RED")
            return message.channel.send(veriyok)
        }


        dbçek.forEach(function (element, i) {
            var indexal = valueler.findIndex((obj => obj.id == i))
            valueler[indexal].val = element
            var butonpush = new MessageButton()
                .setLabel(i)
                .setID(i)
                .setStyle("green")
            butonlar.push(butonpush)
            if (i == 0) {
                sucstring += i + "." + ` ` + element + "\n"
            } else {
                sucstring += i + "." + ` <@&` + element + ">\n"
            }
        });

        const breh = Math.floor(15 / dbçek.length)
        if (breh == 3) {
            sıra = 1
        } else if (breh == 2) {
            sıra = 2
        } else if (breh == 1) {
            sıra = 3
        }




        var count = 0
        for (let i = 0; i < sıra * 5; i++) {
            if (i < 5) {
                if (count == 0) {
                    const row = new MessageActionRow()
                        .addComponents(butonlar.slice(0, 5))
                    rowlar.push(row)
                }
            } else if (i >= 5 && i <= 10) {
                if (i == 10) {

                } else {
                    if (count == 5) {
                        const row = new MessageActionRow()
                            .addComponents(butonlar.slice(5, 10))
                        rowlar.push(row)
                    }
                }
            } else if (i >= 10 && i <= 15) {
                if (count == 11) {
                    const row = new MessageActionRow()
                        .addComponents(butonlar.slice(10, 15))
                    rowlar.push(row)
                    if (rowlar[2].components.length == 0) {
                        rowlar.pop()
                    }
                }
            }
            count++
        }


        const embed = new discord.MessageEmbed()
            .setAuthor(message.member.displayName, message.author.avatarURL({
                format: "png"
            }))
            .setDescription(sucstring)
        message.channel.send(embed, {
            components: rowlar
        }).then(async function (mesaj) {
            mesaj.createButtonCollector(user => user.clicker.user.id == message.author.id).on('collect', async (button) => {
                const bul = valueler.find(x => x.id == button.id)
                const valal = bul.val
                if (button.id == bul.id) {
                    if (valal == "İşlemi iptal et.") {
                        mesaj.delete()
                    } else {
                        try {
                            await mention.roles.remove(valal)
                        } catch (e) {
                            button.reply.defer()
                            if (e.message == "Missing Permissions") {
                                const hata = new discord.MessageEmbed()
                                    .setAuthor("❌ Yetersiz Yetki!")
                                    .setDescription("**Bu Rolü Kullanıcıya Vermek İçin Yeterli Yetkim Yok!**")
                                    .setColor("RED")
                                return message.channel.send(hata)
                            } else {
                                const hata2 = new discord.MessageEmbed()
                                    .setAuthor("❌ Hata!")
                                    .setDescription("**Bir Hata İle Karşılaşıldı " + "`" + "Hata: " + e.message + "`**")
                                return message.channel.send(hata2)
                            }
                        }
                        const sucembed = new discord.MessageEmbed()
                            .setAuthor("✅ Rol Alındı!")
                            .setDescription(`**<@${mention.id}> Adlı Kişiye <@${message.author.id}> Tarafından <@&${valal}> Rolü Alındı**`)
                            .setColor("GREEN")
                        message.channel.send(sucembed)
                        button.reply.defer()

                    }
                }



            })
        })

}


exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: ["rol"],
  permLevel: 0
};
exports.help = {
  name: "rol-al",
  description: "rol işte",
  usage: "rol <Etiket>"
};