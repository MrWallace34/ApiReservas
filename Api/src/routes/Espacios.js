const express = require("express");
const router = express.Router(); //manejador de rutas de express
const EspaciosSchema = require("../models/Espacios");

router.get("/Espacios", (req, res) => {
    EspaciosSchema
        .find()
        .then((data) => res.json(data))
        .catch((error) => res.json({ message: error }));
});

router.post("/Espacios", (req, res) => {
    const Espacios = EspaciosSchema(req.body);
    Espacios
        .save()
        .then((data) => res.json(data))
        .catch((error) => res.json({ message: error }));
});

router.get("/Espacios/:id", (req, res) => {
    //id = req.params.id;
    const { id } = req.params;
    EspaciosSchema
      .findById(id)
      .then((data) => res.json(data))
      .catch((error) => res.json({ message: error }));
  });

module.exports = router;