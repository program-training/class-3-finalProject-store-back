import { error } from "console";
import { createClient } from "redis";

const redisClient = createClient({
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

export const getDataFromRedis = async (key: string) => {
  const data = await redisClient.get(key)
  return data ? JSON.parse(data) : false
}


