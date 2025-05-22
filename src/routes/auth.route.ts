import express from 'express'
import validate from '@/middleware/validate'
import { authValidation } from '@/validations'
import { authController } from '@/controllers'

const router = express.Router()

router.post('/register', validate(authValidation.register), authController.register)
router.post('/login', validate(authValidation.login), authController.login)

export default router
