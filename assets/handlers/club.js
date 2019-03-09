const Discord = require('discord.js')

module.exports = (metaquery) => {
  var args = metaquery.args
  var channel = metaquery.channel
  // var message = metaquery.message
  var guild = metaquery.guild
  var author = metaquery.author
  var member = metaquery.member

  // Retrieving clubs
  var clubsOfficial = []
  var clubsNamespace = []
  guild.roles.filter(r => r.name.startsWith('Club ')).forEach(r => {
    clubsNamespace.push(r.name.substr(5).toLowerCase().replace("'", '').split(' ')[0].normalize('NFD').replace(/[\u0300-\u036f]/g, ''))
    clubsOfficial.push(r.name)
  })

  if (args[1] === 'join' || args[1] === 'j' || args[1] === '+') {
    let userInputClub = args[2]
    if (userInputClub && clubsNamespace.includes(userInputClub)) {
      let targetedClub = clubsOfficial[clubsNamespace.indexOf(userInputClub)]
      member.addRole(guild.roles.find(r => r.name === targetedClub), '[Clubs] Ajout du club ' + targetedClub + '.')
        .then(_ => {
          channel.send(author + ' vient de rejoindre le club ' + targetedClub + ' !')
          console.log('[Clubs] (➕) Ajout du club ' + targetedClub + ' à ' + author.username + '.')
        })
        .catch(err => { channel.send("Une erreur est survenue lors de l'ajout de votre club. Veuillez réessayer plus tard ou contacter la Modération"); console.error(err) })
    } else channel.send("Merci d'entrer un nom de club valide. Faites `!club` pour voir la liste")
  } else if (args[1] === 'leave' || args[1] === 'l' || args[1] === '-') {
    let userInputClub = args[2]
    if (userInputClub && clubsNamespace.includes(userInputClub)) {
      let targetedClub = clubsOfficial[clubsNamespace.indexOf(userInputClub)]
      member.removeRole(guild.roles.find(r => r.name === targetedClub), '[Clubs] Suppresion du club ' + targetedClub + '.')
        .then(_ => {
          channel.send(author + ' vient de quitter le club ' + targetedClub + ' !')
          console.log('[Clubs] (➖) Suppresion du club ' + targetedClub + ' à ' + author.username + '.')
        })
        .catch(err => { channel.send('Une erreur est survenue lors de la rétractation de votre club. Veuillez réessayer plus tard ou contacter la Modération'); console.error(err) })
    } else channel.send("Merci d'entrer un nom de club valide. Faites `!club` pour voir la liste")
  } else if (args[1] === '' || args[1] === undefined) {
    var clubsText = ''
    for (var i = 0; i < clubsNamespace.length; i++) clubsText += '- ' + clubsOfficial[i] + ' (**' + clubsNamespace[i] + '**)\n'
    var embed = new Discord.RichEmbed()
      .setAuthor('Louis XIV', 'https://cdn.discordapp.com/avatars/461929067315462164/60b044356d35e1e8ae61af84aef7f997.webp')
      .setColor('#123456')
      .setTitle('Clubs')
      .setDescription('Liste des clubs disponibles sur le serveur Discord')
      .addField('Comment rejoindre un club ?',
        "Pour rejoindre un club, exécutez la commande suivante `!club join <club name>` où `<club name>` est le nom d'usage du club (nom en gras plus bas)." +
        '\nPour quitter un club, exécutez la commande `!club leave <club name>`.\n\n**Pro Tip**: Utiliser les signes `+` et `-` à la place de `join` et `leave` :)')
      .addField('Clubs Disponibes', clubsText)

    channel.send(embed)
  } else channel.send("Syntaxe incorrecte. Faites `!club` pour plus d'aide")
}
