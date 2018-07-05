const Discord = require('discord.js')
const emrioutils = require('emrioutils')
const fs = require('fs')
const login = require("./assets/login")
const getprefix = require('./assets/getprefix')

// Command handlers
var COMMANDHANDLERS = {}
COMMANDHANDLERS.admin = require("./assets/handlers/admin")

// The Bot Object
const Bot = new Discord.Client()

// Global objects
var GUILD = null // LLG Guild

// Logs the bot in discord
login(Bot)


/* ON REACTION ADD EVENT */
Bot.on("messageReactionAdd", (reaction, user) => {
  if(user.bot) return false
  if(reaction.message.author.id !== Bot.user.id) return false
  if(reaction.message.guild !== null) return false
  if(!reaction.me) return false

  const levels = ["Secondes", "Premières", "Terminales"]

  var newLevel = GUILD.members.find("id", user.id).roles.find((role) => levels.includes(role.name) )

       if(newLevel.name === "Secondes") var classdiscriminator = "2nd-"
  else if(newLevel.name === "Premières") var classdiscriminator = "1S-"
  else if(newLevel.name === "Terminales") var classdiscriminator = "TS-"

  // Function that takes the class attribute (1-7, L or T) and puts the new class to the user
  var newClass = (num) => {
    // S series classname
         if(typeof num === "number") var classname = classdiscriminator + num.toString()
    // L series classname
    else if(num === "L" && newLevel.name === "Premières") var classname = "1L"
    else if(num === "L" && newLevel.name === "Terminales") var classname = "TL"
    // STI2D series classname
    else if(num === "STI2D" && newLevel.name === "Premières") var classname = "1STI2D"
    else if(num === "STI2D" && newLevel.name === "Terminales") var classname = "TSTI2D"

    // Adds the role to the user
    GUILD.members.find("id", user.id).addRole(GUILD.roles.find("name", classname), "[MAJ Classes] Affectation de la nouvelle classe.")
      .catch(console.error)
      .then(() => {
        user.send("Votre nouvelle classe vous a été affecté. Passez une bonne année !")
        console.log("[MAJ Classes] (🎒) " + user.username + " a été affecté en " + classname)
       })

    // Deletes the prompt
    reaction.message.delete()
      .catch(console.error)
  }

  // Puts the new class depending on emoji
  switch (reaction.emoji.name) {
    case "1⃣":
      newClass(1)
      break
    case "2⃣":
      newClass(2)
      break
    case "3⃣":
      newClass(3)
      break
    case "4⃣":
      newClass(4)
      break
    case "5⃣":
      newClass(5)
      break
    case "6⃣":
      newClass(6)
      break
    case "7⃣":
      newClass(7)
      break
    case "🇱":
      newClass("L")
      break
    case "🇹":
      newClass("STI2D")
      break

    default:
      console.warn("[MAJ Classes] (❗️) L'émoji envoyé n'était pas 1-7, L ou T. Cette réaction n'est pas normale.")
  }

})






/* ON MESSAGE EVENT */
Bot.on("message", (message) => {

  //console.log(Bot.emojis);

  var content = message.content // Get message's content
  var author = message.author // Get message author
  var guild = message.guild // Get message's guild
  var channel = message.channel // Get message's channel
  var member = message.member // The guild member of the message
  var prefix = getprefix() // The server's prefix

  // Do not process if the message is not correct (from DM for instance)
  if(message === undefined || author === undefined || guild === undefined || channel === undefined || guild === null || member === undefined || member === null) return

  // Do not process if the message is from a bot
  if(author.bot) return

  if(content.startsWith(prefix)) {

    var args = content.substr(1).split(" ")

    console.log("New command: " + args[0])

    var metaquery = {
      content: content,
      author: author,
      guild: guild,
      channel: channel,
      member: member,
      prefix: prefix,
      args: args,
      message: message,
    }

    switch (args[0]) {
      case "admin":
        COMMANDHANDLERS.admin(metaquery)
        break

      default:
        console.warn("Unrecognized command")

    }

  }



})

/* SERVER NEW MEMBER EVENT */
Bot.on("guildMemberAdd", (member) => {

  console.log("[Gestion Serveur] (🆕) Nouveau membre : " + member.user.username)

  var guild = member.guild
  var invitedRole = guild.roles.find("name", "Invités")

  member.addRole(invitedRole)
    .catch(console.error)

  var welcomeText = "Bienvenue sur le serveur Discord du Lycée Louis-Le-Grand de la part de l'équipe de l'administration.\nJe suis Louis XIV, le bot principal du serveur.\nJe te conseille de lire le règlement du serveur puis de te présenter dans le channel `#présentation`. Si tu es un élève du lycée, merci de signaler ta classe dans ta présentation. Sinon, merci d'indiquier les raisons pour lesquels tu nous rejoins !\n\Je te souhaite de passer un bon temps avec nous !"

  member.user.send(welcomeText)

})

/* BOT READY EVENT */
Bot.on("ready", () => {
  GUILD = Bot.guilds.find("id", "461887502631043082")
  console.log("[Bot] (🔔) Prêt à vous servir.")
})

/* ERROR EVENT */
Bot.on("error", (err) => {
  console.error(err)
})

/* WARNING EVENT */
Bot.on("warn", (warn) => {
  console.warn(warn)
})
