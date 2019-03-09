module.exports = async (metaquery) => {
  // var args = metaquery.args
  var channel = metaquery.channel
  var message = metaquery.message
  var guild = metaquery.guild

  if (!message.member.permissions.has('ADMINISTRATOR')) {
    channel.send('Vous ne pouvez pas utiliser cette commande')
    return
  }

  await guild.channels.find(c => c.name === '👜 Classes 🎒').children.array().forEach(async classChannel => {
    await classChannel.send('Attention ! Les messages de cette classe seront bientôt supprimés !')
  })
  channel.send('Messages envoyés!')
}
