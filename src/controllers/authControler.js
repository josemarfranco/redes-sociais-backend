const UserSchema = require('../models/userSchema')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const SECRET = process.env.SECRET

const login = async (req, res) => {
    try {
        const {email, password} = req.body
        const credentials = await UserSchema.findOne({"email": email})
        const webtoken = jwt.sign(credentials.email, SECRET)
        if (credentials && bcrypt.compareSync(password, credentials.password) === true) {
            res.status(200).send({
                message: "Usuário " + credentials.email + " (" + credentials._id + ") autenticado com sucesso.",
                jwt: webtoken
            })
        } else {
            res.status(400).send({
                message: "Usuário ou senha inválidos"           
            })
        }
    } catch (error) {
        res.status(400).send({
            message: error.message            
        })
    }
}

const checkAuth = (req, res, next) => {
    try {
        const header = req.get('Authorization')
        const webtoken = header.substring(7)
        jwt.verify(webtoken, SECRET, function(error) { 
            if (error) 
                return res.status(500).send({
                    message: error.message
                });
            next()
        })
    } catch (error) {
        res.status(401).send({
            message: "JWT Inexistente"
        })
    }
}


module.exports = {
    checkAuth,
    login
};