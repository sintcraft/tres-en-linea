const express = require('express')
const app = express()
app.use(express.static('./public'))


app.get('/', (req, res) => {
    res.sendFile('./public/index.html', {root:'./'})
})
app.listen(80, function() {
    console.log('Re direccion de discord enviada en el puerto 80');
  });