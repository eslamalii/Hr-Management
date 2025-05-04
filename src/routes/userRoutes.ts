import { Router } from 'express'
import { Container } from 'inversify'
import { TYPES } from '../config/types'
import { UserController } from '../controllers/UserController'
import {
  validateCreateUser,
  validateEmail,
  validateUserId,
  validateUserQuery,
  validateUserRequests,
} from '../middleware/validation/userValidation'
import { isAuthenticated, isAdmin, isUser } from '../middleware/auth'
import { upload } from '../middleware/multerMiddleware'

export const createUserRoutes = (container: Container) => {
  const router = Router()
  const userController = container.get<UserController>(TYPES.UserController)

  router.get('/departments', isAuthenticated, userController.getDepartments)

  router.post(
    '/',
    isAuthenticated,
    isAdmin,
    validateCreateUser,
    userController.createUser
  )

  router.get(
    '/',
    isAuthenticated,
    isAdmin,
    validateUserQuery,
    userController.getAllUsers
  )
  router.get(
    '/:userId',
    isAuthenticated,
    isAdmin,
    validateUserId,
    userController.findById
  )

  router.get(
    '/:userId/requests',
    isAuthenticated,
    isAdmin,
    validateUserId,
    validateUserRequests,
    userController.getUserRequests
  )

  router.get(
    '/email/:email',
    isAuthenticated,
    isAdmin,
    validateEmail,
    userController.findByEmail
  )
  router.put(
    '/:id',
    isAuthenticated,
    isUser,
    upload.single('profileImage'),
    userController.updateUser
  )

  router.delete('/:id', isAuthenticated, isAdmin, userController.deleteUser)

  return router
}
