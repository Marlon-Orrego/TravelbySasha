
// Importar el framework
const express = require('express')

const { getDocuments, insertDocument, getDocumentById, deleteDocumentById, updateDocumentById } = require('../../controllers/MongoDb');
const Avion = require('../../models/Avion');

// Crear una instancia del router
const router = express.Router()

router.post('/aviones', async (req, res) => {
    try {
        const avionObject = req.body
        const avion = new Avion(avionObject)
        const responseDb = await insertDocument('SASHA', 'aviones', avion.initUser())
        res.send({
            ok: true,
            message: "Avion creado.",
            info: responseDb
        })
    } catch (error) {
        if (Object.keys(error).length > 0) {
            res.status(500).send(error)
        } else {
            res.status(500).send({
                ok: true,
                message: "Avion NO creado.",
                info: error.toString()
            })
        }
    }
})

router.get('/aviones', async (req, res) => {
    try {
        const responseDb = await getDocuments('SASHA', 'aviones')
        const avion = Avion.removePassword(responseDb)
        res.send({
            ok: true,
            message: "aviones consultados",
            info: avion
        })
    } catch (error) {
        const message = "Ha ocurrido un error en la consulta de aviones."
        res.status(500).send({
            ok: false,
            message,
            info: error.toString()
        })
    }
})

router.get('/aviones/:id', async (req, res) => {
    try {
        const id = req.params.id
        const responseDb = await getDocumentById('SASHA', 'aviones', id)
       delete responseDb.password
        res.send({
            ok: true,
            message: "Avion consultado",
            info: responseDb
        })
    } catch (error) {
        const message = "Ha ocurrido un error consultando el Avion."
        res.status(500).send({
            ok: false,
            message,
            info: error.toString()
        })
    }

})

router.put('/aviones/:id', async (req, res) => {
    try {
        const id = req.params.id
        const avionObject = req.body
        const avion = new Avion(avionObject)

        const responseDb = await updateDocumentById('SASHA', 'aviones', { id, data: avion.initUser() })
        if (responseDb.modifiedCount > 0) {
            return res.status(200).send({
                ok: true,
                message: "Avion actualizado.",
                info: avionObject
            })
        } else {
            res.status(404).send({
                ok: false,
                message: "El Avion no existe.",
                info: ""
            })
        }
    } catch (error) {
        const message = "Ha ocurrido un error modificando el Avion."
        res.status(500).send({
            ok: false,
            message,
            info: error.toString()
        })
    }
})

router.delete('/aviones/:id', async (req, res) => {
    try {
        const id = req.params.id
        const responseDb = await deleteDocumentById('SASHA', 'aviones', id)
        if (responseDb.deletedCount === 1) {
            res.status(200).send({
                ok: true,
                message: "Avion eliminado",
                info: ""
            })
        } else {
            res.status(404).send({
                ok: false,
                message: "El Avion no existe.",
                info: responseDb
            })
        }
    } catch (error) {
        const message = "Ha ocurrido un error eliminando el Avion."
        res.status(500).send({
            ok: false,
            message,
            info: error.toString()
        })
    }
})

module.exports = router
