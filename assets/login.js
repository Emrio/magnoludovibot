const Discord = require('discord.js')
const emrioutils = require('emrioutils')
const path = require('path')
const fs = require('fs')
const cfg = require("./config.json")

module.exports = (Bot) => {

  Bot.login(cfg.token)

  return Bot
}
