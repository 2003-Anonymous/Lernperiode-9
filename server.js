const express = require("express");
const mongoose = require("mongoose");
const User = require("./models/User");
const swaggerUi = require("swagger-ui-express");
const swaggerJsdoc = require("swagger-jsdoc");

const app = express();
app.use(express.json());

const userRoutes = require("./routes/userRoutes");
app.use("/users", userRoutes);



const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Meine API",
      version: "1.0.0",
      description: "Dokumentation meiner Node.js API"
    },
    servers: [
      {
        url: "http://localhost:3000"
      }
    ]
  },
  apis: ["./routes/*"],
};

const specs = swaggerJsdoc(options);

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(specs));

mongoose.connect("mongodb://127.0.0.1:27017/myDB")
  .then(() => console.log("MongoDB verbunden"))
  .catch(err => console.error(err));

app.use(express.json());


app.use(express.json());

//MAIN
app.get("/", (req, res) => {
    res.send("Hello World!");
});


app.listen(3000, () => {
    console.log("Server läuft auf http://localhost:3000/api-docs");
});



