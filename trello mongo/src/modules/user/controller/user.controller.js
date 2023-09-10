import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { userModel } from "../../../DB/models/user.model.js";
import { sendEmailService } from "../../../services/sendEmailService.js";
//(signUp)
export const signUp = async (req, res, next) => {
  try {
    const { email, password, cPassword } = req.body;
    const emailExist = await userModel.findOne({ email });
    if (password != cPassword)
      return res.json({ message: "password mis match cpassword" });
    if (emailExist) return res.json({ message: "email already exist" });

  
    // confirmEmail
  const token = jwt.sign({ email }, process.env.CONFIRMATION_EMAIL_TOKEN, {
    expiresIn: '1h',
  })
  const confirmLink = `http://localhost:3000/user/confirmEmail/${token}`

  const message = `<a href=${confirmLink}> Click to confirm your email </a>`

  const isEmailSent = await sendEmailService({
    message,
    to: email,
    subject: 'Confiramtion Email',
  })

  if (!isEmailSent) {
    return res.status(400).json({ message: 'Please try again later or contact teh support team' })
  }

    const hash = bcrypt.hashSync(password, +process.env.SALT_ROUNDS);
    req.body.password = hash;
    const user = await userModel.create(req.body);
    return res.json({ message: "Done", user });
  } catch (error) {
    return res.json({ message: "catch error", error });
  }
};

//================================== Confirm email =====================
export const confirmEmail = async (req, res, next) => {
    const { token } = req.params
    const decodedData = jwt.verify(token, process.env.CONFIRMATION_EMAIL_TOKEN)
  
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
//(signIn)
export const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await userModel.findOne({ email });
    if (!user) return res.json({ message: "In-valid email or password" });
    const match = bcrypt.compareSync(password, user.password);
    if (!match) return res.json({ message: "In-valid email or password" });
    await userModel.updateOne(
      { _id: user._id },
      {
        isOnline: true,
        isDeleted: false,
      }
    );
    const token = jwt.sign(
      { _id: user._id, email: user.email },
      process.env.SIGN_IN_TOKEN_SECRET
    );
    return res.json({ message: "Done", token });
  } catch (error) {
    return res.json({ message: "catch error", error });
  }
};
//change password
export const changePassword = async (req, res, next) => {
  try {
    const { id } = req.user;
    const { oldPassword, newPassword, cPassword } = req.body;
    if (newPassword != cPassword)
      return res.json({ message: "newPassword mis match cpassword" });
    const match = bcrypt.compareSync(oldPassword, req.user.password);
    console.log(match);
    if (!match)
      return res.json({ message: "old password not match your password" });

    const hash = bcrypt.hashSync(newPassword, +process.env.SALT_ROUNDS);
    const updated = await userModel.updateOne({ _id: id }, { password: hash });
    return res.json({ message: "Done", updated });
  } catch (error) {
    return res.json({ message: "catch error", error });
  }
};

//updateUser
export const updateUser = async (req, res, next) => {
  try {
    const { id } = req.user;
    const updated = await userModel.updateOne({ _id: id }, req.body);
    return res.json({ message: "Done", updated });
  } catch (error) {
    return res.json({ message: "catch error", error });
  }
};

//deleteUser
export const deleteUser = async (req, res, next) => {
  try {
    const { id } = req.user;
    const deleted = await userModel.deleteOne({ _id: id });
    return res.json({ message: "Done", deleted });
  } catch (error) {
    return res.json({ message: "catch error", error });
  }
};

//softDelete
export const softDelete = async (req, res, next) => {
  try {
    const { id } = req.user;
    const updated = await userModel.updateOne({ _id: id }, { isDeleted: true });
    return res.json({ message: "Done", updated });
  } catch (error) {
    return res.json({ message: "catch error", error });
  }
};

//logout
export const logout = async (req, res, next) => {
  try {
    const { id } = req.user;
    const updated = await userModel.updateOne({ _id: id }, { isOnline: false });
    return res.json({ message: "Done", updated });
  } catch (error) {
    return res.json({ message: "catch error", error });
  }
};

