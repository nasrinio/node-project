import { msgModel } from '../../../DB/Models/message.model.js'
import { userModel } from '../../../DB/Models/user.model.js'

//============================== send message =====================
export const sendMessage = async (req, res, next) => {
  const { content, sendTo } = req.body

  const isUserExists = await userModel.findById(sendTo)
  if (!isUserExists) {
    // return res.status(400).json({ message: 'invalid account' })
    return next(new Error('invalid account', { cause: 400 }))
  }

  const message = new msgModel({ content, sendTo })
  await message.save()
  res.status(201).json({ message: 'Done' })
}

//=============================== get user messages ===================
export const getUserMessages = async (req, res, next) => {
  const { _id } = req.authUser
  const messages = await msgModel.find({ sendTo: _id })
  if (messages.length) {
    return res.status(200).json({ message: 'Done', messages })
  }
  res.status(200).json({ message: 'empty inbox' })
}

//================================ delete message ===================
export const deleteMessages = async (req, res, next) => {
  const { _id } = req.authUser
  const { msgId } = req.params
  const message = await msgModel.findOneAndDelete({
    _id: msgId,
    sendTo: _id,
  })

  if (message) {
    return res.status(200).json({ message: 'Done' })
  }
  // res.status(401).json({ message: 'Unauthorized to delete this message' })
  return next(new Error('Unauthorized to delete this message', { cause: 400 }))
}
