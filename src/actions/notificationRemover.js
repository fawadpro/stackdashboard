import { FORM_NOTIFICATION } from "../constants/actionTypes";

export const notificationRemover = () => {
  return {
    type: FORM_NOTIFICATION,
    payload: null
  };
};
