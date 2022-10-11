const NodeGeocoder = require('node-geocoder');

module.exports =  async (ctx) => {
    ctx.reply('Te escucho cucurucho');
    const text = ctx.message;
    const direccion = text.text.split('/donde ')[1];
    console.log(direccion)


    const options = {
    provider: 'google',
    apiKey: `${process.env.POS_API_KEY}`, 
    
    };

    const geocoder = NodeGeocoder(options);


    const res = await geocoder.geocode(direccion);
    const LAT = res[0].latitude;
    const LNG = res[0].longitude;
    ctx.replyWithLocation(LAT,LNG);
    


}