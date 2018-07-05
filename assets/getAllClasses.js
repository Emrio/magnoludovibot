const Discord = require('discord.js')
const emrioutils = require('emrioutils')
const fs = require('fs')

module.exports = (guild) => {

  var roles = guild.roles.filter((role) => {
    return role.name.startsWith("2nd-") || role.name.startsWith("1S-") || role.name.startsWith("1L") || role.name.startsWith("TS-") || role.name.startsWith("TL")
  })
  //console.log(roles)
  return roles

}
