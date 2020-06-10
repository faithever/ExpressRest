
const express = require('express');
const members = require('../../Members');
const uuid = require('uuid');

const router = express.Router();

router.get('/', function(req, res, next){
         res.json(members);
         next();
      });

router.get('/:id', function(req, res, next){
         //search with ID
         console.log(" get id is ", parseInt(req.params.id));

         if (Number.isNaN(parseInt(req.params.id))) //ymlee:needs debugging
         {
            console.log("The input is NaN");
            next();
            return;
         }
         res.json(members.filter(member => member.id === parseInt(req.params.id)));
         console.log("id is end");
         next();
      });

router.get('/:name', function(req, res, next){
         //search with ID
         console.log(" get name is ", req.params.name);
         /* this code is also ok
         members.forEach(function(member){
            console.log(" ===== member name is: ", member.name);
            if (member.name === req.params.name)
            {
               console.log(" ===== get name is: ", req.params.name);
               res.json(member);
            }
         });
         */
         res.json(members.filter(member => member.name === req.params.name));
      });

//Update Member
router.put('/:id', function(req, res){
         const found = members.some(member => member.id === parseInt(req.params.id));

         if (found) {
            members.forEach(member => {
               if (member.id === parseInt(req.params.id))
               {
                  member.name = req.body.name;
                  member.email = req.body.email;
               }
            });
            res.json(members);
         }else{
            res.status(400).json({msg:`No member with the id of ${req.paramsid}`});
         }
      });

//Create Member
router.post('/', function(req, res){
         console.log("body ", req.body);
         const member = {
            'id': uuid.v4(),
            'name': req.body.name,
            'email': req.body.email
         };

         members.push(member);
         res.json(members);
      });

module.exports = router;
