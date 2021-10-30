const Discord = require('discord.js');
const client = new Discord.Client();
const settings = require("./config.json")
const moment = require("moment")
const db = require("croxydb")
const config = require("./config.json");
const message = require('./events/message');
const fs = require("fs");
require('./util/eventHandler.js')(client);
const DiscordButtons = require('discord-buttons'); 
DiscordButtons(client);


const log = message => {
  console.log(`${message}`);
};

client.commands = new Discord.Collection();
client.aliases = new Discord.Collection();
fs.readdir("./komutlar/", (err, files) => {
if (err) console.error(err);
log(`${files.length} komut yüklenecek.`);
files.forEach(f => {
  let props = require(`./komutlar/${f}`);
  log(`Yüklenen komut: ${props.help.name}.`);
  client.commands.set(props.help.name, props);
  props.conf.aliases.forEach(alias => {
    client.aliases.set(alias, props.help.name);
  });
});
});
client.reload = command => {
return new Promise((resolve, reject) => {
  try {
    delete require.cache[require.resolve(`./komutlar/${command}`)];
    let cmd = require(`./komutlar/${command}`);
    client.commands.delete(command);
    client.aliases.forEach((cmd, alias) => {
      if (cmd === command) client.aliases.delete(alias);
    });
    client.commands.set(command, cmd);
    cmd.conf.aliases.forEach(alias => {
      client.aliases.set(alias, cmd.help.name);
    });
    resolve();
  } catch (e) {
    reject(e);
  }
});
};
client.load = command => {
return new Promise((resolve, reject) => {
  try {
    let cmd = require(`./komutlar/${command}`);
    client.commands.set(command, cmd);
    cmd.conf.aliases.forEach(alias => {
      client.aliases.set(alias, cmd.help.name);
    });
    resolve();
  } catch (e) {
    reject(e);
  }
});
};
client.unload = command => {
return new Promise((resolve, reject) => {
  try {
    delete require.cache[require.resolve(`./komutlar/${command}`)];
    let cmd = require(`./komutlar/${command}`);
    client.commands.delete(command);
    client.aliases.forEach((cmd, alias) => {
      if (cmd === command) client.aliases.delete(alias);
    });
    resolve();
  } catch (e) {
    reject(e);
  }
});
};

client.elevation = message => {
if (!message.guild) {
  return;
}

//----------------Komut Algılayıcısı----------------\\

//---------------Perms Yerleştirmeleri--------------\\

let permlvl = 0;
if (message.member.hasPermission("BAN_MEMBERS")) permlvl = 2;
if (message.member.hasPermission("ADMINISTRATOR")) permlvl = 3;
if (message.author.id === settings.sahip) permlvl = 4;
return permlvl;
};
//////////////////////////////////////////////////////////////////////////////////////////////////

client.on("message", async message => {
  let reklamengel = await db.fetch(`reklam3_${message.author.id}`);
  let reklam3 = await db.fetch(`reklam_${message.guild.id}`)
  let Log = config.ekstra.reklamlog;
  let kullanici = message.member;
  if (!reklam3) return;
  if (reklam3 == "acik") {
    const reklam = [
      "discord.app",
      "discord.gg",
      ".com",
      ".net",
      ".xyz",
      ".tk",
      ".me",
      ".gg",
      "www.",
      "https",
      "http",
      ".org",
      ".com.tr",
      ".hub"
    ];
    if (reklam.some(word => message.content.toLowerCase().includes(word))) {
      if (!message.member.hasPermission("ADMINISTRATOR")) {
        message.delete();
        db.add(`reklamengel_${client.id}`, 1)
        db.add(`reklam3_${message.author.id}`, 1); 
        if (reklamengel === null) {
          let uyari = new Discord.MessageEmbed()
             .setColor("#d52525")
            .setDescription(`<a:kedicik:813764097631715329> **Orda Dur Bakalım! Link Paylaşamazsın, Bu Sunucu** \`${client.user.username}\` **Tarafından Korunuyor**`)
            .setFooter(`<@${message.author.id}> Uyarı Sayın (1/3)`)
          message.channel.send(uyari).then(msg => msg.delete({ timeout: 6000 }));
        }
        if (reklamengel === 1) {
          let uyari = new Discord.MessageEmbed()
            .setColor("#d52525")
            .setDescription(`<a:kedicik:813764097631715329> **Orda Dur Bakalım! Link Paylaşamazsın, Bu Sunucu** \`${client.user.username}\` **Tarafından Korunuyor**`)
            .setFooter(`<@${message.author.id}> Uyarı Sayın (2/3)`)
          message.channel.send(uyari).then(msg => msg.delete({ timeout: 6000 }));
        }


        if (reklamengel === 2) {
          message.delete();
          await kullanici.kick({
            reason: `3 Kez ard arda reklam yaptı!`
          });
          db.delete(`reklam3_${message.author.id}`);
          let uyari = new Discord.MessageEmbed()
           .setColor("#d52525")
           .setDescription(`**${kullanici} 3 kez ard arda reklam  yapığı için atıldı.**`)
           .setFooter(`${message.author.tag} Link Muaf Uyarı Sayısı (3/3) | Atıldı`)
          client.channels.cache.get(Log).send(uyari)
        }
      }
    }
  }
});
//////////////////////////////////////////////////////////////////////////////////////////////////


client.login(settings.token);