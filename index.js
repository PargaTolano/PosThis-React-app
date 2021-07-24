const path    = require('path');
const express = require('express');
const app     = express();

app.use( express.static( path.join(__dirname, 'public')));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.get('*', (req, res) => {
    res.redirect('/');
});

const port = process.env.PORT || 3001;
app.listen( port, () => {
    console.log(`posthis-node app mounted on port ${port}`);
});