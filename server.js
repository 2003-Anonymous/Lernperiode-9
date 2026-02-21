const express = require("express");
const app = express();

app.use(express.json());


app.get("/", (req, res) => {
    res.send("Hello World!");
});


app.get("/player", (req, res) => {
    res.json({
        name: "Joshua",
        level: 5,
        gold: 120
    });
});


app.post("/addgold", (req, res) => {
    const amount = req.body.amount;

    res.json({
        message: `Du hast ${amount} Gold erhalten 💰`
    });
});

app.listen(3000, () => {
    console.log("Server läuft auf http://localhost:3000");
});