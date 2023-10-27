const db = require('../config')
const { hashPassword,
    comparePassword } = require("../utils/bcrypt")
const {
    generateToken
} = require('../utils/jwt')

class userController {
    static async register(req, res) {

        try {
            const existisngUser = await db.query("SELECT * FROM Users WHERE email = $1", [req.body.email])
            if (existisngUser.rowCount > 0) {
                throw {
                    code: 400,
                    message: "Email already used!"
                }
            }
            else {
                const {
                    email,
                    password
                } = req.body
                const data = await db.query("INSERT INTO Users(email, password) VALUES($1, $2) RETURNING *", [email, hashPassword(password)])
                res.status(201).json({
                    id: data.rows[0].id,
                    email: data.rows[0].email
                })
            }
        } catch (error) {
            res.status(error.code || 500).json({ message: error.message })
        }
    }
    static async login(req, res) {
        try {
            const {
                email,
                password
            } = req.body
            const data = await db.query("SELECT * FROM Users WHERE email = $1", [email])
            if (!data.rows[0]) {
                res.status(401).json({ message: "Email or password invalid" })
            }
            else {
                const isvalid = comparePassword(password, data.rows[0].password)
                if (!isvalid) {
                    res.status(401).json({ message: "Email or password invalid" })
                }
                else {
                    const access_token = generateToken({
                        id: data.rows[0].id,
                        email: data.rows[0].email
                    })
                    res.status(200).json({
                        access_token
                    })
                }
            }
        } catch (error) {
            res.status(error.code || 500).json({ message: error.message })
        }
    }
}
module.exports = userController