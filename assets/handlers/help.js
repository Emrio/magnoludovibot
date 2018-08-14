const Discord = require('discord.js')
const emrioutils = require('emrioutils')
const fs = require('fs')


module.exports = (metaquery) => {

  var args = metaquery.args
  var channel = metaquery.channel
  var message = metaquery.message
  var guild = metaquery.guild

  var get_channel = (name) => {
    return guild.channels.find(c => c.name == name)
  }

  // Generates the embed
  embed = new Discord.RichEmbed()
            .setTitle("Fiche d'aide sur l'utilisation des commandes - Lycée Louis Le Grand")
            .setAuthor("Louis XIV% le Helper", "https://cdn.discordapp.com/avatars/461929067315462164/60b044356d35e1e8ae61af84aef7f997.webp")
            .setColor("#123456")
            .setDescription("Aides sur les commandes disponibles sur le serveur")
            .addField("Commandes Générales",
                "`!info` : Informations sur le serveur\n" +
                "`!help` : Affiche la fiche d'aide\n" +
                "`!club [join/j/+/leave/l/- club name]` : Gestion de vos clubs")
            .addField("Commandes Musique",
                "La liste des commandes de musique est disponibe [ici](https://rythmbot.co/features#list). Ces commandes ne sont disponibles que dans le channel " + get_channel("commandes-bot-musique"))
            .addField("Commandes Math",
                "L'aide complète du Bot Maths est disponible [ici](https://dxsmiley.github.io/mathbot/docs.html) ou avec la commande `=help`. Ces commandes ne sont disponibles que dans les salons " + get_channel("maths"))
            .addField("Commandes Casino",
                "Une présentation du casino et de ses commandes est disponible dans le channel " + get_channel("info-casino") + ". Ces commandes ne sont disponibles que dans les channels " + get_channel("casino-paris") + ", " + get_channel("casino-hong-kong") + " et " + get_channel("casino-las-vegas") + ".")
            .addField("Commandes Jeu Loup-Garou",
                "La liste des commandes du jeu de loup-garou est disponible avec la commande `w.help`. Ce bot n'est utilisable que dans le channel" + get_channel("loup-garou"))
            .addField("Commandes Modération",
                "`!admin` : Commande d'administration\n" +
                "`!switchClass` : C'est la rentrée les enfants")

  channel.send(embed)
}
