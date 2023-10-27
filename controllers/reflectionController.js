const db = require('../config')

class reflectionController {
    static async getAllReflections(req, res) {
        try {
            const data = await db.query("SELECT * FROM Reflections WHERE userid = $1", [req.UserData.id])
            if (data) {
                res.status(200).json(data.rows)
            }

        } catch (error) {
            res.status(error.code || 500).json({ message: error.message })

        }
    }

    static async getReflectionById(req, res) {
        try {
            const { id } = req.params
            const userdata = req.UserData
            const data = await db.query("SELECT * from Reflections WHERE id= $1 AND userid = $2", [id, userdata.id])
            res.status(200).json(data.rows)
        } catch (error) {
            res.status(error.code || 500).json({ message: error.message })
        }

    }

    static async addReflection(req, res) {
        try {
            const userData = req.UserData
            const {
                success,
                low_point,
                take_away,
            } = req.body
            const userid = userData.id
            const data = await db.query("INSERT INTO Reflections(userid, success, low_point, take_away) VALUES($1, $2, $3, $4) RETURNING *", [userid, success, low_point, take_away])
            res.send(data.rows[0])
        }
        catch (error) {
            console.log(req.UserData.id);
            res.send(req.UserData)
        }
    }

    static async updateReflection(req, res) {
        const dataId = req.params.id
        const userdata = req.UserData
        try {
            const checkuser = await db.query("SELECT FROM Reflections WHERE id= $1 AND userid = $2", [dataId, userdata.id])
            if (checkuser.rows.length === 0) {
                res.status(401).json({ message: "Unauthorized" })
            } else {
                const { success, low_point, take_away } = req.body
                const data = await db.query("UPDATE Reflections SET success = $1, low_point = $2, take_away = $3 WHERE id = $4 AND userid = $5 RETURNING *", [success, low_point, take_away, dataId, userdata.id])
                res.status(200).json(data.rows)
            }
        } catch (error) {
            res.status(error.code || 500).json({ message: error.message })
        }

    }

    static async deleteReflectionById(req, res) {
        const dataId = req.params.id
        const userdata = req.UserData
        try {
            const checkuser = await db.query("SELECT FROM Reflections WHERE id= $1 AND userid = $2", [dataId, userdata.id])
            if (checkuser.rows.length === 0) {
                res.status(401).json({ message: "Unauthorized" })
            } else {
                await db.query("DELETE FROM Reflections WHERE id= $1", [dataId])
                res.status(200).json({ message: "Success Deleted" })
            }

        } catch (error) {
            res.status(error.code || 500).json({ message: error.message })

        }
    }
}


module.exports = reflectionController