//Vaiable para importar el modulo usuario
let Usuario = require("../modelo/usuario");
//Variable para importar lqa libreria ecriptar pass
let bycript = require("bcrypt-nodejs");
//Funcion que registra un suario
const registrarUsuario = (req, res) => {
  //sacamos los parametros del bpdy del json (viene en la api)
  let params = req.body;
  //utlizamos el modelo usuario (pero limpio)
  let usuario = new Usuario();

//validamos el pass para encriptarlo
if (params.pass) {
  //usamos bycript para encriptar el pss
  bycript.hash(params.pass, null, null, function (err, hash) {
    //si se encripta la contraseña
    if (hash) {
      usuario.nombres = params.nombres;
      usuario.apellidos = params.apellidos;
      usuario.edad = params.edad;
      usuario.correo = params.correo;
      usuario.pass = hash;
      usuario.rol = params.rol;
      //enviamos el modelo para registrar en mongodb
      usuario.save((err, saveUsuario) => {
        if (err) {
          //Si hay un error
          res.status(500).send({ err: "No se registro el usuario" });
        } else {
          //si el proceso se completo
          res.status(200).send({ ususario: saveUsuario });
        }
      });
    } else {
      //Damos respuesta al error de encriptacion si lo hay
      res
        .status(405)
        .send({ err: "No se encripto el pass y no se registro el usuario" });
    }
  });
} else {
  //Validacion de datos del json
  res.status(405).send({ err: "No se guardo un dato" });

}
};
//LogIn
const login = (req, res) => {
  //variable para guardar parametros
  let params = req.body
  //Buscamos el ususario en DB
  Usuario.findOne({correo: params.correo}, (err, datosUsuario) => {
    if (err) {
      res.status(500).send({mensaje: "Error del servidor"})
    } else {
      if (datosUsuario) {
        bycript.compare(params.pass, datosUsuario.pass, function(err, confirm) {
          if (confirm) {
            if (params.getToken) {
              res.status(200).send({Usuario: datosUsuario})
            } else {
              res.status(200).send({Usuario: datosUsuario, mensaje: "Sin token"})
            }
          } else {
            res.status(401).send({mesaje: "Correo o pass incorrecto"})
          }
          
        });
      } else {
        res.status(401).send({mesaje: "Correo o pass incorrecto"})
      }
    }
  })
};
//Exportamos el modulo
module.exports = {
  registrarUsuario,
  login,
};
