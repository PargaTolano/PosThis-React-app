const express = require('express');
const path = require('path');
const app = express();


app.use( express.static(path.join(__dirname, 'public')));

app.listen( process.env.PORT || 3000, ()=>{
    console.log('Aplicacion montada en el puerto 3000 soy una verga');
} );