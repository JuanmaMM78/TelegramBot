const {Wit, log} = require('node-wit');
const fs = require('fs');
const googleTTS = require('google-tts-api');

module.exports = async (ctx) => {
    const client = new Wit({
        accessToken: process.env.WIT_TOKEN,
        logger: new log.Logger(log.DEBUG)
    });

    const response = await client.message(ctx.message.text);

    if(response.intents.length === 0) {
        ctx.reply('No te entiendo');
    } else {
        const intent = response.intents[0].name;     
        const content =  fs.readFileSync(`./phrases/${intent}.txt`, 'utf8' );
        const frases = content.split('\n');
        const randomNum = Math.floor(Math.random() * frases.length);  
        
        
        const url =googleTTS.getAudioUrl(frases[randomNum], {
            lang: 'es',
            slow: false
        });

        // ctx.reply(frases[randomNum]);
        ctx.replyWithAudio(url);
    }

}
    
