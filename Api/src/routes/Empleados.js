const express = require("express");
const router = express.Router(); //manejador de rutas de express
const EmpleadoSchema = require("../models/Empleados");

router.post("/Empleados", (req, res) => {
  const Empleados = EmpleadoSchema(req.body);
  Empleados
    .save()
    .then((data) => res.json(data))
    .catch((error) => res.json({ message: error }));
});
module.exports = router;
//consultar todos los carros
router.get("/Empleados", (req, res) => {
  EmpleadoSchema
    .find()
    .then((data) => res.json(data))
    .catch((error) => res.json({ message: error }));
});
//Consultar por id

router.get("/Empleados/:id", (req, res) => {
  //id = req.params.id;
  const { id } = req.params;
  EmpleadoSchema
    .findById(id)
    .then((data) => res.json(data))
    .catch((error) => res.json({ message: error }));
});

router.put("/Empleados/:id", (req, res) => {
  const { id } = req.params;
  const { NumeroEmpleado, Nombres, Apellidos, Identificacion, fechaContratacion,Dependencia,Estado } = req.body;
  EmpleadoSchema
    .updateOne(
      { _id: id },
      {
        $set: { NumeroEmpleado, Nombres, Apellidos, Identificacion, fechaContratacion,Dependencia,Estado},
      }
    )
    .then((data) => res.json(data))
    .catch((error) => res.json({ message: error }));
});

router.delete("/Empleados/:id", (req, res) => {
  const { id } = req.params;
  const { Estado } = req.body;
 
  EmpleadoSchema
  .updateOne(
    { _id: id },
    {
      $set: {Estado},
    }
  )
  .then((data) => res.json(data))
  .catch((error) => res.json({ message: error }));
});

module.exports = router;