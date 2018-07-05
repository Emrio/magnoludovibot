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

// Logs the bot in discord
login(Bot)


/* ON REACTION ADD EVENT */
Bot.on("messageReactionAdd", (reaction, user) => {

  if(user.bot) return
  if(reaction.message.guild !== null) return

  if(reaction.message.author.bot) {

    var member = Bot.guilds.first().members.find("id", user.id)
    var level = member.roles.find(role => role.name === "Secondes" || role.name === "Premières" || role.name === "Terminales")

         if(reaction.emoji.name === "1⃣") member.addRole(getClassByLevelAndNumber(Bot.guilds.first(), level, 1))
    else if(reaction.emoji.name === "2⃣") member.addRole(getClassByLevelAndNumber(Bot.guilds.first(), level, 2))
    else if(reaction.emoji.name === "3⃣") member.addRole(getClassByLevelAndNumber(Bot.guilds.first(), level, 3))
    else if(reaction.emoji.name === "4⃣") member.addRole(getClassByLevelAndNumber(Bot.guilds.first(), level, 4))
    else if(reaction.emoji.name === "5⃣") member.addRole(getClassByLevelAndNumber(Bot.guilds.first(), level, 5))
    else if(reaction.emoji.name === "6⃣") member.addRole(getClassByLevelAndNumber(Bot.guilds.first(), level, 6))
    else if(reaction.emoji.name === "7⃣") member.addRole(getClassByLevelAndNumber(Bot.guilds.first(), level, 7))
    else if(reaction.emoji.name === "🇱") member.addRole(getClassByLevelAndNumber(Bot.guilds.first(), level, "L"))

    reaction.message.delete()
    user.send("Merci. Votre affectation peut prendre quelques secondes...")

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

  console.log("[Server Management] New member joined")

  var guild = member.guild
  var invitedRole = guild.roles.find("name", "Invités")

  member.addRole(invitedRole)
    .catch(console.error)

  var welcomeText = "Bienvenue sur le serveur Discord du Lycée Louis-Le-Grand de la part de l'équipe de l'administration.\nJe suis Louis XIV, le bot principal du serveur.\nJe te conseille de lire le règlement du serveur puis de te présenter dans le channel `#présentation`. Si tu es un élève du lycée, merci de signaler ta classe dans ta présentation. Sinon, merci d'indiquier les raisons pour lesquels tu nous rejoins !\n\Je te souhaite de passer un bon temps avec nous !"

  member.user.send(welcomeText)

})

/* BOT READY EVENT */
Bot.on("ready", () => {
  console.log("Connecté!")
})

/* ERROR EVENT */
Bot.on("error", (err) => {
  console.error(err)
})

/* WARNING EVENT */
Bot.on("warn", (warn) => {
  console.warn(warn)
})
