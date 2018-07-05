const Discord = require('discord.js')
const emrioutils = require('emrioutils')
const fs = require('fs')

module.exports = (guild, level, number) => {

  //console.log(level);


  if(number !== "L") {
    var levelDiscriminator = level.name === "Secondes" ? "2nd-" : level.name === "Premières" ? "1S-" : "TS-"
    var Class = levelDiscriminator + number
  } else {
    var Class = level.name === "Premières" ? "1L" : "TL"

  }

  return guild.roles.find("name", Class)

}
