
// Importar el framework
const express = require('express')

const { getDocuments, insertDocument, getDocumentById, deleteDocumentById, updateDocumentById } = require('../../controllers/MongoDb');
const Reserva = require('../../models/Reserva');

// Crear una instancia del router
const router = express.Router()

router.post('/reservas', async (req, res) => {
    try {
        const reservaObject = req.body
        const reserva = new Reserva(reservaObject)
        const responseDb = await insertDocument('SASHA', 'reservas', reserva.initUser())
        res.send({
            ok: true,
            message: "Reserva creada.",
            info: responseDb
        })
    } catch (error) {
        if (Object.keys(error).length > 0) {
            res.status(500).send(error)
        } else {
            res.status(500).send({
                ok: true,
                message: "Reserva NO creada.",
                info: error.toString()
            })
        }
    }
})

router.get('/reservas', async (req, res) => {
    try {
        const responseDb = await getDocuments('SASHA', 'reservas')
        const reserva = Reserva.removePassword(responseDb)
        res.send({
            ok: true,
            message: "Reservas consultadas",
            info: reserva
        })
    } catch (error) {
        const message = "Ha ocurrido un error en la consulta de reservas."
        res.status(500).send({
            ok: false,
            message,
            info: error.toString()
        })
    }
})

router.get('/reservas/:id', async (req, res) => {
    try {
        const id = req.params.id
        const responseDb = await getDocumentById('SASHA', 'reservas', id)
       delete responseDb.password
        res.send({
            ok: true,
            message: "Reserva consultado",
            info: responseDb
        })
    } catch (error) {
        const message = "Ha ocurrido un error consultando el Reserva."
        res.status(500).send({
            ok: false,
            message,
            info: error.toString()
        })
    }

})

router.put('/reservas/:id', async (req, res) => {
    try {
        const id = req.params.id
        const userObject = req.body
        const user = new Reserva(userObject)

        const responseDb = await updateDocumentById('SASHA', 'reservas', { id, data: user.initUser() })
        if (responseDb.modifiedCount > 0) {
            return res.status(200).send({
                ok: true,
                message: "Reserva actualizada.",
                info: userObject
            })
        } else {
            res.status(404).send({
                ok: false,
                message: "El Reserva no existe.",
                info: ""
            })
        }
    } catch (error) {
        const message = "Ha ocurrido un error modificando el Reserva."
        res.status(500).send({
            ok: false,
            message,
            info: error.toString()
        })
    }
})

router.delete('/reservas/:id', async (req, res) => {
    try {
        const id = req.params.id
        const responseDb = await deleteDocumentById('SASHA', 'reservas', id)
        if (responseDb.deletedCount === 1) {
            res.status(200).send({
                ok: true,
                message: "Reserva eliminada",
                info: ""
            })
        } else {
            res.status(404).send({
                ok: false,
                message: "La Reserva no existe.",
                info: responseDb
            })
        }
    } catch (error) {
        const message = "Ha ocurrido un error eliminando la Reserva."
        res.status(500).send({
            ok: false,
            message,
            info: error.toString()
        })
    }
})

module.exports = router