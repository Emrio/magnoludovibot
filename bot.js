const Discord = require('discord.js')
const emrioutils = require('emrioutils')
const fs = require('fs')
const login = require("./assets/login")
const getprefix = require('./assets/getprefix')

// The Bot Object
const Bot = new Discord.Client()

// Logs the bot in discord
login(Bot)


/* SERVER NEW MEMBER EVENT */
Bot.on("guildMemberAdd", (member) => {

  console.log("[Server Management] New member joined")

  var guild = member.guild
  var invitedRole = guild.roles.find("name", "Invités")

  member.addRole(invitedRole)
    .then(console.log)
    .catch(console.error)

  var welcomeText = "Bienvenue sur le serveur Discord du Lycée Louis-Le-Grand de la part de l'équipe de l'administration.\nJe suis Louis XIV, le bot principal du serveur. Tu peux voir la liste des commandes disponibles avec le `!help`.\nJe te conseille de lire le règlement du serveur puis de te présenter dans le channel `#présentation`. Si tu es un élève du lycée, merci de signaler ta classe dans ta présentation. Sinon, merci d'indiquier les raisons pour lesquels tu nous rejoins !\n\Je te souhaite de passer un bon temps avec nous !"

  member.user.send(welcomeText)

})

/* BOT READY EVENT */
Bot.on("ready", () => {
  console.log("Connecté!")


  /* SET PERMISSIONS FOR CLASS CHANNELS
  var perms = {
    CREATE_INSTANT_INVITE: false,
    MANAGE_CHANNELS: false,
    MANAGE_GUILD: false,
    ADD_REACTIONS: true,
    VIEW_CHANNEL: true,
    READ_MESSAGES: true,
    SEND_MESSAGES: true,
    SEND_TTS_MESSAGES: true,
    MANAGE_MESSAGES: false,
    EMBED_LINKS: true,
    ATTACH_FILES: true,
    READ_MESSAGE_HISTORY: true,
    MENTION_EVERYONE: false,
    EXTERNAL_EMOJIS: true,
    USE_EXTERNAL_EMOJIS: true,
    MANAGE_WEBHOOKS: false,
  }

  var channels = Bot.guilds.find("id", "461887502631043082").channels

  var channels = channels.filter((element) => {
    if(element.name.startsWith("2nd-") || element.name.startsWith("1s-") || element.name.startsWith("1l") || element.name.startsWith("ts-") || element.name.startsWith("tl")) {
      return true
    }
  })

  channels.array().forEach((element) => {
    var rolename = (element.name.startsWith("2nd")) ? element.name : element.name.toUpperCase()
    var role = Bot.guilds.find("id", "461887502631043082").roles.find("name", rolename)
    console.log(role.name)
    element.overwritePermissions(role, perms)
  })
  */


})

/* ERROR EVENT */
Bot.on("error", (err) => {
  console.error(err);
})

/* WARNING EVENT */
Bot.on("warn", (warn) => {
  console.warn(warn);
})
