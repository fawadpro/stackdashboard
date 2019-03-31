import { FORM_NOTIFICATION } from "../constants/actionTypes";

const initialState = {
  notification: null
};

export default function(state = initialState, action) {
  switch (action.type) {
    case FORM_NOTIFICATION:
      return {
        ...state,
        notification: action.payload
      };
    default:
      return state;
  }
}
