const cfg = require('./config.json')

module.exports = (Bot) => {
  Bot.login(cfg.token)
  return Bot
}
