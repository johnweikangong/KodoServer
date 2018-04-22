var express = require('express');
var ctrl = require('./user.controller');
var router = express.Router();

router.post('/add', ctrl.addUser);
router.post('/updateUser', ctrl.updateUser);
router.post('/updateUserChatBotMessages', ctrl.updateUserChatBotMessages);
router.get('/get', ctrl.getUser);

module.exports = router;
