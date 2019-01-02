const Discord = require('discord.js');
const client = new Discord.Client();

client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
});

client.on('message', msg => {
  if (msg.content === '$oi') {
    msg.reply('oi bbs');
  }
});

client.login('NTI5Nzk2ODk2MjM2MTA5ODUx.Dw2G5g.609Y8K15OLfjouSF9skaPp2M_pU');