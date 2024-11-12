const express = require('express');

const eventController = require('../controller/eventController');

const router = express.Router();

router.post('/getSoloEvents', eventController.getSoloEvents);
router.post('/saveSoloEvents', eventController.saveSoloEvents);
router.post('/getTeamEvents', eventController.getTeamEvents); 
router.post('/checkPid', eventController.checkPid); 

router.post('/saveTeam', eventController.saveTeam); 
router.post('/getInvitation', eventController.getInvitation); 

router.post('/delInvitation', eventController.delInvitation); 
router.post('/addVerifiedMember', eventController.addVerifiedMember); 

router.post('/individualParticipation', eventController.individualParticipation); 
router.post('/teamParticipation', eventController.teamParticipation); 
module.exports = router;
