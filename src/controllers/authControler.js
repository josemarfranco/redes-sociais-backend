const UserSchema = require('../models/userSchema');
const bcrypt = require('bcrypt')

const login = async (req, res, next) => {
    let {email, password} = req.body
    if (email && password) {
        let credentials = await UserSchema.findOne({"email": email})
        if (credentials && bcrypt.compareSync(password, credentials.password) === true) {
            console.log('checkCredentials OK (' + credentials.email + ')')
            res.status(200).send({
                message: "Usuário validado com sucesso",
                user: credentials
            })
        } else {
            console.log("checkCredentials NOK: Usuário e/ou senha inválidos")
            res.status(401).send({
                message: "Usuário e/ou senha inválidos"
            })
        }
    } else {
        console.log("checkCredentials NOK: Usuário e/ou senha inválidos")
        res.status(400).send({
            message: "Usuário e/ou senha inválidos"
        })
    }
}

module.exports = {
    login
};