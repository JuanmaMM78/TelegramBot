const axios = require('axios');

module.exports =  async (ctx) => {
    const text = ctx.message;
  
    console.log(text);
    ctx.reply('Te escucho cucurucho');
    const ciudad = (text.text.slice(7, text.text.lengh)).trim();
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${ciudad}&appid=${process.env.OWM_API_KEY}&units=metric`;
    console.log(ciudad);
    try {    
        const {data} = await axios.get(url);

        const answer =`El tiempo en ${ciudad}:
        🌡Actual: ${data.main.temp}ºC
        🔥Maxima: ${data.main.temp}ºC
        ❄Minima: ${data.main.temp}ºC
        💧Humedad: ${data.main.humidity}%`

         ctx.reply(answer);
    } catch (err) {

        ctx.reply('Ciudad no encontrada ❌');
    }
    
    
};
