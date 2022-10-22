
// Importar el framework
const express = require('express')

// Importar lib de cors 
const cors = require('cors');

// Crear una instancia 
const app = express()

//Importar los archivos
const routerAviones=require("./src/routers/aviones/aviones.router")
const routerReservas=require("./src/routers/reservas/reservas.router")
const routerUsuarios=require("./src/routers/usuarios/usuarios.router")
const routerVuelos=require("./src/routers/vuelos/vuelos.router")


// USAR CORS 
app.use(cors())


// USAR JSON EN EL BODY
app.use(express.json())

// DEFINICION Y USO DE ENDPOINSTS
app.use(routerAviones)
app.use(routerReservas)
app.use(routerUsuarios)
app.use(routerVuelos) 


const PORT = 8000
app.listen(PORT, () => {
    console.log(`Ejecución del API: http://localhost:${PORT}`)
})
