const express = require("express");
const app = express();

app.get("/", function(req, res) {
    return res.send("Hello World");
});

// Seulement démarrer le serveur si le fichier est exécuté directement
if (require.main === module) {
    app.listen(3000, function(){
        console.log('Listening on port 3000');
    });
}

module.exports = app;