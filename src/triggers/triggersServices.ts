import { getTimeTriggerDal, getUserTriggerDal } from "./triggersDal";

export const getTimeTriggerService = async () => {
  try {
    const timeTriggersData = await getTimeTriggerDal();
    const timeTriggerObj: Record<number, number> = {};
    timeTriggersData.forEach((report) => {
      const msDate = report.date;
      const hour = new Date(msDate).getHours();
      timeTriggerObj[hour] = !timeTriggerObj[hour] ? 1 : timeTriggerObj[hour] + 1;
    });
    const sortedKeys = Object.keys(timeTriggerObj).sort((a, b) => parseInt(a) - parseInt(b));
    const sortedTimeTriggerObj: Record<number, number> = {};
    sortedKeys.forEach((key) => {
      sortedTimeTriggerObj[parseInt(key)] = timeTriggerObj[parseInt(key)];
    });
    return sortedTimeTriggerObj;
  } catch (error) {
    return Promise.reject(error);
  }
};

export const getUserTriggerService = async () => {
  try {
    const timeTriggersData = await getUserTriggerDal();
    const timeTriggerObj: Record<number, number> = {};
    timeTriggersData.forEach((report) => {
      const msDate = new Date(report.login_time).toISOString();
      const hour = new Date(msDate).getUTCHours();
      timeTriggerObj[hour] = !timeTriggerObj[hour] ? 1 : timeTriggerObj[hour] + 1;
    });
    const sortedKeys = Object.keys(timeTriggerObj).sort((a, b) => parseInt(a) - parseInt(b));
    const sortedTimeTriggerObj: Record<number, number> = {};
    sortedKeys.forEach((key) => {
      sortedTimeTriggerObj[parseInt(key)] = timeTriggerObj[parseInt(key)];
    });
    return sortedTimeTriggerObj;
  } catch (error) {
    return Promise.reject(error);
  }
};
