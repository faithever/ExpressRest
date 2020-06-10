const express = require('express');
const path = require('path');
const app = express();
const logger = require('./logger.js');

//this is for parsing body in http [
app.use(express.json());
app.use(express.urlencoded({extended: false}));
//this is for parsing body in http ]

app.use(express.static(path.join(__dirname, 'public')));
app.use(logger);

app.get('/', function(req, res){
         console.log("get Index.html");
         res.sendFile.call(res, 'index.html', 
               {root:__dirname + "/public"}, 
               (err) => {
                  if (err != undefined)
                     console.log("Error is ", err);
               });
      });


// routing for members 
/*app.get('/api/members', (req, res) => {
         res.json(members);
      });
      */
app.use('/api/members', require('./routes/api/members'));

//Listening .....
const PORT = 8888;

app.listen(PORT, function(){
         console.log("Starting listening port: ", PORT);
      });


