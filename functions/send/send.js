const Airtable = require("airtable-plus")
const Nexmo = require("nexmo")

const nexmo = new Nexmo({
  apiKey: process.env.VONAGE_STREAM_API_KEY,
  apiSecret: process.env.VONAGE_STREAM_API_SECRET
})
const airtable = new Airtable({
  baseID: process.env.AIRTABLE_BASE,
  apiKey: process.env.AIRTABLE_API_KEY,
  tableName: "people"
})

exports.handler = async (event, context) => {
  try {
    const people = await airtable.read({})
    for (let person of people) {
      nexmo.message.sendSms("12013505840", person.fields.Number, event.body)
    }
    return {
      statusCode: 200,
      body: JSON.stringify({ message: 'Hello!' })
    }
  } catch (err) {
    return { statusCode: 500, body: err.toString() }
  }
}
