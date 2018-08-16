const fs = require('fs')
const path = require('path')

class Options {

  constructor() {

    // Generating the settings file path
    this.path = path.join(__dirname, "..", "options.json")

    // Get the settings if the file already exists or create a new file
    try {
      this.data = JSON.parse(fs.readFileSync(this.path))
    } catch (e) {
      this.data = {}
      fs.writeFileSync(this.path, JSON.stringify(this.data))
    }
  }

  get(key) {
    return this.data[key]
  }

  set(key, value) {
    var keys = key.split(".")

    switch(keys.length) {
      case 1:
        this.data[key] = value
        break
      case 2:
        this.data[keys[0]][keys[1]] = value
        break
      case 3:
        this.data[keys[0]][keys[1]][keys[2]] = value
        break
      default:
        throw "Can't set a value to a fourth level object key !"
    }

    fs.writeFileSync(this.path, JSON.stringify(this.data))
  }
}

// Exporting Settings class
module.exports = Options
