const Discord = require('discord.js')
const emrioutils = require('emrioutils')
const fs = require('fs')
const switchToUpperClass = require('./../switchToUpperClass')
const switchToLowerClass = require('./../switchToLowerClass')

module.exports = (metaquery) => {

  var args = metaquery.args
  var channel = metaquery.channel
  var message = metaquery.message
  var guild = metaquery.guild

  if( !metaquery.member.permissions.has("ADMINISTRATOR") ) {
    channel.send("Vous ne pouvez pas utiliser cette commande")
    return
  }

  if(args[1] === "role") {

    if(args[2] !== undefined) {

      var totogglerole = message.mentions.members.first() || guild.members.get(args[1])

      if(totogglerole !== undefined) {

        if(args[3] !== undefined) {

          var role = guild.roles.find("name", args[3])

          if(role !== undefined) {

            totogglerole.addRole(role)

            message.delete()

          } else channel.send("Role non reconnu")

        } else channel.send("Merci de spécifier un rôle")

      } else channel.send("Utilisateur non reconnu")

    } else channel.send("Merci de spécifier un utilisateur")

  } else if(args[1] === "upperClass") {

    switchToUpperClass(guild.members,
      [
        guild.roles.find("name", "Pré-Seconde"),
        guild.roles.find("name", "Secondes"),
        guild.roles.find("name", "Premières"),
        guild.roles.find("name", "Terminales"),
        guild.roles.find("name", "Anciens élèves")
      ]
    )

  } else if(args[1] === "lowerClass") {

    switchToLowerClass(guild.members,
      [
        guild.roles.find("name", "Pré-Seconde"),
        guild.roles.find("name", "Secondes"),
        guild.roles.find("name", "Premières"),
        guild.roles.find("name", "Terminales"),
        guild.roles.find("name", "Anciens élèves")
      ]
    )

    message.delete()
    channel.send("Commande en cours de traitement...")

  } else {
    channel.send("Votre commande est incorrecte")
  }

}
