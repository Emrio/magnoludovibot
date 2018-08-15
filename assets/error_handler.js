module.exports = (err) => {

  if (err.message == 'read ECONNRESET') {
    console.error("⚠️ [Bot] (👀) La connection a été interrompu. Tentative de reconnection...")
  }
  else {
    console.error("⚠️ [Bot] Une erreur non reconnue s'est produite. Voici le rapport d'erreur: ")
    console.error(err)
  }

}
