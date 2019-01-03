const ytdl = require('ytdl-core');
const request = require('superagent');
const config = require("./config.json");
var isPlaying = false;

module.exports = {
  youtubeSearcher: function(msg, searchKeywords){
    console.log("Executing YoutubeSearcher.");
  
    var requestUrl = 'https://www.googleapis.com/youtube/v3/search' + `?part=snippet&q=${escape(searchKeywords)}&key=${config.API_KEY}`;
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
  
        module.exports.youtubePlayer(msg, videoURL);
      });
  },
  
  youtubePlayer: async function (msg, videoURL){
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
}