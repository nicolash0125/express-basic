let jwt = require( 'jsonwebtoken' );
const secret = process.env.JWT_SECRET;
var [a,b,getUser, validate] = require('../controllers/users');
// Clase encargada de la creación del token
class HandlerGenerator {

    async login( req, res ) {
    
    // Extrae el usuario y la contraseña especificados en el cuerpo de la solicitud
    let username = req.body.username;
    let password = req.body.password;
    

    // Si se especifico un usuario y contraseña, proceda con la validación
    // de lo contrario, un mensaje de error es retornado
    if( username && password ) {
        const usuario = await getUser(username)
        console.log(usuario)
        validate(usuario, password).then((result)=>{
            console.log(result)
            // Si los usuarios y las contraseñas coinciden, proceda con la generación del token
            // de lo contrario, un mensaje de error es retornado
            if( result ) {
              
              // Se genera un nuevo token para el nombre de usuario el cuál expira en 24 horas
              let token = jwt.sign( { username: username },
                secret, { expiresIn: '24h' } );
              
              // Retorna el token el cuál debe ser usado durante las siguientes solicitudes
              res.json( {
                success: true,
                message: 'Authentication successful!',
                token: token
              } );
      
            } else {
              
              // El error 403 corresponde a Forbidden (Prohibido) de acuerdo al estándar HTTP
              req.
              res.send( {
                success: false,
                message: 'Incorrect username or password'
              } );
      
            }
        })


    } else {

      // El error 400 corresponde a Bad Request de acuerdo al estándar HTTP
      res.send( 400 ).json( {
        success: false,
        message: 'Authentication failed! Please check the request'
      } );

    }

  }

  index( req, res ) {
    
    // Retorna una respuesta exitosa con previa validación del token
    res.json( {
      success: true,
      message: 'Index page'
    } );

  }
}

module.exports = HandlerGenerator;