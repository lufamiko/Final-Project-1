const router = require("express").Router()
const userRoutes = require("./UserRoutes")
const reflectionRoutes = require("./ReflectionRoutes")
const { authentication } = require("../middleware/auth")

router.use("/api/v1/reflections", authentication, reflectionRoutes)
router.use("/api/v1/users", userRoutes)


module.exports = router;
