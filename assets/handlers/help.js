const Discord = require('discord.js')

module.exports = (metaquery) => {
  // var args = metaquery.args
  var channel = metaquery.channel
  // var message = metaquery.message
  var guild = metaquery.guild

  var getChannel = name => {
    return guild.channels.find(c => c.name === name)
  }

  // Generates the embed
  var embed = new Discord.RichEmbed()
    .setTitle("Fiche d'aide sur l'utilisation des commandes - Lycée Louis Le Grand")
    .setAuthor('Louis XIV% le Helper', 'https://cdn.discordapp.com/avatars/461929067315462164/60b044356d35e1e8ae61af84aef7f997.webp')
    .setColor('#123456')
    .setDescription('Aides sur les commandes disponibles sur le serveur')
    .addField('Commandes Générales',
      '`!info` : Informations sur le serveur\n' +
      "`!help` : Affiche la fiche d'aide\n" +
      '`!club [join/j/+/leave/l/- club name]` : Gestion de vos clubs')
    .addField('Commandes Musique',
      'La liste des commandes de musique est disponibe [ici](https://rythmbot.co/features#list). Ces commandes ne sont disponibles que dans le channel ' + getChannel('commandes-bot-musique'))
    .addField('Commandes Math',
      "L'aide complète du Bot Maths est disponible [ici](https://dxsmiley.github.io/mathbot/docs.html) ou avec la commande `=help`. Ces commandes ne sont disponibles que dans les salons " + getChannel('maths'))
    .addField('Commandes Casino',
      'Une présentation du casino et de ses commandes est disponible dans le channel ' + getChannel('info-casino') + '. Ces commandes ne sont disponibles que dans les channels ' + getChannel('casino-paris') + ', ' + getChannel('casino-hong-kong') + ' et ' + getChannel('casino-las-vegas') + '.')
    .addField('Commandes Jeu Loup-Garou',
      "La liste des commandes du jeu de loup-garou est disponible avec la commande `w.help`. Ce bot n'est utilisable que dans le channel" + getChannel('loup-garou'))
    .addField('Commandes Modération',
      "`!admin <role>` : Commande d'administration\n" +
      "`!switchClass` : C'est la rentrée les enfants\n" +
      '`!register <user> [as <class>]` : Enregistre et vérifie un nouveau membre\n'
    )

  channel.send(embed)
}
