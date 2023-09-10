import joi from 'joi'
import { generalFields } from '../../middleware/validation.js'

export const SignUpSchema = {
  body: joi
    .object({
        userName: joi
        .string()
        .min(3)
        .max(10)
        .messages({
          'any.required': 'userName is required',
        })
        .required(),
        age: joi.number().required(),
        phone: joi.string().required(), 
        email: generalFields.email,
      password: generalFields.password,
      cPassword: joi.valid(joi.ref('password')).required(),
      gender: joi.string().optional(),
    })
    .required(),
}

export const SignInSchema = {
  body: joi
    .object({
      email: generalFields.email,
      password: generalFields.password,
    })
    .options({ presence: 'required' })
    .required(),
}
