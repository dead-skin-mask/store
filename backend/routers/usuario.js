//variable express
let express = require("express");
//importamos el controlador de usuario 
let Usuario = require("../controllers/usuario")
//creamos la api
let api = express.Router();
//servicio POST (registrar) http://Localhost:3001/api/registarUsuario
api.post("/registrarUsuario", Usuario.registrarUsuario)
//servicio para el login
api.post("/login", Usuario.login);
//Exportamos modulo
module.exports = api

