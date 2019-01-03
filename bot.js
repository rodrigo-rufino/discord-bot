const Discord = require('discord.js');
const ytdl = require('ytdl-core');
const client = new Discord.Client();
var request = require('superagent');

const API_KEY = "AIzaSyDWbfHQ91B6SMf_W_JwAgPblx24TcKqunk";
var isPlaying = false;

async function greetingMessage(msg){
  if (msg.author.tag === "alca#3184") {
    msg.channel.send((`oi papai ${msg.author}!!!`).toString());
  } else {
    msg.channel.send((`oi ${msg.author}!`).toString());
  }
}


function youtubeSearcher(msg, searchKeywords){
  console.log("Executing YoutubeSearcher.");

  var requestUrl = 'https://www.googleapis.com/youtube/v3/search' + `?part=snippet&q=${escape(searchKeywords)}&key=${API_KEY}`;
  var videoURL = "";
  
  request.get(requestUrl)
        .end((error, response) => {
          if (error) {return console.log(error);}
          var body = response.body;

          if (body.items.length == 0) {
            console.log("Não achei nenhum vídeo desse tpo aí");
            return videoId;
          }

          console.log(body.items[0].id.videoId);
          var videoURL = "https://www.youtube.com/watch?v=" + body.items[0].id.videoId;

          youtubePlayer(msg, videoURL);
        });

  // request(requestUrl, (error, response) => {
  //   if (!error && response.statusCode == 200) {
  //     var body = response.body;
  //     if (body.items.length == 0) {
  //       console.log("Não achei nenhum vídeo desse tpo aí");
  //       return videoId;
  //     }

  //     for (var item of body.items) {
  //       if (item.id.kind === 'youtube#video') {
  //         videoURL = "https://www.youtube.com/watch?v=" + item.id.videoId;
  //         console.log(videoURL);
  //         youtubePlayer(msg=msg, videoURL=videoURL);
  //         return null;
  //       }
  //     }
  //   } else {
  //     console.log("Erro ao procurar no youtube.");
  //     return null;
  //   }
  // });
}

async function youtubePlayer(msg, videoURL){
  console.log("Executing youtubePlayer.");
  console.log("Video URL: " + videoURL);
  var voiceChannel = msg.member.voiceChannel;

  if (!msg.guild) return;

  if (voiceChannel) {
    const connection = await voiceChannel.join();
    
    if(!isPlaying){
      isPlaying = true;
      const dispatcher = connection.playStream(ytdl(
        `${videoURL}`,
        { filter: 'audioonly' }));
      dispatcher.on("end", function(){
        console.log("Finising URSS.");
        voiceChannel.leave();
        isPlaying = false;
      });
    } else {
      msg.reply('Já tem música tocando. Se quiser tocar outra, me manda embora e me chama de novo. ');
    }
    
  } else {
    msg.reply('You need to join a voice channel first!');
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
  
  if (!(msg_prefix === prefix) || msg.author.bot) return;
  else{
    var prefix = "$";
    var message = msg.content;
    var msg_prefix = message.substring(0,1);
    var command = message.split(/ (.+)/)[0].substr(1);
    var argument = message.split(/ (.+)/)[1];

    console.log("Command: " + command);
    console.log("Argument: " + argument);
    
    if (command === 'help'){
      help(msg);
    } else if (command === 'oi') {
      greetingMessage(msg);
    } else if (command === 'urss') {
      youtubeSearcher(msg, "hino uniao sovietica");
    } else if (command === 'leave'){
      leaveVoiceChanel(msg);
    } else if (command === 'tocar'){
      youtubeSearcher(msg, argument);
    }
  }
});

function helloWorld(){
  console.log("helloword");
}

client.login('NTI5Nzk2ODk2MjM2MTA5ODUx.Dw2G5g.609Y8K15OLfjouSF9skaPp2M_pU');