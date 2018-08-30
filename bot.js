const Discord = require('discord.js')
const emrioutils = require('emrioutils')
const fs = require('fs')

const options = new (require('./assets/models/Options'))()

const error_handler = require('./assets/error_handler')
const login = require('./assets/login')
const app = require('./webserver/app')

const cfg = require("./assets/config.json")
const prefix = cfg.prefix
const commands = cfg.commands
const indev = cfg.indev

// Command handlers
var COMMANDHANDLERS = {}
for (cmd of commands) {
  COMMANDHANDLERS[cmd] = require("./assets/handlers/" + cmd)
}

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

  var newLevel = GUILD.members.find(m => m.id == user.id).roles.find((role) => levels.includes(role.name) )

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
    GUILD.members.find(m => m.id == user.id).addRole(GUILD.roles.find(r => r.name == classname), "[MAJ Classes] Affectation de la nouvelle classe.")
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

  if (indev) console.log(message.content)

  var content = message.content // Get message's content
  var author = message.author // Get message author
  var guild = message.guild // Get message's guild
  var channel = message.channel // Get message's channel
  var member = message.member // The guild member of the message

  if(message.attachments.array().length > 0 && guild == undefined && GUILD.members.find(m => m.user.equals(author)) && GUILD.members.find(m => m.user.equals(author)).roles.find(r => r.name === "Vérifiés") === null) {

    // Anti spam
    if (GUILD.members.find(m => m.user.equals(author)).roles.find(r => r.name === "En cours de vérification") !== null) {
      author.send("❗️ Vous avez déjà envoyé votre demande de vérification. Celle-ci ne sera pas prise en compte.\nSi la précédente était une erreur, veuillez prévenir la Modération.\nSi la Modération n'a pas répondu à votre demande de vérification après 5 min. Vous pouvez prévenir les modérateurs en ligne en Messages Privés.")
      return
    }

    // Message to verif channel
    var verif_channel = GUILD.channels.find(c => c.name == "modération-vérification")
    verif_channel.send(
      ":arrow_forward: Nouvelle demande de vérification envoyé par " + author.username + ". Pour accepter sa candidature, effectuer la commande `!register " + author.username + " as <classe>`\n__**Info**__: La classe doit être sous la forme 2nd4, 2ND5, 1S1, 1s3, TS1, ts4, 1l, tl, tsti, TSTI, 1sti, prépas, prép, prep, prepas, pre2nd\n\nSi le membre n'est pas un élève, merci d'exécuter `!register " + author.username + "` puis de faire sa vérification manuellement.",
      { files: [{ attachment: message.attachments.first().url, name: message.attachments.first().filename }] }
    )

    // Append user id to the list of users to verify
    if (options.get("to_verify_users") == undefined) options.set("to_verify_users", [])
    to_verify_users = options.get("to_verify_users")
    to_verify_users.push(author.id)
    options.set("to_verify_users", to_verify_users)

    // Add the "being verified" role to the user
    GUILD.members.find(m => m.id === author.id).addRole(GUILD.roles.find(r => r.name === "En cours de vérification"))

    // Response to user
    author.send("✅ Votre demande de vérification a bien été prise en compte. Elle sera traité sous peut par un membre de la Modération.\nVous pouvez accélerer votre vérification en envoyant un message privé à un membre de la Modération actuellement en ligne")

  }

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
      message: message
    }

    switch (args[0]) {
      case "admin":
        COMMANDHANDLERS.admin(metaquery)
        break

      case "switchClass":
        COMMANDHANDLERS.switchclass(GUILD, message)
        break

      case "info":
        COMMANDHANDLERS.info(metaquery)
        break

      case "club":
        COMMANDHANDLERS.club(metaquery)
        break

      case "register":
        COMMANDHANDLERS.register(metaquery)
        break

      case "clearClassChannels":
        COMMANDHANDLERS.clearclasschannels(metaquery)
        break

      case "classBC":
        COMMANDHANDLERS.classbroadcast(metaquery)
        break

      case "help":
        COMMANDHANDLERS.help(metaquery)
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
  var invitedRole = guild.roles.find(r => r.name == "Invités")

  member.addRole(invitedRole)
    .catch(console.error)

  member.user.send(cfg.welcome_text)

})

/* BOT READY EVENT */
Bot.on("ready", () => {
  GUILD = Bot.guilds.find(g => g.id == "461887502631043082")
  console.log("[Bot] (🔔) Prêt à vous servir.")

  if(indev) {
    Bot.user.setActivity("Version expérimentale en cours d'utilisation", { type: "WATCHING" })
    console.log("[Bot] (🛠 ) The bot is in dev mode")
  } else Bot.user.setActivity("!help", { type: "WATCHING" })
})

/* ERROR EVENT */
Bot.on("error", (err) => {
  error_handler(err)
})

/* WARNING EVENT */
Bot.on("warn", (warn) => {
  console.warn(warn)
})
