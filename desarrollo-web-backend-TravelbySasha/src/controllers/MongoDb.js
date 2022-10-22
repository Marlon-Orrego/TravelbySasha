
const { MongoClient, ObjectId } = require('mongodb')

// const URI = "mongodb+srv://USER:PASSWORD@HOST"
//const uri = "mongodb+srv://saurmo-udem:9nVhp5fsbdKQRBLf@clusterudem.3l9e6.mongodb.net/?retryWrites=true&w=majority";
// HOST: clusterudem.3l9e6.mongodb.net
// USER: saurmo-udem
// PASSWORD: 9nVhp5fsbdKQRBLf
// DATABASE: SASHA


//Vuelo-Marlon
const getVuelos = async (dbName, collectionName) => {
    const mongoClient = new MongoClient(uri)
    const db = mongoClient.db(dbName)
    const collection = db.collection(collectionName)
    const result = await collection.find({}).toArray();
    return result
}

const getVuelobyId= async (dbName, collectionName, id) => {
    const idMongo = new ObjectId(id)
    const mongoClient = new MongoClient(uri)
    const db = mongoClient.db(dbName)
    const collection = db.collection(collectionName)
    const result = await collection.findOne({ _id: idMongo });
    return result
}

const insertVuelo = async (dbName, collectionName, data) => {
    const mongoClient = new MongoClient(uri)
    const db = mongoClient.db(dbName)
    const collection = db.collection(collectionName)
    const result = await collection.insertOne(data);
    return result
}

const updateVueloById = async (dbName, collectionName, { id, data }) => {
    const mongoClient = new MongoClient(uri)
    const idMongo = new ObjectId(id)
    const db = mongoClient.db(dbName)
    const collection = db.collection(collectionName)
    delete data._id
    const result = await collection.replaceOne({ _id: idMongo }, data);
    return result
}

const deleteVueloById = async (dbName, collectionName, id) => {
    const idMongo = new ObjectId(id)
    const mongoClient = new MongoClient(uri)
    const db = mongoClient.db(dbName)
    const collection = db.collection(collectionName)
    const result = await collection.deleteOne({ _id: idMongo });
    return result
}

module.exports = {getVuelos,getVuelobyId,insertVuelo,updateVueloById,deleteVueloById}


//Bandido Reservas
const getReservas = async (dbName, collectionName) => {
    const mongoClient = new MongoClient(uri)
    const db = mongoClient.db(dbName)
    const collection = db.collection(collectionName)
    const result = await collection.find({}).toArray();
    return result
}

const getReservabyId= async (dbName, collectionName, id) => {
    const idMongo = new ObjectId(id)
    const mongoClient = new MongoClient(uri)
    const db = mongoClient.db(dbName)
    const collection = db.collection(collectionName)
    const result = await collection.findOne({ _id: idMongo });
    return result
}

const insertReserva = async (dbName, collectionName, data) => {
    const mongoClient = new MongoClient(uri)
    const db = mongoClient.db(dbName)
    const collection = db.collection(collectionName)
    const result = await collection.insertOne(data);
    return result
}

const updateReservaById = async (dbName, collectionName, { id, data }) => {
    const mongoClient = new MongoClient(uri)
    const idMongo = new ObjectId(id)
    const db = mongoClient.db(dbName)
    const collection = db.collection(collectionName)
    delete data._id
    const result = await collection.replaceOne({ _id: idMongo }, data);
    return result
}

const deleteReservaById = async (dbName, collectionName, id) => {
    const idMongo = new ObjectId(id)
    const mongoClient = new MongoClient(uri)
    const db = mongoClient.db(dbName)
    const collection = db.collection(collectionName)
    const result = await collection.deleteOne({ _id: idMongo });
    return result
}

module.exports = {getReservas,getReservabyId,insertReserva,updateReservaById,deleteReservaById}


//Usuarios Emanuel

const getUsuarios = async (dbName, collectionName) => {
    const mongoClient = new MongoClient(uri)
    const db = mongoClient.db(dbName)
    const collection = db.collection(collectionName)
    const result = await collection.find({}).toArray();
    return result
}

const getUsuariobyId= async (dbName, collectionName, id) => {
    const idMongo = new ObjectId(id)
    const mongoClient = new MongoClient(uri)
    const db = mongoClient.db(dbName)
    const collection = db.collection(collectionName)
    const result = await collection.findOne({ _id: idMongo });
    return result
}

const insertUsuario = async (dbName, collectionName, data) => {
    const mongoClient = new MongoClient(uri)
    const db = mongoClient.db(dbName)
    const collection = db.collection(collectionName)
    const result = await collection.insertOne(data);
    return result
}

const updateUsuarioById = async (dbName, collectionName, { id, data }) => {
    const mongoClient = new MongoClient(uri)
    const idMongo = new ObjectId(id)
    const db = mongoClient.db(dbName)
    const collection = db.collection(collectionName)
    delete data._id
    const result = await collection.replaceOne({ _id: idMongo }, data);
    return result
}

const deleteUsuarioById = async (dbName, collectionName, id) => {
    const idMongo = new ObjectId(id)
    const mongoClient = new MongoClient(uri)
    const db = mongoClient.db(dbName)
    const collection = db.collection(collectionName)
    const result = await collection.deleteOne({ _id: idMongo });
    return result
}

module.exports = {getUsuarios,getUsuariobyId,insertUsuario,updateUsuarioById,deleteUsuarioById}

//Luna

const getAviones = async (dbName, collectionName) => {
    const mongoClient = new MongoClient(uri)
    const db = mongoClient.db(dbName)
    const collection = db.collection(collectionName)
    const result = await collection.find({}).toArray();
    return result
}

const getAvionbyId= async (dbName, collectionName, id) => {
    const idMongo = new ObjectId(id)
    const mongoClient = new MongoClient(uri)
    const db = mongoClient.db(dbName)
    const collection = db.collection(collectionName)
    const result = await collection.findOne({ _id: idMongo });
    return result
}

const insertAvion = async (dbName, collectionName, data) => {
    const mongoClient = new MongoClient(uri)
    const db = mongoClient.db(dbName)
    const collection = db.collection(collectionName)
    const result = await collection.insertOne(data);
    return result
}

const updateAvionById = async (dbName, collectionName, { id, data }) => {
    const mongoClient = new MongoClient(uri)
    const idMongo = new ObjectId(id)
    const db = mongoClient.db(dbName)
    const collection = db.collection(collectionName)
    delete data._id
    const result = await collection.replaceOne({ _id: idMongo }, data);
    return result
}

const deleteAvionById = async (dbName, collectionName, id) => {
    const idMongo = new ObjectId(id)
    const mongoClient = new MongoClient(uri)
    const db = mongoClient.db(dbName)
    const collection = db.collection(collectionName)
    const result = await collection.deleteOne({ _id: idMongo });
    return result
}

module.exports = {getAviones,getAvionbyId,insertAvion,updateAvionById,deleteAvionById}