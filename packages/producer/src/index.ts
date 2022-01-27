/* eslint-disable no-console */
import express from 'express'
import Kafka from 'node-rdkafka'

type Message = {
  sender: string,
  reciever: string,
  payload: any
}

const producer = new Kafka.Producer({
  'metadata.broker.list': 'kafka:9092',
})

const app = express()
app.use(express.json())
const PORT = 3000

app.listen(PORT, () => {
  console.log(`server started at http://localhost:${PORT}`)
  producer.connect()
})

app.post('/api/messages', (req, res) => {
  try {
    const msg: Message = req.body
    producer.produce(
      'blog',
      null,
      Buffer.from(JSON.stringify(msg), 'utf8'),
      'kafka-key',
      Date.now()
    )
    res.sendStatus(201)
  } catch (error) {
    res.sendStatus(404)
  }
})
