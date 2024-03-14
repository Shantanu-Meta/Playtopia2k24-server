const express = require('express');
const router = express.Router(); 
const bodyParser = require('body-parser');
router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: true }));
const CentralRegisters = require('../models/central');

router.get("/getplayers", async (req, res) => {
    try{  
        const ids = await CentralRegisters.distinct("userId");
            let allUsers = []; 
            for await(let id of ids){
                const allEventsByThisId = await CentralRegisters.find({"userId":id}); 
                let allEvents =[] ; 
                let teams =[] ; 
                let teamName = null
                allEventsByThisId.forEach(ele =>{
                    allEvents.push(ele.event); 
                    if(ele.teamName!==undefined && teams.length<=0){
                        const p1 = {
                            player:ele.teamMate?.player1, 
                            name:ele.teamMate?.name1
                        }
                        const p2 = {
                            player:ele.teamMate?.player2, 
                            name:ele.teamMate?.name2
                        }
                        const p3 = {
                            player:ele.teamMate?.player3, 
                            name:ele.teamMate?.name3
                        }
                        const p4 = {
                            player:ele.teamMate?.player4, 
                            name:ele.teamMate?.name4
                        }
                        const p5 = {
                            player:ele.teamMate?.player5, 
                            name:ele.teamMate?.name5
                        }
                        teams = [p1,p2,p3,p4,p5]; 
                        teamName = ele.teamName
                    }
                })

                const data = {
                    name:allEventsByThisId[0].name,
                    email:allEventsByThisId[0].email,
                    allEvents,
                    teamName,
                    teams,
                }
                
                allUsers.push(data);
            }

        res.send({success:"true", data:allUsers})
    }catch(err){
        res.send({success:"false", data:err}); 
    }
})

router.delete("/deleteplayers", async (req, res) => {
    try{
        const data = await CentralRegisters.deleteMany({"email": req.body.email}); 
        res.send({success:"true", data:data})
    }catch(err){
        res.send({success:"false", data:err}); 
    }
})

module.exports = router; 
