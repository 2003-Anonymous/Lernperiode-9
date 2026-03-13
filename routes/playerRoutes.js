const Counter = require("../models/Counter");
const express = require("express");
const router = express.Router();
const Player = require("../models/Player");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");


async function getNextSequence(name){
    const players = await Player.find({}, { playerId: 1 }).sort({ playerId: 1 });

    let id = 1;
    for (const player of players) {
        if(player.playerId !== id) break;
        id++;
    }
    return id;
}


/**
 * @swagger
 * /players:
 *   get:
 *     summary: Returns all players
 *     tags:
 *       - Player
 *     responses:
 *       200:
 *         description: List of all players.
 */
router.get("/", async (req, res) => {
    try {
        const players = await Player.find().sort({ playerId: 1 });
        res.json(players);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});


/**
 * @swagger
 * /players/{playerId}:
 *   get:
 *     summary: Returns one player
 *     tags:
 *       - Player
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: playerId
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Player found.
 */
router.get("/:playerId", authenticateToken, async (req, res) => {
    try {
        const player = await Player.findOne({ playerId: req.params.playerId });

        if(!player){
            return res.status(404).json({ message: "Player nicht gefunden." });
        }

        res.json(player);
    } catch(err){
        res.status(500).json({ error: err.message });
    }
});


/**
 * @swagger
 * /players:
 *   post:
 *     summary: Creates a new Player
 *     tags:
 *       - Player
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               email:
 *                 type: string
 *               age:
 *                 type: integer
 *               money:
 *                 type: number
 *             required:
 *               - name
 *               - email
 *     responses:
 *       201:
 *         description: Player created
 */
router.post("/", async (req, res) => {
    try{
        const newId = await getNextSequence("playerId");

        const player = new Player({
            playerId: newId,
            name: req.body.name,
            email: req.body.email,
            age: req.body.age,
            money: req.body.money
        });

        await player.save();
        res.status(201).json(player);

    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});


/**
 * @swagger
 * /players/{playerId}:
 *   put:
 *     summary: Updates a player
 *     tags:
 *       - Player
 *     parameters:
 *       - in: path
 *         name: playerId
 *         required: true
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               email:
 *                 type: string
 *               age:
 *                 type: integer
 *               money:
 *                 type: number
 *     responses:
 *       200:
 *         description: player updated
 */
router.put("/:playerId", async (req, res) => {
    try{
        const updatedPlayer = await Player.findOneAndUpdate(
            { playerId: req.params.playerId },
            req.body,
            { new: true }
        );

        res.json(updatedPlayer);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});



/**
 * @swagger
 * /players/{playerId}:
 *   delete:
 *     summary: Deletes one player
 *     tags:
 *       - Player
 *     parameters:
 *       - in: path
 *         name: playerId
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Player deleted
 */
router.delete("/:playerId", async (req, res) => {
    try {
        await User.findOneAndDelete({ playerId: req.params.playerId });
        res.json({ message: "Player deleted" });

    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});



function authenticateToken(req, res, next){
    const authHeader = req.headers("authorization");

    const token = authHeader && authHeader.split(" ")[1];

    if(!token){
        return res.sendStatus(401);
    }

    jwt.veryfy(token, SECRET, (err, user) => {
        if(err){
            return res.sendStatus(403);
        }

        req.user = user;
        next();
    });
}

module.exports = router;