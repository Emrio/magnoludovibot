const Discord = require('discord.js')
const emrioutils = require('emrioutils')
const fs = require('fs')

module.exports = (Bot) => {

  fs.readFile("./assets/config.json", (err, data) => {

    var config = JSON.parse(data)
    Bot.login(config.token)

    return Bot

  })
}
