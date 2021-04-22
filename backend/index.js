//Variables de modulos
let express = require("express");
let bodyParser = require("body-parser");
let mongoose = require("mongoose");
const { res } = require("express");
//Variable para puerto de conexion del servidor 
let port = process.env.port ||3001;
//variable de la aplicacion
let app = express();
//routes
let Usuario = require("./routers/usuario");
//Conexion a DB
mongoose.connect("mongodb://localhost:27017/bitstroredb",{useUnifiedTopology: true, useNewUrlParser: true},(err, res) => {
    if (err) {
        console.log(err);
        throw err;
    } else {
        console.log("servidor db ON")
        app.listen(port, function () {
            console.log("servidor backend funcionando en el puerto:" + port)
        });
    }
});
//Analizar las URL
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json())
//usar las rutas (API)
app.use("/api", Usuario)
//Creamos modulo para importar 
module.exports = app