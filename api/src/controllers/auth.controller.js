import User from '../models/User'
import jwt from 'jsonwebtoken'
import config from '../config'
import Role from '../models/Role';



export const signUp = async (req, res) => {
    
    const {username, email, password, roles,} = req.body;
    
    console.log(req.body)
    
    const newUser = new User({
        username,
        email,
        password: await User.encryptPassword(password),        
    })
    console.log('auth.controller', newUser)
    console.log("req.body.roles", req.body.roles)
    if (roles) {
        const foundRoles = await Role.find({name: {$in: roles}})
        console.log("foundRoles", foundRoles)
        newUser.roles = foundRoles.map(role => role._id)
        console.log("entra al if, detecta q se envia roles")
        console.log("foundRoles: ", foundRoles)    
    } else {
        const role = await Role.findOne({name: "user"})
        newUser.roles = [role._id];
    }

    const savedUser = await newUser.save();
    console.log('saveduser', savedUser)

   const token = jwt.sign({id: savedUser._id}, config.SECRET, {
        expiresIn: 86400 //24 horas
    })
    const userid = savedUser._id;
    //ver como devuelvo el usuario.    
    //res.status(200).json({token, savedUser})
    res.status(200).json({token, userid})
    
}

//SignIn
export const signin = async (req, res) => {
    //populate se utiliza para traer los datos del documento roles (trae el documento completo)
    const userFound = await User.findOne({username: req.body.username}).populate("roles");
    //console.log('auth.controller usuario que llega', req.body.username);
    //if(!userFound) console.log('userfound', userFound);    
    if(!userFound) return res.status(400).json({msg: 'Usuario no existe'})

    const matchPassword = await User.comparePassword(req.body.password, userFound.password)
    //console.log('auth.controller luego de comprobar pass', matchPassword);
    //si no coinciden las password retorno mensaje
    if (!matchPassword) return res.status(401).json({token: null, msg: 'Password incorrecto'})

    const token = jwt.sign({id: userFound._id}, config.SECRET, {
        expiresIn: 86400
    })

    console.log('auth.controller token',userFound)
    res.json({token})
        
}

//Obtiene que usuario está autenticado
exports.usuarioAutenticado = async (req, res) => {
    try {
        console.log("DEntro de usuarioAutenticado auth.controller.js")
        console.log("usuarioAutID", req.body._id)
        console.log("usuarioAutUN", req.body.username)
        console.log("user._id", req.userId)
        const usuario = await User.findById(req.userId, {password: 0});
        console.log('Usuarioencontrado', usuario);
        res.json({usuario});        
    } catch (error) {
        console.log(error);
        res.tatus(500).json({msg: 'Hubo un error'});
    }

}

