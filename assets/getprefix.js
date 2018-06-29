const Discord = require('discord.js')
const emrioutils = require('emrioutils')
const fs = require('fs')

module.exports = () => {

  var config = JSON.parse(fs.readFileSync("./assets/config.json"))
  return config.prefix
}
