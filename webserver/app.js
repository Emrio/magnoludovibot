const express = require('express')
const PORT = process.env.PORT || 8080
const app = express()

app.get('/', (req, res) => {
  res.send('magnoludovibot is running.')
})

app.listen(PORT, () => {
  console.log('Listening on port ' + PORT)
})

module.exports = app
