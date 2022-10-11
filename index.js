const express = require('express');
const {Telegraf} = require('telegraf');
const { create } = require('./models/user.model');


/// carga el fichero de entorno
require('dotenv').config();

// carga de la DB
require('./config/db');

const app = express();
const bot = new Telegraf(process.env.BOT_TOKEN);

/// Configuracion del BOT
app.use(bot.webhookCallback('/url_telegram'));
bot.telegram.setWebhook(`${process.env.BOT_URL}/url_telegram`)

app.post('/url_telegram', (req, res) => {
    res.send('Termina');
});

// MIDDLEWARE
bot.use(async (ctx, next) => {
    try{
    await create(ctx.from)
    } catch (err) {
        console.log(err)
        console.log('No se inserta el usuario')
    } finally {
        next();
    }
})

/// Comandos -- requerimos la funcion desde cada fichero test- tiempo - donde
bot.command('test',require('./commands/test'));
bot.command('tiempo',require('./commands/tiempo'));
bot.command('donde',require('./commands/donde'));

bot.on('text', require('./nlu.js'));

const PORT =process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Servidor escuchando en puerto ${PORT}`)
});