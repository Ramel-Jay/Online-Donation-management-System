const express = require('express');
const router = express.Router();
const { Cash, sequelize } = require('../models');
const { validateToken } = require("../middleware/JWT");

//Post Donate Cash
router.post("/",  async(req, res) => {
    try{
        const cash = req.body;
        await Cash.create(cash);

        res.json(cash);
    }catch{
        res.json("Duplicate Entry");
    }
});

router.get("/",validateToken ,async (req, res) => {
    const listOfPost = await Cash.findAll({
        where: sequelize.where(sequelize.fn('YEAR', sequelize.col('createdAt')), new Date().getFullYear())
    });

    res.json(listOfPost);
});

router.get("/byId/:id", async (req, res) => {
    const id = req.params.id;
    const post = await Cash.findByPk(id);
    res.json(post);
});


router.put("/approverequest",validateToken ,async (req, res) => {
    const username = req.user.username;
    const { request = 1, id } = req.body;
    await Cash.update({request: request, username: username}, {where: {id: id} });
    res.json(request);
});

router.put("/disapproverequest", validateToken,async (req, res) => {
    const username = req.user.username;
    const { request = 0, id } = req.body;
    await Cash.update({request: request, username: username}, {where: {id: id} });
    res.json(request);
});


module.exports = router;