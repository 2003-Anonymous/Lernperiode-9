const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const User = require("../models/User");

const app = express();
app.use(express.json());

const SECRET = "secretKey";

const user = {
    id: 1,
    username: "joshua",
    password: bcrypt.hashSync("123", 10)
};

/**
 * @swagger
 * /login:
 *   post:
 *     summary: Get Token
 *     tags:
 *       - Authentication
 *     responses:
 *       200:
 *         description: Successful
 */
router.post("/login", async (req, res) => {
    
    try {
        const { username, password } = req.body;

        const user = await User.findOne({ username });

        if (!user) {
            return res.status(401).json({ message: "User not found" });
        }

        const validPassword = await bcrypt.compare(password, user.password);

        if (!validPassword) {
            return res.status(401).json({ message: "Wrong password" });
        }

        const token = jwt.sign(
            { id: user._id, username: user.username },
            SECRET,
            { expiresIn: "1h" }
        );

        res.json({ token });

    } catch (err) {
        res.status(500).json({ error: err.message });
    }
})


/**
 * @swagger
 * /register:
 *   post:
 *     summary: Creates a new User
 *     tags:
 *       - Authentication
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *               password:
 *                 type: string
 *             required:
 *               - username
 *               - password
 *     responses:
 *       201:
 *         description: User created 
 */
router.post("/register", async (req, res) => {
    try {
        const { username, password } = req.body;

        const existigUser = await User.findOne({ username });

        if (existigUser) {
            return res.status(400).json({ message: "User already exists"});
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const user = new User({
            username,
            password: hashedPassword
        });

        await user.save();

        res.status(201).json({ message: "User created" });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;