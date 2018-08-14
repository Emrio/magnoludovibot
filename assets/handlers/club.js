const Discord = require('discord.js')
const emrioutils = require('emrioutils')
const fs = require('fs')

module.exports = (metaquery) => {

  var args = metaquery.args
  var channel = metaquery.channel
  var message = metaquery.message
  var guild = metaquery.guild
  var author = metaquery.author
  var member = metaquery.member

  // Retrieving clubs
  var clubs_official = []
  var clubs_namespace = []
  guild.roles.filter(r => r.name.startsWith("Club ")).forEach(r => {
    clubs_namespace.push(r.name.substr(5).toLowerCase().replace("'", "").split(" ")[0].normalize('NFD').replace(/[\u0300-\u036f]/g, ""))
    clubs_official.push(r.name)
  })


  if(args[1] == "join" || args[1] == "j" || args[1] == "+") {

    var user_input_club = args[2]
    if (user_input_club && clubs_namespace.includes(user_input_club)) {

      var targeted_club = clubs_official[clubs_namespace.indexOf(user_input_club)]
      member.addRole(guild.roles.find(r => r.name == targeted_club), "[Clubs] Ajout du club " + targeted_club + ".")
        .then(_ => {
          channel.send(author + " vient de rejoindre le club " + targeted_club + " !")
          console.log("[Clubs] (➕) Ajout du club " + targeted_club + " à " + author.username + ".")
        })
        .catch(err => { channel.send("Une erreur est survenue lors de l'ajout de votre club. Veuillez réessayer plus tard ou contacter la Modération"); console.error(err) })

    } else channel.send("Merci d'entrer un nom de club valide. Faites `!club` pour voir la liste")

  } else if(args[1] == "leave" || args[1] == "l" || args[1] == "-") {

    var user_input_club = args[2]
    if (user_input_club && clubs_namespace.includes(user_input_club)) {

      var targeted_club = clubs_official[clubs_namespace.indexOf(user_input_club)]
      member.removeRole(guild.roles.find(r => r.name == targeted_club), "[Clubs] Suppresion du club " + targeted_club + ".")
        .then(_ => {
          channel.send(author + " vient de quitter le club " + targeted_club + " !")
          console.log("[Clubs] (➖) Suppresion du club " + targeted_club + " à " + author.username + ".")
        })
        .catch(err => { channel.send("Une erreur est survenue lors de la rétractation de votre club. Veuillez réessayer plus tard ou contacter la Modération"); console.error(err) })

    } else channel.send("Merci d'entrer un nom de club valide. Faites `!club` pour voir la liste")

  } else if(args[1] == "" || args[1] == undefined) {

    clubs_text = ""
    for (var i = 0; i < clubs_namespace.length; i++) clubs_text += "- " + clubs_official[i] + " (**" + clubs_namespace[i] + "**)\n"

    var embed = new Discord.RichEmbed()
      .setAuthor("Louis XIV", "https://cdn.discordapp.com/avatars/461929067315462164/60b044356d35e1e8ae61af84aef7f997.webp")
      .setColor("#123456")
      .setTitle("Clubs")
      .setDescription("Liste des clubs disponibles sur le serveur Discord")
      .addField("Comment rejoindre un club ?",
          "Pour rejoindre un club, exécutez la commande suivante `!club join <club name>` où `<club name>` est le nom d'usage du club (nom en gras plus bas)." +
          "\nPour quitter un club, exécutez la commande `!club leave <club name>`.\n\n**Pro Tip**: Utiliser les signes `+` et `-` à la place de `join` et `leave` :)")
      .addField("Clubs Disponibes", clubs_text)

    channel.send(embed)

  } else channel.send("Syntaxe incorrecte. Faites `!club` pour plus d'aide")

}
