const Discord = require('discord.js')
const emrioutils = require('emrioutils')
const fs = require('fs')
// const options = new (require('./../models/Options'))()


String.prototype.last = function () {
  return this[this.length-1]
}

Array.prototype.last = function () {
  return this[this.length-1]
}

module.exports = (metaquery) => {

  if( !message.member.permissions.has("ADMINISTRATOR") ) {
    channel.send("Vous ne pouvez pas utiliser cette commande")
    return
  }

  var args = metaquery.args
  var channel = metaquery.channel
  var message = metaquery.message
  var guild = metaquery.guild

  if(args[1]) {

    //var to_verif_ids = options.get("to_verify_users")
    var to_veri

    var member = message.mentions.members.first() || guild.members.filter(m => m.user.username.toLowerCase().startsWith(args[1].toLowerCase()))

    if (member instanceof Discord.Collection && member.array().length > 1) {
      channel.send("Multiple users match your query `" + args[1] + "`. Please be more specific.")
      return
    }
    else if(member instanceof Discord.Collection && member.array().length === 0) {
      channel.send("No results have been found for the query `" + args[1] + "`. Please try again.")
      return
    }
    else if(member instanceof Discord.Collection && member.array().length === 1) {
      member = member.first()
    }

    const roles = {
      verified: guild.roles.find(r => r.name === "Vérifiés"),
      guest: guild.roles.find(r => r.name === "Invités"),
      being_verified: guild.roles.find(r => r.name === "En cours de vérification"),
      seconde: guild.roles.find(r => r.name === "Secondes"),
      premiere: guild.roles.find(r => r.name === "Premières"),
      terminales: guild.roles.find(r => r.name === "Terminales"),
    }

    member.addRole(roles.verified, "Déclenchement de la commande de vérification")
      .catch((err) => {
        console.log("[Registration] (❗️) Erreur lors de l'ajout du role 'Vérifiés': " + err)
        channel.send("Erreur lors de l'ajout du role `Vérifiés`. Veuillez réessayez")
      })
      .then(() => {
        member.removeRoles([roles.guest, roles.being_verified], "Déclenchement de la commande de vérification")
          .catch((err) => {
            console.log("[Registration] (❗️) Erreur lors de la rétraction du role 'Invités' et 'En cours de vérification': " + err)
            channel.send("Erreur lors de la rétraction des roles `Invités` et `En cours de vérification`. Veuillez réessayez")
          })
          .then(() => {

            if(args[2] === "as") {

                // Seconde
              if(/(2nd[1-7])|(2n[1-7])/gi.test(args[3])) {
                var class_num = args[3].last()
                member.addRoles([roles.seconde, guild.roles.find(r => r.name === "2nd-" + class_num),], "Déclenchement de la commande de vérification")
                  .catch((err) => {
                    console.log("[Registration] (❗️) Erreur lors de l'attribution des roles 'Secondes' et '2nd-" + class_num + "': " + err)
                    channel.send("Erreur lors de l'ajout des roles `Secondes` et `2nd-" + class_num + "`. Veuillez réessayez")
                  })
                  .then(() => {
                    channel.send("Enregistrement de " + member + " terminé!")
                  })

                  // Première S
              } else if(/(1s[1-7])/gi.test(args[3])) {
                var class_num = args[3].last()
                member.addRoles([roles.premiere, guild.roles.find(r => r.name === "1S-" + class_num),], "Déclenchement de la commande de vérification")
                  .catch((err) => {
                    console.log("[Registration] (❗️) Erreur lors de l'attribution des roles 'Premières' et '1S-" + class_num + "': " + err)
                    channel.send("Erreur lors de l'ajout des roles `Premières` et `1S-" + class_num + "`. Veuillez réessayez")
                  })
                  .then(() => {
                    channel.send("Enregistrement de " + member + " terminé!")
                  })

                  // Terminale S
              } else if(/(ts[1-7])/gi.test(args[3])) {
                var class_num = args[3].last()
                member.addRoles([roles.terminales, guild.roles.find(r => r.name === "TS-" + class_num),], "Déclenchement de la commande de vérification")
                  .catch((err) => {
                    console.log("[Registration] (❗️) Erreur lors de l'attribution des roles 'Terminales' et 'TS-" + class_num + "': " + err)
                    channel.send("Erreur lors de l'ajout des roles `Terminales` et `TS-" + class_num + "`. Veuillez réessayez")
                  })
                  .then(() => {
                    channel.send("Enregistrement de " + member + " terminé!")
                  })

                  // Première STI2D
              } else if(/(1|p)sti(2d|2|)/gi.test(args[3])) {
                member.addRoles([roles.premiere, guild.roles.find(r => r.name === "1STI2D"),], "Déclenchement de la commande de vérification")
                  .catch((err) => {
                    console.log("[Registration] (❗️) Erreur lors de l'attribution des roles 'Premières' et '1STI2D': " + err)
                    channel.send("Erreur lors de l'ajout des roles `Premières` et `1STI2D`. Veuillez réessayez")
                  })
                  .then(() => {
                    channel.send("Enregistrement de " + member + " terminé!")
                  })

                  // Terminales STI2D
              } else if(/(t|0)sti(2d|2|)/gi.test(args[3])) {
                member.addRoles([roles.terminales, guild.roles.find(r => r.name === "TSTI2D"),], "Déclenchement de la commande de vérification")
                  .catch((err) => {
                    console.log("[Registration] (❗️) Erreur lors de l'attribution des roles 'Terminales' et 'TSTI2D': " + err)
                    channel.send("Erreur lors de l'ajout des roles `Terminales` et `TSTI2D`. Veuillez réessayez")
                  })
                  .then(() => {
                    channel.send("Enregistrement de " + member + " terminé!")
                  })

                  // Première L
              } else if(/(1|p)l/gi.test(args[3])) {
                member.addRoles([roles.premiere, guild.roles.find(r => r.name === "1L"),], "Déclenchement de la commande de vérification")
                  .catch((err) => {
                    console.log("[Registration] (❗️) Erreur lors de l'attribution des roles 'Premières' et '1L': " + err)
                    channel.send("Erreur lors de l'ajout des roles `Premières` et `1L`. Veuillez réessayez")
                  })
                  .then(() => {
                    channel.send("Enregistrement de " + member + " terminé!")
                  })

                  // Terminales L
              } else if(/(t|0)l/gi.test(args[3])) {
                member.addRoles([roles.terminales, guild.roles.find(r => r.name === "TL"),], "Déclenchement de la commande de vérification")
                  .catch((err) => {
                    console.log("[Registration] (❗️) Erreur lors de l'attribution des roles 'Terminales' et 'TL': " + err)
                    channel.send("Erreur lors de l'ajout des roles `Terminales` et `TL`. Veuillez réessayez")
                  })
                  .then(() => {
                    channel.send("Enregistrement de " + member + " terminé!")
                  })
              }
              else {
                channel.send("La classe n'a pas été reconnue. Veuillez rééssayez.")
              }


            } else if(args[2] === "" || args[2] === undefined) {
              channel.send("Enregistrement de " + member + " terminé!")
            }
            else {
              channel.send("Votre commande semble être incorrecte.")
            }

          })
      })


  } else channel.send("Vous devez spécifier un pseudo"/* ou d'utiliser le mot-clé `last`"*/)

}
