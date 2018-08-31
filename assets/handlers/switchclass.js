const Discord = require('discord.js')
const emrioutils = require('emrioutils')



module.exports = (GUILD, message) => {

  const stopwatch = new emrioutils.Stopwatch()

  if( !message.member.permissions.has("ADMINISTRATOR") ) {
    channel.send("Vous ne pouvez pas utiliser cette commande")
    return
  }

  const levels = [ "Pré-Secondes", "Secondes", "Premières", "Terminales", "Anciens Élèves"] // The levels available
  const classes = []
  // Gets the class roles (2nd-1, 2nd-2, 1S-1, 1S-2, TS-1, TS-2, 1L, 1STI2D, ...)
  GUILD.roles.forEach((role) => {
    if(role.name.startsWith("2nd-") || role.name.startsWith("1S-") || role.name.startsWith("TS-") || role.name.startsWith("TL") || role.name.startsWith("1L") || role.name.startsWith("1STI2D") || role.name.startsWith("TSTI2D")) {
      classes.push(role.name)
    }
  })

  // Get the memebers which have a role like "Secondes" (level)
  var members = GUILD.members.filter((member) => {
    return member.roles.some((role) => {
      return levels.includes(role.name)
    })
  }).array()

  async function processMember(member) {

    return new Promise((resolve) => {

      console.log("[MAJ Classes] (🔆) Début du traitement pour " + member.user.username)
      // Starting the stopwatch
      stopwatch.start()

      // Get the current level of the pupil (eg: Secondes), its new level (eg: Premières) and its current class (eg: 2nd-1)
      var currentLevel = member.roles.find(role => levels.includes(role.name))
      var newLevel = GUILD.roles.find(r => r.name === (currentLevel && currentLevel.name && (levels[levels.indexOf(currentLevel.name)+1] !== undefined && levels.indexOf(currentLevel.name) > -1) ? levels[levels.indexOf(currentLevel.name)+1] : "Anciens Élèves"))
      var currentClass = member.roles.find(role => classes.includes(role.name))

      console.log(newLevel.name, newLevel.id)

// Remove level
      member.removeRole(currentLevel, "[MAJ Classes] Suppresion du niveau")
        .then(() => {
// Remove class
          member.removeRole(currentClass, "[MAJ Classes] Suppresion de la classe")
            .then(() => {
// Add new level
              member.addRole(newLevel, "[MAJ Classes] Ajout du nouveau niveau")
                .then(() => {
                  if(newLevel.name !== "Anciens Élèves") {
// Send new class prompt message
                    var classlabel = newLevel.name.substring(0, newLevel.name.length-1)
                         if(newLevel.name === "Secondes") var classdiscriminator = "2nd-"
                    else if(newLevel.name === "Premières") var classdiscriminator = "1S-"
                    else if(newLevel.name === "Terminales") var classdiscriminator = "TS-"
                    var text = "Bonjour, tu passes maintenant en classe de **" + classlabel + "** !\nClique sur un des boutons en dessous pour sélectionner ta nouvelle classe.\nExemple: clique sur :one: si tu es en " + classdiscriminator + "1.\nMerci de choisir ta véritable classe (tu ne pourras pas changer après !)"
                    text += (levels.indexOf(newLevel.name) > 1) ? "\n\nNote: une icône :regional_indicator_l: est disponible pour les 1L et TL et une icône :regional_indicator_t: pour les 1STI2D et TSTI2D.\n\n" : "\n\n"
                    text += "Passe une bonne journée - Signé, Louis XIV"
                    member.user.send(text)
// React with 1-7 number emojis + L and T emojis if in Premières or Terminales
                      .then((message) => {
                        message.react("\u0031\u20E3") // 1 emoji
                          .then(() => {
                            message.react("\u0032\u20E3") // 2 emoji
                              .then(() => {
                                message.react("\u0033\u20E3") // 3 emoji
                                  .then(() => {
                                    message.react("\u0034\u20E3") // etc...
                                      .then(() => {
                                        message.react("\u0035\u20E3")
                                          .then(() => {
                                            message.react("\u0036\u20E3")
                                              .then(() => {
                                                message.react("\u0037\u20E3")
                                                  .then(() => {
                                                    // The member is going in Premières or Terminales
                                                    if(newLevel.name === "Premières" || newLevel.name === "Terminales") {
                                                      message.react("🇱")  // L emoji (1L and TL)
                                                        .then(() => {
                                                          message.react("🇹")  // T emoji (1STI2D and TSTI2D)
                                                          .then(() => {
                                                            stopwatch.stop()
                                                            console.log("[MAJ Classes] (✅) Demande de mise à jour de classe envoyée à " + member.user.username + ". Traité en " + stopwatch.elapsed() + "ms.")
                                                            resolve() // NEXT!!!
                                                          })
                                                        })
                                                    // The member is not going in Premières or Terminales
                                                    } else {
                                                      stopwatch.stop()
                                                      console.log("[MAJ Classes] (✅) Demande de mise à jour de classe envoyée à " + member.user.username + ". Traité en " + stopwatch.elapsed() + "ms.")
                                                      resolve() // NEXT!!!
                                                    }
                      })})})})})})})}).catch(console.error)

                  // The user is now an old student
                  } else {
                    text = "Vous êtes maintenant enregistré en tant qu'ancien élève du lycée. Vous pouvez contacter la Modération si vous passez dans les classes préparatoires du lycée."
                    member.user.send(text)
                    stopwatch.stop()
                    console.log("[MAJ Classes] (✅) Demande de mise à jour de classe envoyée à " + member.user.username + ". Traité en " + stopwatch.elapsed() + "ms.")
                    resolve() // NEXT!!!
                  }

                })
                .catch(console.error)
            })
            .catch(() => { console.log("[MAJ Classes] (❓) " + member.user.username + " n'a pas de classe") })
        })
        .catch(console.error)
    })

  }

  // This will process every single new pupil
  async function processAll(pupils) {
    for (var pupil of pupils) {
      await processMember(pupil)
    }
    console.log("[MAJ Classes] (🏆) Terminé en " + stopwatch.historySum() + "ms.")
    stopwatch.clearHistory()
  }

  processAll(members) // Lunch the process

  message.channel.send("Traitement de votre commande en cours...")

}
