import { getTimeTriggerDal, getUserTriggerDal } from "./triggersDal";

export const getTimeTriggerService = async () => await getTimeTriggerDal();

export const getUserTriggerService = async () => await getUserTriggerDal();
