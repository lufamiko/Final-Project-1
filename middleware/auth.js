const { verifyToken } = require("../utils/jwt")
const db = require("../config")

const authentication = async (req, res, next) => {
    try {
        const token = req.headers["authorization"]

        if (!token) {
            res.status(401).json({
                message: "Unauthorized"
            })
        } else {
            // const decode = verifyToken(token)
            const decode = verifyToken(token?.split(" ")?.[1])
            const userData = await db.query("SELECT * FROM Users WHERE id = $1", [decode.id])
            if (!userData) {
                throw {
                    code: 401,
                    message: "User not found"
                }
            }
            req.UserData = {
                id: decode.id,
                email: decode.email,
            }
            next()
        }

    } catch (error) {
        res.status(error.code || 500).json(error)
    }

}

module.exports = { authentication }