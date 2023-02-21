const express = require('express');
const router = express.Router();
const { validateToken } = require("../middleware/JWT.js")

router.get("/", validateToken, (req, res) =>{ 
    username = req.user.username
    res.json({ username });
})
    // username = req.user.username
    // image = req.user.image
    // res.json({ username, image });

module.exports = router;