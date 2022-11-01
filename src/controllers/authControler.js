const UserSchema = require('../models/userSchema');
const bcrypt = require('bcrypt');

const login = async (req, res) => {
    try {
        const {email, password} = req.body
        let credentials = await UserSchema.findOne({"email": email})
        if (credentials && bcrypt.compareSync(password, credentials.password) === true) {
            res.status(200).send({
                message: "Usuário validado com sucesso",
                user: credentials
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

module.exports = {
    login
};