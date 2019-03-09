const Discord = require('discord.js')
const emrioutils = require('emrioutils')

var membersInRoleCount = (guild, rolename) => {
  return guild.members.filter(member => member.roles.find(m => m.name === rolename)).array().length
}

module.exports = (metaquery) => {
  // var args = metaquery.args
  var channel = metaquery.channel
  // var message = metaquery.message
  var guild = metaquery.guild

  // Retrieve the number of students per levels
  const levels = [ 'Secondes', 'Premières', 'Terminales', 'Anciens élèves', 'Prépas' ]
  var studentsPerLevel = ''
  for (var i = 0; i < levels.length; i++) studentsPerLevel += levels[i] + ': **' + membersInRoleCount(guild, levels[i]) + '** élèves\n'

  // Retrieve the number of verified members over the total number of members
  var verifiedRatio = emrioutils.round(100 * membersInRoleCount(guild, 'Vérifiés') / guild.memberCount, 2)

  // Retrieve the mods
  var modTeam = ''
  guild.members.filter(member => member.roles.find(m => m.name === 'Modération')).forEach(member => {
    modTeam += member + '\n'
  })

  // Generates the embed
  var embed = new Discord.RichEmbed()
    .setTitle('Informations sur le serveur - Lycée Louis Le Grand')
    .setAuthor('Louis XIV% le Statisticien', 'https://cdn.discordapp.com/avatars/461929067315462164/60b044356d35e1e8ae61af84aef7f997.webp')
    .setColor('#123456')
    .setDescription('Statistiques et informations sur le serveur Discord du Lycée')
    .addField('Utilisateurs inscrits', 'Le serveur compte **' + guild.memberCount + '** membres !\nRatio de vérification: **' + verifiedRatio + '%** des membres sont vérifiés')
    .addField('Utilisateurs par niveaux', studentsPerLevel)
    .addField('Équipe de Modération', "L'équipe de Modération est là pour vous aider dans l'utilisation du Discord. Voici la liste des modérateurs:\n" + modTeam)

  channel.send(embed)
}
