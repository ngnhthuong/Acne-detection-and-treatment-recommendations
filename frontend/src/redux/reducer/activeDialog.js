import { CLOSE_DIALOG_SETTING, ACTIVE_DIALOG_SETTING } from "../action/types";

const INITIAL_STATE = {
  isActiveDialogSetting: false,
};

const dialogReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case ACTIVE_DIALOG_SETTING:
      return {
        ...state,
        isActiveDialogSetting: true,
      };
    case CLOSE_DIALOG_SETTING:
      return {
        ...state,
        isActiveDialogSetting: false,
      };
    default:
      return state;
  }
};

export default dialogReducer;
