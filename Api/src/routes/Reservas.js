const express = require("express");
const router = express.Router(); //manejador de rutas de express
const EmpleadoSchema = require("../models/Empleados");
const ReservaSchema = require("../models/Reservas");
const usuarioSchema = require("../models/usuario");

router.post("/Reservas", (req, res) => {
  console.log("entrando en reservas")
  const Reservas = ReservaSchema(req.body);
  const idUsuario = req.body.idUsuario
  Reservas
    .save()
    .then((data) => {
      usuarioSchema.updateOne(
        {_id: idUsuario},
        {$addToSet: {Reservas: data._id}}
      )
      .then((data) => res.json(data))
    })
    .catch((error) => res.json({ message: error }));
});
module.exports = router;
//consultar todos los carros
router.get("/Reservas", (req, res) => {
  ReservaSchema
    .find()
    .then((data) => res.json(data))
    .catch((error) => res.json({ message: error }));
});
//Consultar por id

router.get("/Reservas/:id", (req, res) => {
  //id = req.params.id;
  const { id } = req.params;
  ReservaSchema
    .findById(id)
    .then((data) => res.json(data))
    .catch((error) => res.json({ message: error }));
});

module.exports = router;