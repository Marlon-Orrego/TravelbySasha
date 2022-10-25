const express = require('express');
const { compareHash } = require('../../controllers/bcrypt');
const { getDocumentsWithFilter } = require('../..//controllers/MongoDb');

const router = express.Router()




router.post("/login", async (req, res) => {

    try {
        const credentials = req.body
        const contraseña = credentials.contraseña
        let user = await getDocumentsWithFilter("sasha", "usuarios", { correo: credentials.correo })
        
        if (user.length == 1) {
            user = user[0] 
            const contraseñaIsEqual = compareHash(contraseña, user.contraseña)
            delete user.contraseña
            if (contraseñaIsEqual===true) {
                res.send({
                    ok: true,
                    message: "0",
                    info: user
                })
            } else {
                res.status(400).send({
                    ok: true,
                    message: "1",
                    info:{}
                })
            }
        }else{
            res.status(400).send({
                ok: true,
                message: "1",
                info: {}
            })
        }

    } catch (error) {
        res.status(500).send({
            ok: true,
            message: "2",
            info: error.toString()
        })
    }





})



module.exports = router