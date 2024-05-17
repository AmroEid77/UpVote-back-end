import { Router } from 'express'
import * as AuthController from './auth.controller.js'
import { asyncHandler } from '../../utilities/errorHandling.js';
import validation from '../../middleware/validation.middleware.js';
import { signInSchema, signUpSchema } from './auth.validaiton.js';
const router = Router();

router.post('/signUp', validation(signUpSchema),asyncHandler(AuthController.signUp));
router.post('/signIn',validation(signInSchema) ,asyncHandler(AuthController.signIn));
router.get('/confirmEmail/:token', asyncHandler(AuthController.signInConfirmEmail));
export default router