import actionTypes from "../_common/ActionTypes";
export const GetAllPartyAction = (payload) => {
  return {
    type: actionTypes.ALL,
    payload: payload,
  };
};
