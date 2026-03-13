const express = require("express");
const mongoose = require("mongoose");
const User = require("./models/Player");
const swaggerUi = require("swagger-ui-express");
const swaggerJsdoc = require("swagger-jsdoc");
const swaggerSpec = require("./swagger")

const app = express();
app.use(express.json());

const userRoutes = require("./routes/playerRoutes");
app.use("/players", userRoutes);

const authRoutes = require("./routes/JWTroutes");
app.use("/auth", authRoutes);


app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

mongoose.connect("mongodb://127.0.0.1:27017/myDB")
  .then(() => console.log("MongoDB verbunden"))
  .catch(err => console.error(err));


//MAIN
app.get("/", (req, res) => {
    res.send("Hello World!");
});


app.listen(3000, () => {
    console.log("Server läuft auf http://localhost:3000/api-docs");
});



