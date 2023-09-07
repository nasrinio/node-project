import { Router } from 'express'
const router = Router()

import * as uc from './user.controller.js'
import { asyncHandler } from '../../utils/errorhandling.js'
import { isAuth } from '../../middlewares/auth.js'
import { validationCoreFunction } from '../../middlewares/validation.js'
import { SignInSchema, SignUpSchema } from './user.validationSchemas.js'
import { multerFunction } from '../../services/multerLocally.js'
import { multerCloudFunction } from '../../services/multerCloud.js'
import { allowedExtensions } from '../../utils/allowedExtensions.js'

router.post('/', validationCoreFunction(SignUpSchema), asyncHandler(uc.SignUp))
router.get('/confirmEmail/:token', asyncHandler(uc.confirmEmail))
router.post('/login', validationCoreFunction(SignInSchema), uc.SignIn)
router.patch('/:userId', isAuth(), asyncHandler(uc.updateProfile))
router.get('/:_id', asyncHandler(uc.getUser))

router.post(
  '/profile',
  isAuth(),
  multerCloudFunction(allowedExtensions.Image).single('profile'), // req.file
  asyncHandler(uc.profilePicture),
)

router.post(
  '/cover',
  isAuth(),
  multerFunction(allowedExtensions.Image, 'User/Covers').fields([
    { name: 'cover', maxCount: 1 },
    { name: 'image', maxCount: 2 },
  ]),
  asyncHandler(uc.coverPictures),
)
export default router
