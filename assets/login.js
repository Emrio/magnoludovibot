const Discord = require('discord.js')
const emrioutils = require('emrioutils')
const path = require('path')
const fs = require('fs')

module.exports = (Bot) => {

  fs.readFile(path.join(__dirname, 'config.json'), (err, data) => {
    var config = JSON.parse(data)
    Bot.login(config.token)

    return Bot

  })
}
