var express = require("express");
var rooms = require("./data/rooms.json");
var messages = require("./data/messages.json");
var _ = require("lodash");

var router = express.Router();
module.exports = router;

router.get("/rooms", function(req, res){
    res.json(rooms);
});

router.get("/rooms/:roomId/messages", function(req, res){
    var roomId = req.params.roomId;

    var roomMessages = messages
        .filter(m => m.roomId == roomId);

    var room = _.find(rooms, r => r.id === roomId);
    if (!room) {
        res.sendStatus(404);
        return;
    }

    res.json({
        room: room,
        messages: roomMessages
    })
});