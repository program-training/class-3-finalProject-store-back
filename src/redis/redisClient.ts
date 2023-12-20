import { createClient } from "redis";

export const redisClient = createClient({
  password: "KDx5XOfN5HK5GEHERwqVmm9R7EhPAxbe",
  socket: {
    host: "redis-14937.c243.eu-west-1-3.ec2.cloud.redislabs.com",
    port: 14937,
  },
});

export const connectionToRedis = async () => {
  try {
    redisClient.connect();
    console.log(`connected to redis`);
  } catch (error) {
    console.error(error);
  }
};

export const getDataFromRedis = async (key: string): Promise<string | null> => {
  try {
    const result = await redisClient.get(key);
    console.log(result);
    return result;
  } catch (error) {
    console.error(`Failed to get data from Redis for key "${key}":`, error);
    throw new Error(`Failed to get data from Redis for key "${key}"`);
  }
};

export const updateRedisJsonArray = async (key: string, newData: unknown): Promise<void> => {
  try {
    const currentDataString = await redisClient.get(key);
    const currentDataArray = currentDataString ? JSON.parse(currentDataString) : [];
    currentDataArray.push(newData);
    const updatedDataString = JSON.stringify(currentDataArray);
    await redisClient.set(key, updatedDataString);
    console.log(`Successfully updated Redis JSON array for key "${key}"`);
  } catch (error) {
    console.error(`Failed to update Redis JSON array for key "${key}":`, error);
    throw new Error(`Failed to update Redis JSON array for key "${key}"`);
  }
};
