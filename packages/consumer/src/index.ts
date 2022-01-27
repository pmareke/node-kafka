/* eslint-disable no-console */
import Kafka from 'node-rdkafka'

type Message = {
  sender: string,
  reciever: string,
  payload: any
}

const consumer = Kafka.KafkaConsumer.createReadStream({
  'metadata.broker.list': 'kafka:9092',
  'group.id': 'test',
  'socket.keepalive.enable': true,
  'enable.auto.commit': false,
}, {}, {
  topics: 'blog',
  waitInterval: 0,
  objectMode: false,
});

consumer.on('data', (message: Buffer) => {
  try {
    const msg: Message = JSON.parse(message.toString())
    console.log(msg)
  } catch (err) {
    console.log(err)
  }
});
