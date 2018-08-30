const Discord = require('discord.js')
const emrioutils = require('emrioutils')
const fs = require('fs')


module.exports = async (metaquery) => {

  if( !message.member.permissions.has("ADMINISTRATOR") ) {
    channel.send("Vous ne pouvez pas utiliser cette commande")
    return
  }

  var args = metaquery.args
  var channel = metaquery.channel
  var message = metaquery.message
  var guild = metaquery.guild

  var year_now = new Date().getFullYear()


  var cloneNdel = async (old_channel) => {

    var new_channel_name = old_channel.name
    await old_channel.clone(new_channel_name)
      .then(new_channel => {
        new_channel.setParent(guild.channels.find(c => c.name === "👜 Classes 🎒"))
          .then(() => {
            new_channel.setTopic("Salon réservé aux élèves de " + new_channel_name + " (" + year_now + "-" + (year_now+1) + ")")
              .then(() => {
                old_channel.delete()
                  .then(() => {
                    console.log("[Nettoyage Classes] (🚶‍♂️) Channel " + new_channel_name + " nettoyé!")
                  })
                  .catch(err => {
                    console.error(err)
                    channel.send("[Nettoyage Classes] (4) Une erreur est survenue: " + err + "\nMerci d'en parler à l'Administation")
                  })
              })
              .catch(err => {
                console.error(err)
                channel.send("[Nettoyage Classes] (3) Une erreur est survenue: " + err + "\nMerci d'en parler à l'Administation")
              })
          })
          .catch(err => {
            console.error(err)
            channel.send("[Nettoyage Classes] (2) Une erreur est survenue: " + err + "\nMerci d'en parler à l'Administation")
          })
      })
      .catch(err => {
        console.error(err)
        channel.send("[Nettoyage Classes] (1) Une erreur est survenue: " + err + "\nMerci d'en parler à l'Administation")
      })

  }

  await guild.channels.find(c => c.name === "👜 Classes 🎒").children.clone().array().forEach(async old_channel => {
    await cloneNdel(old_channel)
  })
  channel.send("Requête en cours!")


}
