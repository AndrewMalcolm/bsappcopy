const express= require('express');
const path = require ('path');
const app = express();
app.use(express.static(__dirname + '/dist/BSappcopy'));
app.get('/*', function(req,res){
    res.sendFile(path.join(__dirname + '/dist/BSappcopy/index.html'))
});
console.log('console listening');
app.listen(process.env.PORT || 8080);
