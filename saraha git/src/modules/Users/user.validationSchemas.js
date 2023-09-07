import joi from 'joi'
import { generalFields } from '../../middlewares/validation.js'

export const SignUpSchema = {
  body: joi
    .object({
      username: joi
        .string()
        .min(3)
        .max(10)
        .messages({
          'any.required': 'userName is required',
        })
        .required(),
      email: generalFields.email,
      password: generalFields.password,
      cPassword: joi.valid(joi.ref('password')).required(),
      gender: joi.string().optional(),
    })
    .required(),
  //   query: joi
  //     .object({
  //       test: joi.string().min(3).max(5).required(),
  //     })
  //     .required(),
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
