const Discord = require('discord.js')
const emrioutils = require('emrioutils')
const fs = require('fs')
const login = require("./assets/login")

// The Bot Object
const Bot = new Discord.Client()

// Logs the bot in discord
login(Bot)





/* BOT READY EVENT */
Bot.on("ready", () => {
  console.log("Connecté!")
})

/* ERROR EVENT */
Bot.on("error", (err) => {
  console.error(err);
})

/* WARNING EVENT */
Bot.on("warn", (warn) => {
  console.warn(warn);
})
