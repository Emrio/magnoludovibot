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

  //console.log(Discord.Permissions.FLAGS);

  /* SET MODERATOR PERMS FOR ALL PUBLICS CHANS */

  // var allperms = {
  //   CREATE_INSTANT_INVITE: true,
  //   KICK_MEMBERS: true,
  //   BAN_MEMBERS: true,
  //   ADMINISTRATOR: false,
  //   MANAGE_CHANNELS: true,
  //   MANAGE_GUILD: true,
  //   ADD_REACTIONS: true,
  //   VIEW_AUDIT_LOG: true,
  //   VIEW_CHANNEL: true,
  //   READ_MESSAGES: true,
  //   SEND_MESSAGES: true,
  //   SEND_TTS_MESSAGES: true,
  //   MANAGE_MESSAGES: true,
  //   EMBED_LINKS: true,
  //   ATTACH_FILES: true,
  //   READ_MESSAGE_HISTORY: true,
  //   MENTION_EVERYONE: true,
  //   EXTERNAL_EMOJIS: true,
  //   USE_EXTERNAL_EMOJIS: true,
  //   CONNECT: true,
  //   SPEAK: true,
  //   MUTE_MEMBERS: true,
  //   DEAFEN_MEMBERS: true,
  //   MOVE_MEMBERS: true,
  //   USE_VAD: true,
  //   CHANGE_NICKNAME: true,
  //   MANAGE_NICKNAMES: true,
  //   MANAGE_ROLES: true,
  //   MANAGE_ROLES_OR_PERMISSIONS: true,
  //   MANAGE_WEBHOOKS: true,
  //   MANAGE_EMOJIS: true
  // }
  //
  // var channels = Bot.guilds.find("id", "461887502631043082").channels
  //
  // var channels = channels.filter((element) => {
  //   if(!element.name.startsWith("2nd-") && !element.name.startsWith("1s-") && !element.name.startsWith("1l") && !element.name.startsWith("ts-") && !element.name.startsWith("tl")) {
  //     return true
  //   }
  // })
  //
  // channels.array().forEach((element) => {
  //   var role = Bot.guilds.find("id", "461887502631043082").roles.find("name", "Modération")
  //   console.log(role.name)
  //   element.overwritePermissions(role, allperms)
  // })



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
  console.error(err)
})

/* WARNING EVENT */
Bot.on("warn", (warn) => {
  console.warn(warn)
})
