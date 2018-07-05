const Discord = require('discord.js')
const emrioutils = require('emrioutils')
const fs = require('fs')
const getAllClasses = require('./getAllClasses')

module.exports = (members, classes) => {

  // For each member, take its current class, see in the classes its index, give him index+1

  members.forEach((member) => {

    var oldLevel = member.roles.find(role => classes.includes(role))

    if(classes.indexOf(oldLevel) !== 0 && oldLevel !== null) {

      var newLevel = classes[ classes.indexOf(oldLevel)-1 ]

      member.removeRole(oldLevel)
      member.addRole(newLevel)

      var oldClass = member.roles.find(role => role.name.startsWith("2nd-") || role.name.startsWith("1S-") || role.name.startsWith("1L") || role.name.startsWith("TS-") || role.name.startsWith("TL"))

      if(member.user.id === "228252119956717570") {

        member.removeRole(oldClass)
          .catch(console.log)

        var updateClassText = "Bonjour ! Tu passes maintenant en classe de **" + newLevel.name + "**. Merci de choisir ta nouvelle classe en cliquant sur le correspondant (\u0031\u20E3 = " + newLevel.name + " 1, etc...)\nAttention ! Merci de choisir ta vraie classe car tu ne pourras pas la changer après."

        if(newLevel.name === "Premières" || newLevel.name === "Terminales") updateClassText += "\n\nUne icône 🇱 est disponible pour les 1L et les TL"

        member.user.send(updateClassText)
          .then((message) => {
            var reactions = [/*"\u0030\u20E3",*/"\u0031\u20E3","\u0032\u20E3","\u0033\u20E3","\u0034\u20E3","\u0035\u20E3", "\u0036\u20E3","\u0037\u20E3","\u0038\u20E3","\u0039\u20E3"]

            for (var i = 0; i < reactions.length; i++) {
              message.react(reactions[i])
            }

            if(newLevel.name === "Premières" || newLevel.name === "Terminales") message.react("🇱")

          })

          console.log("[Class Management] Waitiing for class selection for " + member.user)

      }

    }

  })

}
