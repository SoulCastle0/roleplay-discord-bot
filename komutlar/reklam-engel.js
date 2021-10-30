
const db = require('croxydb')
const Discord = require('discord.js')
 let ayarlar = ['aç','kapat']
exports.run = async (bot, message, args) => {
  if (!args[0]) return message.channel.send('Hey Bu Ayarı Kullanabilmek için `aç` yada `kapat` yazmalısın.')
  if(!ayarlar.includes(args[0])) return message.channel.send(`Geçerli parametreleri kullanmalısın.\nParametreler: ${ayarlar.join(' - ')}`)
  if (!message.member.hasPermission('MANAGE_GUILD')) return message.channel.send('`SUNUCUYU_YÖNET` yetkisine sahip olmalısın!')
 
  if (args[0] == 'aç') {
    if(db.has(`reklam_${message.guild.id}`)) return message.channel.send(`Sistem zaten açık.`)
    db.set(`reklam_${message.guild.id}`, 'acik')
      message.channel.send('Reklam Engel başarıyla açıldı! `Üyeleri Yasakla` yetkisine sahip olanların reklamı engellenmicektir.')
  }
  if (args[0] == 'kapat') {
        if(!db.has(`reklam_${message.guild.id}`)) return message.channel.send(`Sistem zaten kapalı.`)
    db.delete(`reklam_${message.guild.id}`)
      message.channel.send('Reklam Engel başarıyla kapatıldı! Artık herkes reklam yapabilir.')
  }
 
};
 
exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ['advertisement','reklam'],
  permLevel: 0
};
 
exports.help = {
  name: 'reklam-engelle',
  description: '[Admin Komutu]',
  usage: 'reklam-engelle'
};
