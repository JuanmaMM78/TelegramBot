module.exports = async (ctx) => {
    console.log(ctx.message);
    await ctx.replyWithDice();
    await ctx.reply('Encantado de conocerte');
}