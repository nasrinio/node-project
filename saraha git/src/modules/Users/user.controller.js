import { userModel } from '../../../DB/Models/user.model.js'
import bcrypt from 'bcrypt'
import { asyncHandler } from '../../utils/errorhandling.js'

import { sendEmailService } from '../../services/sendEmailService.js'
import cloudinary from '../../utils/coludinaryConfigrations.js'
import { generateQrCode } from '../../utils/qrCodeFunction.js'
import { generateToken, verifyToken } from '../../utils/tokenFunctions.js'

//==================================== SignUp ===========================
export const SignUp = async (req, res, next) => {
  const { test } = req.query

  const { username, email, password, gender } = req.body

  // email check
  const isUserExists = await userModel.findOne({ email })
  if (isUserExists) {
    return res.status(400).json({ message: 'Email is already exists' })
  }

  // confirmEmail
  const token = generateToken({
    payload: {
      email,
    },
    signature: process.env.CONFIRMATION_EMAIL_TOKEN,
    expiresIn: '1h',
  })

  if (!token) {
    return next(
      new Error('token generation fail, payload canot be empty', {
        cause: 400,
      }),
    )
  }

  const confirmLink = `${req.protocol}://${req.headers.host}/user/confirmEmail/${token}`

  const message = `<a href=${confirmLink}> Click to confirm your email </a>`

  const isEmailSent = await sendEmailService({
    message,
    to: email,
    subject: 'Confiramtion Email',
  })
  if (!isEmailSent) {
    return res
      .status(500)
      .json({ message: 'Please try again later or contact teh support team' })
  }

  const hashedPassword = bcrypt.hashSync(password, +process.env.SALT_ROUNDS)
  const user = new userModel({
    username,
    email,
    password: hashedPassword,
    gender,
  })
  await user.save()
  res.status(201).json({ message: 'Done', user, test })
}

//================================== Confirm email =====================
export const confirmEmail = async (req, res, next) => {
  const { token } = req.params
  // const decodedData = jwt.verify(token, process.env.CONFIRMATION_EMAIL_TOKEN)
  const decodedData = verifyToken({
    token,
    signature: process.env.CONFIRMATION_EMAIL_TOKEN,
  })
  if (!decodedData) {
    return next(
      new Error('token decode fail, invalid token', {
        cause: 400,
      }),
    )
  }

  const isConfirmedCheck = await userModel.findOne({ email: decodedData.email })
  if (isConfirmedCheck.isConfirmed) {
    return res.status(400).json({ message: 'Your email is already confirmed' })
  }
  const user = await userModel.findOneAndUpdate(
    { email: decodedData.email },
    { isConfirmed: true },
    {
      new: true,
    },
  )
  res.status(200).json({ message: 'Confirmed Done please try to login', user })
}

//================================== signIn ============================
export const SignIn = asyncHandler(async (req, res, next) => {
  const { email, password } = req.body
  const isUserExists = await userModel.findOne({ email, isConfirmed: true })
  if (!isUserExists) {
    return next(new Error('in-valid login credentails ', { cause: 400 }))
  }
  const passMatch = bcrypt.compareSync(password, isUserExists.password) // true , false
  if (!passMatch) {
    return next(new Error('in-valid login credentails ', { cause: 400 }))
  }

  const userToken = generateToken({
    payload: {
      useremail: email,
      id: isUserExists._id,
    },
    signature: process.env.SIGN_IN_TOKEN_SECRET,
    expiresIn: 20,
  })

  if (!userToken) {
    return next(
      new Error('token generation fail, payload canot be empty', {
        cause: 400,
      }),
    )
  }
  isUserExists.token = userToken
  await isUserExists.save()
  res.status(200).json({ message: 'LoggedIn success', userToken })
})

//====================================== update profile =======================
export const updateProfile = async (req, res, next) => {
  const { _id } = req.authUser
  const { userId } = req.params
  const { username } = req.body

  const userExists = await userModel.findById(userId)
  if (!userExists) {
    // return res.status(400).json({ message: 'in-valid userId' })
    return next(new Error('in-valid userId', { cause: 400 }))
  }

  if (userExists._id.toString() !== _id) {
    return next(new Error('Unauthorized', { cause: 401 }))
  }

  const user = await userModel.findByIdAndUpdate(
    { _id: userId },
    { username },
    { new: true },
  )
  res.status(200).json({ message: 'Done', user })
}

//============================== get user profile =======================
export const getUser = async (req, res, next) => {
  const { _id } = req.params
  const user = await userModel.findById(_id, 'username')
  if (!user) {
    return next(new Error('in-valid userId', { cause: 400 }))
  }
  const qrcode = await generateQrCode({ data: user })
  res.status(200).json({ message: 'Done', user, qrcode })
}

//==============================  profile Picture =======================
export const profilePicture = async (req, res, next) => {
  const { _id } = req.authUser
  console.log(req.file)
  if (!req.file) {
    return next(new Error('please upload profile picture', { cause: 400 }))
  }
  const { secure_url, public_id } = await cloudinary.uploader.upload(
    req.file.path,
    {
      folder: `Users/Profiles/${_id}`,
      // public_id: `${_id}`,
      // use_filename: true,
      // unique_filename: false,
      resource_type: 'image',
    },
  )

  const user = await userModel.findByIdAndUpdate(
    _id,
    {
      profile_pic: { secure_url, public_id },
    },
    {
      new: true,
    },
  )

  if (!user) {
    await cloudinary.uploader.destroy(public_id)
    // await cloudinary.api.delete_resources([publibIds])  // delete bulk of publicIds
    return next(new Error('please try again later', { cause: 400 }))
  }
  res.status(200).json({ message: 'Done', user })
}

//============================== cover pictures =======================
export const coverPictures = async (req, res, next) => {
  const { _id } = req.authUser
  if (!req.files) {
    return next(new Error('please upload pictures', { cause: 400 }))
  }

  const coverImages = []
  for (const file in req.files) {
    for (const key of req.files[file]) {
      const { secure_url, public_id } = await cloudinary.uploader.upload(
        key.path,
        {
          folder: `Users/Covers/${_id}`,
          resource_type: 'image',
        },
      )
      coverImages.push({ secure_url, public_id })
    }
  }
  const user = await userModel.findById(_id)

  user.coverPictures.length
    ? coverImages.push(...user.coverPictures)
    : coverImages

  const userNew = await userModel.findByIdAndUpdate(
    _id,
    {
      coverPictures: coverImages,
    },
    {
      new: true,
    },
  )
  res.status(200).json({ message: 'Done', userNew })
}


