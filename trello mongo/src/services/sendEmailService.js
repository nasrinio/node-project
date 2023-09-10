
import nodemailer from 'nodemailer'

export async function sendEmailService({
  to,
  subject,
  message,
  attachments = [],
} = {}) {
  // configurations
  const transporter = nodemailer.createTransport({
    host: 'localhost', 
    port: 587, 
    secure: false, 
    service: 'gmail', 
    auth: {
      // credentials
      user: 'abdhamidnasr2014@gmail.com',
      pass: 'kqaijiabkkjbwrke',
    },

  })

  const emailInfo = await transporter.sendMail({
    from: '"Fred Foo 👻" <abdhamidnasr2014@gmail.com>',
    
    to: to ? to : '',
    subject: subject ? subject : 'Hello',
    html: message ? message : '',
    attachments,
  })
  //console.log(emailInfo)
  if (emailInfo.accepted.length) {
    return true
  }
  return false
}
