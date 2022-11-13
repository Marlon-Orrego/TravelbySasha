const express = require("express");
const { compareHash } = require("../../controllers/bcrypt");
const { getDocumentsWithFilter } = require("../..//controllers/MongoDb");
const { createJsonWebToken } = require("../../controllers/jwt");

const router = express.Router();

router.post("/login", async (req, res) => {
  try {
    const credentials = req.body;
    const contraseña = credentials.contraseña;
    let user = await getDocumentsWithFilter("sasha", "usuarios", {
      correo: credentials.correo,
    });

    if (user.length == 1) {
      user = user[0];
      const contraseñaIsEqual = compareHash(contraseña, user.contraseña);
      delete user.contraseña;
      if (contraseñaIsEqual === true) {
        //generando token
        const token = createJsonWebToken(user);
        user.token = token;
        res.send({
          ok: true,
          message: "Usuario Consultado",
          info: user,
        });
      } else {
        res.status(400).send({
          ok: true,
          message: "Usuario y/o Contraseña Incorrecta",
          info: {},
        });
      }
    } else {
      res.status(400).send({
        ok: true,
        message: "Usuario y/o Contraseña Incorrecta",
        info: {},
      });
    }
  } catch (error) {
    res.status(500).send({
      ok: true,
      message: "Usuario NO consultado",
      info: error.toString(),
    });
  }
});

module.exports = router;
