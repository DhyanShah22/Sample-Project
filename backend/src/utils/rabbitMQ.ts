import amqp, { Channel, Connection, ConsumeMessage } from 'amqplib';
import { config } from '../config';

let channel: Channel;

const connect = async () => {
  const connection: Connection = await amqp.connect(config.rabbitMQUrl);
  channel = await connection.createChannel();
  await channel.assertQueue('postQueue');
};

const sendToQueue = async (msg: string) => {
  channel.sendToQueue('postQueue', Buffer.from(msg));
};

const consumeQueue = async (callback: (msg: ConsumeMessage | null) => void) => {
  await channel.consume('postQueue', callback, { noAck: true });
};

connect().catch(console.error);

export { sendToQueue, consumeQueue };
