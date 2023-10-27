const router = require('express').Router()
const ReflectionController = require('../controllers/reflectionController')

router.get('/', ReflectionController.getAllReflections)
router.get('/:id', ReflectionController.getReflectionById)
router.post('/', ReflectionController.addReflection)
router.put('/:id', ReflectionController.updateReflection)
router.delete('/:id', ReflectionController.deleteReflectionById)

module.exports = router