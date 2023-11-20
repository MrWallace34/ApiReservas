const express = require("express");
const bcrypt = require("bcrypt");
const router = express.Router(); 
const userSchema = require("../models/usuario");
const jwt = require("jsonwebtoken");
const verifyToken = require("./validate_token");


router.post("/login", async (req, res) => {
  console.log('LOGIN***')

  const { error } = userSchema.validate(req.body.correo, req.body.clave);
  if (error) return res.status(400).json({ error: error.details[0].message });
  const user = await userSchema.findOne({ correo: req.body.correo });


  if (!user)
    return res.status(400).json({ error: "Usuario o clave incorrectos" });

  const validPassword = await bcrypt.compare(req.body.clave, user.clave);
  let accessToken = null;
  if (!validPassword) {
    return res.status(400).json({ error: "Usuario o clave incorrectos" });
  } else {
    const expiresIn = 24 * 60 * 60;
    accessToken = jwt.sign(
      { id: user.id }, 
      process.env.SECRET, {
      expiresIn: expiresIn
    });

    res.json({accessToken: accessToken,id: user.id});
  }
});
module.exports = router;
