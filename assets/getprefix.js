const Discord = require('discord.js')
const emrioutils = require('emrioutils')
const path = require('path')
const fs = require('fs')

module.exports = () => {

  var config = JSON.parse(fs.readFileSync(path.join(__dirname, 'assets', 'config.json')))
  return config.prefix
}
