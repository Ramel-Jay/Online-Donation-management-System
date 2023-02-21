const express = require('express');
const router = express.Router();
const { InKind, sequelize } = require('../models');
const { validateToken } = require("../middleware/JWT");

//Post Donate InKind
router.post("/", async(req, res) => {
    try{
    const inkind = req.body;
    await InKind.create(inkind);

    res.json(inkind);
    }catch{
        res.json("Duplicate Entry")
    }
});

router.get("/", validateToken,async (req, res) => {
    const listOfInKindPost = await InKind.findAll({
        where: sequelize.where(sequelize.fn('YEAR', sequelize.col('createdAt')), new Date().getFullYear())
    });
    res.json(listOfInKindPost);
});

router.get("/byId/:id", validateToken,async (req, res) => {
    const id = req.params.id;
    const inKindPost = await InKind.findByPk(id);
    res.json(inKindPost);
});

router.put("/approverequest", validateToken,async (req, res) => {
    const username = req.user.username;
    const { request = 1, id } = req.body;
    await InKind.update({request: request, username: username}, {where: {id: id}});
    res.json(request);
});

router.put("/disapproverequest", validateToken,async (req, res) => {
    const username = req.user.username;
    const { request = 0, id } = req.body;
    await InKind.update({request: request, username: username}, {where: {id: id}});
    res.json(request);
});

module.exports = router;