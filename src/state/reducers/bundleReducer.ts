import produce from "immer";
import { ActionType } from "../action-types";
import { Action } from "../actions";

interface BundlesState {
  [key: string]: {
    loading: boolean;
    code: string;
    err: string;
  } | undefined;
}

const initialState: BundlesState = {};

const _reducer = (state: BundlesState = initialState, action: Action) => {
  switch (action.type) {
    case ActionType.BUNDLE_START:
      state[action.payload.cellId] = {
        loading: true,
        code: "",
        err: "",
      };
      return;
    case ActionType.BUNDLE_COMPLETE:
      state[action.payload.cellId] = {
        loading: false,
        code: action.payload.bundle.code,
        err: action.payload.bundle.err,
      };
      return;
    default:
      return state;
  }
};

const reducer = produce(_reducer, initialState);

export default reducer;
