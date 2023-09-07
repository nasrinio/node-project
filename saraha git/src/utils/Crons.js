import { RecurrenceRule, scheduleJob } from 'node-schedule'
import { userModel } from '../../DB/Models/user.model.js'

//===================================== Date based ===============================

// ================= way One
export const cronOne = () => {
  scheduleJob('*/5 * * * * *', async function () {
    const noConfirmedUsers = await userModel.deleteMany({ isConfirmed: false })
    console.log(noConfirmedUsers)
  })
}

export const cronFour = () => {
  scheduleJob('*/10 * * * * *', function () {
    console.log('CronJob runs every 10 second')
  })
}

// ================= way Two
export const cronTwo = () => {
  scheduleJob({ hour: 22, minute: 57, dayOfWeek: 0 }, function () {
    console.log('CronJob runs at 22:56 pm sunday')
  })
}

//=====================================  Recurrance Rule  ===============================
const rule = new RecurrenceRule()
rule.minute = 1
rule.tz = 'Africa/Cairo'
rule.hour = 23

export const cronThree = () => {
  scheduleJob(rule, function () {
    console.log('CronJob runs at 23:01 pm sunday')
  })
}
