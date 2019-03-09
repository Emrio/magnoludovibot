module.exports = async (metaquery) => {
  // var args = metaquery.args
  var channel = metaquery.channel
  var message = metaquery.message
  var guild = metaquery.guild

  if (!message.member.permissions.has('ADMINISTRATOR')) {
    channel.send('Vous ne pouvez pas utiliser cette commande')
    return
  }

  var yearNow = new Date().getFullYear()

  var cloneNdel = async (oldChannel) => {
    var newChannelName = oldChannel.name
    await oldChannel.clone(newChannelName)
      .then(newChannel => {
        newChannel.setParent(guild.channels.find(c => c.name === '👜 Classes 🎒'))
          .then(() => {
            newChannel.setTopic('Salon réservé aux élèves de ' + newChannelName + ' (' + yearNow + '-' + (yearNow + 1) + ')')
              .then(() => {
                oldChannel.delete()
                  .then(() => {
                    console.log('[Nettoyage Classes] (🚶‍♂️) Channel ' + newChannelName + ' nettoyé!')
                  })
                  .catch(err => {
                    console.error(err)
                    channel.send('[Nettoyage Classes] (4) Une erreur est survenue: ' + err + "\nMerci d'en parler à l'Administation")
                  })
              })
              .catch(err => {
                console.error(err)
                channel.send('[Nettoyage Classes] (3) Une erreur est survenue: ' + err + "\nMerci d'en parler à l'Administation")
              })
          })
          .catch(err => {
            console.error(err)
            channel.send('[Nettoyage Classes] (2) Une erreur est survenue: ' + err + "\nMerci d'en parler à l'Administation")
          })
      })
      .catch(err => {
        console.error(err)
        channel.send('[Nettoyage Classes] (1) Une erreur est survenue: ' + err + "\nMerci d'en parler à l'Administation")
      })
  }

  await guild.channels.find(c => c.name === '👜 Classes 🎒').children.clone().array().forEach(async oldChannel => {
    await cloneNdel(oldChannel)
  })
  channel.send('Requête en cours!')
}
