const path    = require("path");
const express = require("express");
const app     = express();

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, "public", "index.html"));
});

app.get('*', (req, res) => {
    res.redirect('/');
});

app.listen( process.env.PORT || 3000, () => {
  console.log("server started on port 5000");
});