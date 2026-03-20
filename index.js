const express = require("express");
const mongoose = require("mongoose");
const swaggerUi = require("swagger-ui-express")
const swaggerJsdoc  =require("swagger-jsdoc");
const swaggerSpec = require("./swagger");

const app = express();
app.use(express.json());

const playerRoutes = require("./routes/playerRoutes");
app.use("/player", playerRoutes);


app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));







app.get("/", (req, res) => {
    res.send("Hello World!");

});

app.get("/hello", (req, res) => {
    res.send("Hello second page!");
    
});


mongoose.connect("mongodb://127.0.0.1:27017/myNewDB")
    .then(() => {
        console.log("MongoDB connected");

        app.listen(4000, () => {
            console.log("Server läuft auf http://localhost:4000");
        });
    })
.catch(err => console.error(err));



