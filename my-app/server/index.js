const express = require('express')
const app = express()
const port = 4000
var client=require('./config.js');
app.get('/get/users', (req, res) =>{
    client.get('followers/list',{screen_name: 'gokulAmber'}, function(error, tweets, response) {
        if(error) {
            console.log(error);
            throw error;
        }
        res.send(tweets);
        
      });
});


app.listen(port, () => console.log(`Example app listening on port ${port}!`))