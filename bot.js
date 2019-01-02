const Discord = require('discord.js');
const ytdl = require('ytdl-core');
const client = new Discord.Client();

var isPlaying = false;

async function greetingMessage(msg){
  if (msg.author.tag === "alca#3184") {
    msg.channel.send((`oi papai ${msg.author}!!!`).toString());
  } else {
    msg.channel.send((`oi ${msg.author}!`).toString());
  }
}


async function urssManager(msg){
  console.log("Executing URSS.");
  var voiceChannel = msg.member.voiceChannel;

  if (!msg.guild) return;

  if (voiceChannel) {
    const connection = await voiceChannel.join();
    
    if(!isPlaying){
      isPlaying = true;
      const dispatcher = connection.playStream(ytdl(
        'https://www.youtube.com/watch?v=qigIYJWsyWE',
        { filter: 'audioonly' }));
        msg.channel.send("O CRIME DE LULA FOI AMAR DEMAIS!");
      dispatcher.on("end", function(){
        console.log("Finising URSS.");
        voiceChannel.leave();
        isPlaying = false;
      });
    } else {
      console.log("Audio is still playing.");
    }
    
  } else {
    msg.reply('You need to join a voice channel first!');
  }
}


function help(msg){
  var helpMessage = `Os comandos disponíveis até o momento são:
  **$help**: mostro quais minhas funções
  **$oi**: dou um oizinho pra vc :*
  **$urss**: toco o hino da união soviética pra dar aquela inspirada
  **$flw**: saio do canal de voz de quem me mandou embora`;
  msg.channel.send(helpMessage);
}


function leaveVoiceChanel(msg){
  var voiceChannel = msg.member.voiceChannel;
  voiceChannel.leave();
}


client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
});


client.on('message', async msg => {
  var prefix = "$";
  var message = msg.content;
  var msg_prefix = message.substring(0,1);

  if (!(msg_prefix === prefix) || msg.author.bot) return;
  else{
    command = message.substr(1);
    if (command === 'help'){
      help(msg);
    } else if (command === 'oi') {
      greetingMessage(msg);
    } else if (command === 'urss') {
      urssManager(msg);
    } else if (command === 'leave'){
      leaveVoiceChanel(msg);
    }
  }
});


client.login('NTI5Nzk2ODk2MjM2MTA5ODUx.Dw2G5g.609Y8K15OLfjouSF9skaPp2M_pU');