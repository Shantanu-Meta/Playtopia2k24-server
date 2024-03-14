const express = require('express');
const router = express.Router(); 
const bodyParser = require('body-parser');
router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: true }));
const fetchUser = require('../middleware/fetchUser')
const User = require('../models/User');
const CentralRegisters = require('../models/central');

const ballPoolRegisters = require('../models/8_ball_pool');
const valorantRegisters = require('../models/valorant');
const bgmiRegisters = require('../models/Bgmi');
const bshackathonRegisters = require('../models/Bshackathon');
const openmicRegisters = require('../models/Openmic');
const treasurehuntRegisters = require('../models/TreasureHunt');

router.post("/register", fetchUser, async (req, res) =>{
    try{
        const {event, teamMate} = req.body; 
        const user = await User.findById(req.user.id).select("-password"); 

        const p1 = await User.findById(teamMate?.id1).select("-password"); 
        const p2 = await User.findById(teamMate?.id2).select("-password"); 
        const p3 = await User.findById(teamMate?.id3).select("-password"); 
        const p4 = await User.findById(teamMate?.id4).select("-password"); 
        const p5 = await User.findById(teamMate?.id5).select("-password"); 

        switch (event){
            case "8_ball_pool":
                const newBallPlayer = {
                    userId: req.user.id, 
                    name:user.name,
                    email:user.email, 
                    phoneNo:req.body.phoneNo,
                    playerInGameName:req.body.inGameName, 
                    playerInGameId:req.body.inGameId, 
                    event: event
                } 
                try{
                    await ballPoolRegisters.create(newBallPlayer); 
                }catch(e){
                    return res.send({success:"false", data:e})
                }
                CentralRegisters.create({
                    userId: req.user.id, 
                    name:user.name,
                    email:user.email, 
                    phoneNo:req.body.phoneNo,
                    event:event
                })
                return res.send({success:"true"})
                break; 

            case "bs_hackathon":
                const newHackathonPlayer = {
                    userId: req.user.id, 
                    name:user.name,
                    email:user.email, 
                    phoneNo:req.body.phoneNo, 
                    department:req.body.department,
                    startupName:req.body.startupName, 
                    startUpCategory:req.body.startUpCategory, 
                    event: event
                } 
                try{
                    await bshackathonRegisters.create(newHackathonPlayer); 

                }catch(e){
                    return res.send({success:"false", data:e})
                }
                CentralRegisters.create({
                    userId: req.user.id, 
                    name:user.name,
                    email:user.email, 
                    phoneNo:req.body.phoneNo,
                    event:event
                })
                return res.send({success:"true"})
                break; 

            case "open_mic":
                const newOpenMicPlayer = {
                    userId: req.user.id, 
                    name:user.name,
                    email:user.email, 
                    phoneNo:req.body.phoneNo, 
                    type:req.body.type,
                    perform:req.body.perform, 
                    title:req.body.title, 
                    desc:req.body.desc,
                    motivation:req.body.motivation,
                    event: event
                } 
                try{
                    await openmicRegisters.create(newOpenMicPlayer); 
                }catch(e){
                    return res.send({success:"false", data:e})
                }
                    CentralRegisters.create({
                        userId: req.user.id, 
                        name:user.name,
                        email:user.email, 
                        phoneNo:req.body.phoneNo,
                        event:event
                    })
                return res.send({success:"true"})
                break; 
            
            case "valorant":
                const newValoPlayer = {
                    userId: req.user.id, 
                    name:user.name,
                    email:user.email, 
                    phoneNo:req.body.phoneNo,
                    riotId:req.body.riotId, 
                    teamName:req.body.teamName,
                    teamMate:req.body.teamMate,
                    event: event
                } 
                try{
                    await valorantRegisters.create(newValoPlayer); 
                }catch(e){
                    console.log(e)
                    return res.send({success:"false", data:e})
                }
                CentralRegisters.create({
                    userId: req.user.id, 
                    name:user.name,
                    email:user.email, 
                    phoneNo:req.body.phoneNo,
                    teamName:req.body.teamName,
                    teamMate:{
                        id1:req.body.teamMate.id1,
                        Name1:p1.name,
                        player1:p1.email,
                        id2:req.body.teamMate.id2,
                        Name2:p2.name,
                        player2:p2.email,
                        id3:req.body.teamMate.id3,
                        Name3:p3.name,
                        player3:p3.email,
                        id4:req.body.teamMate.id4,
                        Name4:p4.name,
                        player4:p4.email,
                        id5:req.body.teamMate.id5,
                        Name5:p5.name,
                        player5:p5.email,
                    },
                    event:event
                })
                return res.send({success:"true"})
                break; 
            
            case "bgmi":
                const newBgmiPlayer = {
                    userId: req.user.id, 
                    name:user.name,
                    email:user.email, 
                    phoneNo:req.body.phoneNo,
                    gameId:req.body.gameId, 
                    teamName:req.body.teamName,
                    teamMate:req.body.teamMate,
                    event: event
                } 
                try{
                    await bgmiRegisters.create(newBgmiPlayer); 

                }catch(e){
                    return res.send({success:"false", data:e})
                }
                CentralRegisters.create({
                    userId: req.user.id, 
                    name:user.name,
                    email:user.email, 
                    phoneNo:req.body.phoneNo,
                    teamName:req.body.teamName,
                    teamMate:{
                        id1:req.body.teamMate.id1,
                        Name1:p1.name,
                        player1:p1.email,
                        id2:req.body.teamMate.id2,
                        Name2:p2.name,
                        player2:p2.email,
                        id3:req.body.teamMate.id3,
                        Name3:p3.name,
                        player3:p3.email,
                    },
                    event:event
                })
                return res.send({success:"true"})
                break; 
        
            case "treasure_hunt":
                const newtreasurePlayer = {
                    userId: req.user.id, 
                    name:user.name,
                    email:user.email, 
                    phoneNo:req.body.phoneNo,
                    teamName:req.body.teamName,
                    teamMate:req.body.teamMate,
                    event: event
                } 
                try{
                    await treasurehuntRegisters.create(newtreasurePlayer); 

                }catch(e){
                    return res.send({success:"false", data:e})
                }
                CentralRegisters.create({
                    userId: req.user.id, 
                    name:user.name,
                    email:user.email, 
                    phoneNo:req.body.phoneNo,
                    teamName:req.body.teamName,
                    teamMate:{
                        id1:req.body.teamMate.id1,
                        Name1:p1.name,
                        player1:p1.email,
                        id2:req.body.teamMate.id2,
                        Name2:p2.name,
                        player2:p2.email,
                        id3:req.body.teamMate.id3,
                        Name3:p3.name,
                        player3:p3.email,
                    },
                    event:event
                })
                return res.send({success:"true"})
                break; 

        }
    }catch(err){
        res.send({success:"false", data:err}); 
    }
})

router.get("/getgames", fetchUser, async (req, res) =>{
    try{
        const id = req.user.id; 
        let allGames = await CentralRegisters.find({$or: [{"userId":id}, {"teamMate.id1":id}, {"teamMate.id2":id}, {"teamMate.id3":id}, {"teamMate.id4":id}, {"teamMate.id5":id}]});

        res.send({success:"true", data:allGames}); 
    }catch(err){
        res.send({success:"false", data:err}); 
    }
})

module.exports = router; 
