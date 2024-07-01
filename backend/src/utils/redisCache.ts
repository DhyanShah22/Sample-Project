import { createClient, RedisClientType } from 'redis';
import { config } from '../config';
import logger  from '../logger/logger';

let client: RedisClientType;

const connectRedis = async () => {
  client = createClient({
    url: `redis://${config.redisHost}:${config.redisPort}`
  });

  client.on('error', (err) => logger.error('Redis Client Error', err));

  await client.connect();
};

const getCache = async (key: string): Promise<string | null> => {
  try {
    const value = await client.get(key);
    return value;
  } catch (err) {
    logger.error('Error getting cache', err);
    return null;
  }
};

const setCache = async (key: string, value: string, expiry: number): Promise<void> => {
  try {
    await client.set(key, value, { EX: expiry });
  } catch (err) {
    logger.error('Error setting cache', err);
  }
};

const deleteCache = async (key: string): Promise<void> => {
  try {
    await client.del(key);
  } catch (err) {
    logger.error('Error deleting cache', err);
  }
};

connectRedis().catch(logger.error);

export { getCache, setCache, deleteCache };
