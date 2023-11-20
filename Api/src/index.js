const parser = require("body-parser");
const express = require('express');
const app = express();
const port = 3000;
const EmpleadosRoutes = require("./routes/Empleados");
const ReservaRoutes = require("./routes/Reservas");
const Authentication = require("./routes/authentication");
const EspaciosRoutes = require("./routes/Espacios");

const mongoose = require("mongoose");
require('dotenv').config();
app.use(parser.urlencoded({ extended: false })); //permite leer los datos que vienen en la petición
app.use(parser.json()); // transforma los datos a formato JSON
//Gestión de las rutas usando el middleware
app.use("/api", EmpleadosRoutes);
app.use("/api", ReservaRoutes);
app.use("/api", Authentication);
app.use("/api", EspaciosRoutes);
app.use(express.json());
//Conexión a la base de datos
mongoose
    .connect(process.env.MONGODB_URI)
    .then(() => console.log("Conexión exitosa"))
    .catch((error) => console.log(error));
//Conexión al puerto
app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
});
