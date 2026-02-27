const Counter = require("../models/Counter");
const express = require("express");
const router = express.Router();
const User = require("../models/User");

async function getNextSequence(name){
    const users = await User.find({}, { userId: 1 }).sort({ userId: 1 });

    let id = 1;
    for (const user of users) {
        if(user.userId !== id) break;
        id++;
    }
    return id;
}


/**
 * @swagger
 * /users:
 *   get:
 *     summary: Returns all users
 *     tags:
 *       - User
 *     responses:
 *       200:
 *         description: List of all users.
 */
router.get("/", async (req, res) => {
    try {
        const users = await User.find().sort({ userId: 1 });
        res.json(users);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});


/**
 * @swagger
 * /users/{userId}:
 *   get:
 *     summary: Returns one user
 *     tags:
 *       - User
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: User found.
 */
router.get("/:userId", async (req, res) => {
    try {
        const user = await User.findOne({ userId: req.params.userId });

        if(!user){
            return res.status(404).json({ message: "User nicht gefunden." });
        }

        res.json(user);
    } catch(err){
        res.status(500).json({ error: err.message });
    }
});


/**
 * @swagger
 * /users:
 *   post:
 *     summary: Creates a new User
 *     tags:
 *       - User
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
 *         description: User created
 */
router.post("/", async (req, res) => {
    try{
        const newId = await getNextSequence("userId");

        const user = new User({
            userId: newId,
            name: req.body.name,
            email: req.body.email,
            age: req.body.age,
            money: req.body.money
        });

        await user.save();
        res.status(201).json(user);

    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});


/**
 * @swagger
 * /users/{userId}:
 *   put:
 *     summary: Updates a user
 *     tags:
 *       - User
 *     parameters:
 *       - in: path
 *         name: userId
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
 *         description: User updated
 */
router.put("/:userId", async (req, res) => {
    try{
        const updatedUser = await User.findOneAndUpdate(
            { userId: req.params.userId },
            req.body,
            { new: true }
        );

        res.json(updatedUser);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});



/**
 * @swagger
 * /users/{userId}:
 *   delete:
 *     summary: Deletes one user
 *     tags:
 *       - User
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: User deleted
 */
router.delete("/:userId", async (req, res) => {
    try {
        await User.findOneAndDelete({ userId: req.params.userId });
        res.json({ message: "User gelöscht" });

    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;